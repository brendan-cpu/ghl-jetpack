const DOCS = window.DOCS;
const GHL_CHECKLIST = window.GHL_CHECKLIST;
const LAUNCHPADS = window.LAUNCHPADS;

/* ═══════════════════════════════════════
   STATE
═══════════════════════════════════════ */
let currentDoc  = 'business';
let currentTopTab = 'core-setup';
let currentCoreSetupSection = 'ghl-checklist'; // 'ghl-checklist' | 'docs' | 'core'
let currentCoreSection = 'dream-client';

/* ═══════════════════════════════════════
   STORAGE
═══════════════════════════════════════ */
const S = {
  get:  (k, d=null) => { try { const v=localStorage.getItem(k); return v?JSON.parse(v):d; } catch { return d; } },
  set:  (k, v)      => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  raw:  (k, d='')   => { try { return localStorage.getItem(k)||d; } catch { return d; } },
  rset: (k, v)      => { try { localStorage.setItem(k, v); } catch {} },
};

function getField(key)      { return S.raw('aob_field_'+key); }
function setField(key, val) {
  const prev = S.raw('aob_field_'+key);
  S.rset('aob_field_'+key, val);
  if (val.trim() && val.trim() !== prev.trim()) _pushHistory(key, val.trim());
}

/* ═══════════════════════════════════════
   AUTH & GATING SYSTEM
   Powered by Supabase + Stripe
   Worker: authority-os-api.brendan-c89.workers.dev
═══════════════════════════════════════ */

const _SUPABASE_URL  = 'https://tbjbviakpjcpacfaxigw.supabase.co';
const _SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiamJ2aWFrcGpjcGFjZmF4aWd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNDI0MzEsImV4cCI6MjA4ODgxODQzMX0.0Rub6XGG7lN-MGc7NdpuVh4OKgC43LFC7_yymZqc37k';
const _API_BASE      = 'https://authority-os-api.brendan-c89.workers.dev/api';
const _SESSION_KEY   = 'aob_session';

// Tier permissions — matches Supabase tier_enum
const _TIERS = {
  basic:  { docs:true, core:true, launchpads:false, marketing:false },
  pro:    { docs:true, core:true, launchpads:true,  marketing:false },
  agency: { docs:true, core:true, launchpads:true,  marketing:true  },
  owner:  { docs:true, core:true, launchpads:true,  marketing:true  },
};

let _SESSION  = null;  // { access_token, refresh_token, expires_at }
let _PROFILE  = null;  // Supabase profile row
let _TIER     = 'basic';

// ── Token storage ─────────────────────────────────────
function _saveSession(s) {
  _SESSION = s;
  if (s) localStorage.setItem(_SESSION_KEY, JSON.stringify(s));
  else   localStorage.removeItem(_SESSION_KEY);
}
function _loadSession() {
  try { const r = localStorage.getItem(_SESSION_KEY); return r ? JSON.parse(r) : null; } catch { return null; }
}
function _isExpired() {
  if (!_SESSION?.expires_at) return true;
  return Date.now() > _SESSION.expires_at - 60000;
}

// ── Supabase auth calls ───────────────────────────────
async function _sbAuth(path, body) {
  const r = await fetch(`${_SUPABASE_URL}/auth/v1/${path}`, {
    method: 'POST',
    headers: { 'Content-Type':'application/json', 'apikey': _SUPABASE_ANON },
    body: JSON.stringify(body),
  });
  return r.json();
}

async function _refreshToken() {
  const stored = _loadSession();
  if (!stored?.refresh_token) return false;
  const res = await _sbAuth('token?grant_type=refresh_token', { refresh_token: stored.refresh_token });
  if (res.access_token) {
    _saveSession({ access_token: res.access_token, refresh_token: res.refresh_token, expires_at: Date.now() + (res.expires_in * 1000) });
    return true;
  }
  return false;
}

async function _ensureToken() {
  if (_isExpired()) {
    const ok = await _refreshToken();
    if (!ok) { _saveSession(null); return false; }
  }
  return true;
}

async function _apiGet(path) {
  const r = await fetch(`${_API_BASE}${path}`, {
    headers: { 'Authorization': _SESSION?.access_token ? `Bearer ${_SESSION.access_token}` : '', 'Content-Type':'application/json' }
  });
  return r.json();
}

// ── Load profile + tier ───────────────────────────────
async function _loadProfile() {
  const valid = await _ensureToken();
  if (!valid) return;
  const res = await _apiGet('/me');
  if (!res.ok) return;
  _PROFILE = res.profile;
  _TIER    = (res.tier || 'basic').toLowerCase();
}

// ── Handle OAuth/magic-link redirect ─────────────────
function _handleRedirect() {
  const hash = window.location.hash;
  if (!hash) return false;
  const p = new URLSearchParams(hash.slice(1));
  const at = p.get('access_token');
  const rt = p.get('refresh_token');
  const ei = parseInt(p.get('expires_in') || '3600');
  if (at) {
    _saveSession({ access_token: at, refresh_token: rt, expires_at: Date.now() + ei * 1000 });
    history.replaceState(null, '', window.location.pathname + window.location.search);
    return true;
  }
  return false;
}

// ── Auth panel UI helpers ─────────────────────────────
function showAuthPanel(panel) {
  ['signin','signup','magic','verify'].forEach(p => {
    const el = document.getElementById('auth-panel-' + p);
    if (el) el.style.display = p === panel ? 'block' : 'none';
  });
  // Clear errors
  ['lg-error','lg-error-up'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.textContent = ''; el.style.display = 'none'; }
  });
}

function _authErr(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = '✗ ' + msg;
  el.style.display = 'block';
}

function _setBtn(id, disabled, text) {
  const btn = document.getElementById(id);
  if (!btn) return;
  btn.disabled = disabled;
  btn.textContent = text;
}

// ── Sign In ───────────────────────────────────────────
async function handleSignIn() {
  const email    = document.getElementById('auth-email').value.trim();
  const password = document.getElementById('auth-password').value;
  if (!email || !password) { _authErr('lg-error', 'Please enter your email and password.'); return; }

  _setBtn('lg-btn', true, 'Signing in…');
  const res = await _sbAuth('token?grant_type=password', { email, password });

  if (res.access_token) {
    _saveSession({ access_token: res.access_token, refresh_token: res.refresh_token, expires_at: Date.now() + (res.expires_in * 1000) });
    await _loadProfile();
    _onAuthSuccess();
  } else {
    _authErr('lg-error', res.error_description || 'Invalid email or password.');
    _setBtn('lg-btn', false, 'Sign In →');
  }
}

// ── Sign Up ───────────────────────────────────────────
async function handleSignUp() {
  const name     = document.getElementById('auth-name').value.trim();
  const email    = document.getElementById('auth-email-up').value.trim();
  const password = document.getElementById('auth-password-up').value;

  if (!email || !password) { _authErr('lg-error-up', 'Please fill in all fields.'); return; }
  if (password.length < 8) { _authErr('lg-error-up', 'Password must be at least 8 characters.'); return; }

  _setBtn('lg-btn-up', true, 'Creating account…');
  const res = await _sbAuth('signup', { email, password, data: { full_name: name } });

  if (res.access_token) {
    // Auto-confirmed (email confirmation disabled)
    _saveSession({ access_token: res.access_token, refresh_token: res.refresh_token, expires_at: Date.now() + (res.expires_in * 1000) });
    await _loadProfile();
    _onAuthSuccess();
  } else if (res.id || (res.identities && res.identities.length === 0)) {
    // Email confirmation required
    showAuthPanel('verify');
  } else {
    _authErr('lg-error-up', res.error_description || res.msg || 'Signup failed. Please try again.');
    _setBtn('lg-btn-up', false, 'Create Account →');
  }
}

// ── Google OAuth ─────────────────────────────────────
async function handleGoogleSignIn() {
  const redirectTo = window.location.origin + window.location.pathname;
  const r = await fetch(`${_SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(redirectTo)}`, {
    method: 'GET',
    headers: { 'apikey': _SUPABASE_ANON },
    redirect: 'manual'
  });
  // Supabase returns a redirect — extract URL from response or just redirect directly
  const url = `${_SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(redirectTo)}`;
  window.location.href = url;
}

// ── Magic Link ────────────────────────────────────────
async function handleMagicLink() {
  const email = document.getElementById('auth-email').value.trim();
  if (!email) { _authErr('lg-error', 'Please enter your email first.'); return; }
  await _sbAuth('magiclink', { email });
  showAuthPanel('magic');
}

// ── On successful auth ────────────────────────────────
function _onAuthSuccess() {
  document.getElementById('license-gate').style.display = 'none';
  document.getElementById('cred-modal').style.display   = 'flex';
  _applyTierUI();
}

// ── Tab access control ────────────────────────────────
const _TAB_GATES = {}; // stores lock messages per tab id

function _setTabAccess(tabId, allowed, upgradeMsg, subMsg) {
  const btn = document.getElementById(tabId);
  if (!btn) return;
  _TAB_GATES[tabId] = { allowed, upgradeMsg, subMsg };
  if (allowed) {
    btn.classList.remove('locked');
    btn.innerHTML = btn.innerHTML.replace(/<span class="lock-icon">.*?<\/span>\s*/g, '');
  } else {
    btn.classList.add('locked');
    if (!btn.querySelector('.lock-icon')) {
      btn.innerHTML = '<span class="lock-icon">🔒</span> ' + btn.textContent.trim();
    }
  }
}

// ── Tier UI (replaces old _applyTierUI) ───────────────
function _applyTierUI() {
  const tier  = _TIER || 'basic';
  const perms = _TIERS[tier] || _TIERS.basic;

  _setTabAccess('tab-launchpads', perms.launchpads, 'Upgrade to PRO to access Launchpads', 'Launchpads auto-populate from your Core Setup answers');
  _setTabAccess('tab-marketing',  perms.marketing,  'Upgrade to AGENCY to access Marketing', 'Full social campaigns & content engine');

  const badge = document.getElementById('tier-badge');
  if (badge) {
    badge.className = `tier-badge tier-${tier}`;
    badge.textContent = tier.toUpperCase();
    badge.style.display = 'inline-flex';
  }
  // Show upgrade or manage plan button
  const upgradeBtn = document.getElementById('upgrade-btn');
  const billingBtn = document.getElementById('billing-btn');
  if (upgradeBtn) upgradeBtn.style.display = (tier === 'agency' || tier === 'owner') ? 'none' : 'inline-block';
  if (billingBtn) billingBtn.style.display = (tier === 'basic' && !_PROFILE?.stripe_customer_id) ? 'none' : 'inline-block';
}

// ── Allowed domains ───────────────────────────────────
const _ALLOWED = [
  'dev.connectandbook.com',
  'app.jetpack.ghluniversity.com',
  'jetpack.ghluniversity.com',
  'embed.jetpack.ghluniversity.com',
  'affiliates.jetpack.ghluniversity.com',
  'dev.ghluniversity.com',
  'localhost',
  '127.0.0.1'
];
function _domainOk() {
  const h = window.location.hostname;
  return _ALLOWED.some(d => h === d || h.endsWith('.'+d));
}

// Boot sequence — auth check
window.addEventListener('DOMContentLoaded', async () => {
  // Domain check
  if (!_domainOk()) {
    document.getElementById('license-gate').innerHTML = '<div style="text-align:center;padding:60px 40px;max-width:400px"><div style="font-size:48px;margin-bottom:20px">🔒</div><div style="font-size:16px;font-weight:800;color:#fff;margin-bottom:10px">Unauthorized Domain</div><div style="font-size:12px;color:rgba(255,255,255,0.5);line-height:1.6">This tool is only authorized to run at<br><strong style="color:var(--yellow)">app.jetpack.ghluniversity.com</strong><br><br>If you believe this is an error, contact support.</div></div>';
    document.getElementById('license-gate').style.display = 'flex';
    return;
  }

  // Handle magic link / OAuth redirect
  const wasRedirect = _handleRedirect();

  // Restore session
  _SESSION = _loadSession();

  if (_SESSION) {
    const valid = await _ensureToken();
    if (valid) {
      await _loadProfile();
      _onAuthSuccess();
      return;
    }
  }

  // No valid session — show auth gate
  document.getElementById('license-gate').style.display = 'flex';

  // Check post-checkout redirect
  _checkCheckoutReturn();

  // Auto-refresh token every 10 min
  setInterval(async () => { if (_SESSION) await _ensureToken(); }, 10 * 60 * 1000);
});



/* ═══════════════════════════════════════
   CORE SETUP RENDERING
═══════════════════════════════════════ */
function buildCoreSetupSidebar() {
  const done  = GHL_CHECKLIST.filter(s => _ghlChecked[s.id]).length;
  const total = GHL_CHECKLIST.length;
  return `
    <div class="sidebar-section-label">GHL Setup Checklist</div>
    <button class="sidebar-item${currentCoreSetupSection==='ghl-checklist'?' active':''}" onclick="switchCoreSetupSection('ghl-checklist')">
      📋 GHL Checklist <div class="cs-progress-pill">${done}/${total}</div>
    </button>
    <div class="sidebar-section-label" style="margin-top:12px">Foundational Docs</div>
    <button class="sidebar-item${currentDoc==='business'&&currentCoreSetupSection==='docs'?' active':''}" onclick="switchCoreSetupSection('docs','business')">Business Profile <div class="item-status" id="dot-business"></div></button>
    <button class="sidebar-item${currentDoc==='brand'&&currentCoreSetupSection==='docs'?' active':''}" onclick="switchCoreSetupSection('docs','brand')">Brand Guidelines <div class="item-status" id="dot-brand"></div></button>
    <button class="sidebar-item${currentDoc==='audience'&&currentCoreSetupSection==='docs'?' active':''}" onclick="switchCoreSetupSection('docs','audience')">Audience Profile <div class="item-status" id="dot-audience"></div></button>
    <button class="sidebar-item${currentDoc==='offers'&&currentCoreSetupSection==='docs'?' active':''}" onclick="switchCoreSetupSection('docs','offers')">Offers Portfolio <div class="item-status" id="dot-offers"></div></button>`;
}

function switchCoreSetupSection(section, subKey) {
  currentCoreSetupSection = section;
  if (section === 'docs' && subKey) currentDoc = subKey;
  document.getElementById('sidebar').innerHTML = buildCoreSetupSidebar();
  renderCoreSetup();
  updateSidebarDots();
}

function renderCoreSetup() {
  if (currentCoreSetupSection === 'ghl-checklist') {
    renderGHLChecklist();
  } else if (currentCoreSetupSection === 'docs') {
    renderDoc(currentDoc);
  }
}

function renderGHLChecklist() {
  const { loc, agencyUrl } = getCreds();
  const ghlDomain = agencyUrl || 'app.gohighlevel.com';
  const baseUrl = loc ? `https://${ghlDomain}/location/${loc}/` : null;
  const done  = GHL_CHECKLIST.filter(s => _ghlChecked[s.id]).length;
  const total = GHL_CHECKLIST.length;
  const pct   = Math.round(done/total*100);

  let html = `
    <div class="page-header">
      <div class="page-header-top">
        <div class="page-title-row">
          <span class="page-icon">⚙️</span>
          <div>
            <div class="page-title">GHL Setup Checklist</div>
            <div class="page-sub">Complete these steps to set up your GHL account. Check each item once done.</div>
          </div>
        </div>
      </div>
    </div>
    <div class="progress-bar-wrap">
      <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
      <div class="progress-label">${done} / ${total} steps complete · ${pct}%</div>
    </div>
    <div class="content"><div class="checklist-grid">`;

  GHL_CHECKLIST.forEach(item => {
    const checked = !!_ghlChecked[item.id];
    const active  = _activeChecklistItem === item.id;
    html += `
      <div class="checklist-item${checked?' checked':''}${active?' expanded':''}" id="cli-${item.id}">
        <div class="checklist-item-header" onclick="openChecklistItem('${item.id}')">
          <div class="checklist-left">
            <div class="checklist-checkbox${checked?' done':''}" onclick="event.stopPropagation();toggleChecklist('${item.id}')">${checked?'✓':''}</div>
            <div class="checklist-num">${item.num}</div>
            <div class="checklist-text">
              <div class="checklist-label">${item.label}</div>
              <div class="checklist-sub">${item.sub}</div>
            </div>
          </div>
          <div class="checklist-chevron">${active?'▲':'▼'}</div>
        </div>
        ${active ? `
        <div class="checklist-body">
          <p class="checklist-desc">${item.desc}</p>
          ${item.video ? `<div class="checklist-video-wrap"><iframe src="${item.video}?rel=0&modestbranding=1" frameborder="0" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>` : ''}
          <div class="checklist-actions">
            ${item.link && baseUrl ? `<a class="checklist-link-btn" href="${baseUrl}${item.link}" target="_blank" rel="noopener">🔗 ${item.linkLabel} ↗</a>` : ''}
            ${!checked ? `<button class="checklist-done-btn" onclick="toggleChecklist('${item.id}')">✓ Mark Complete</button>` : `<span class="checklist-complete-badge">✓ Completed</span>`}
          </div>
        </div>` : ''}
      </div>`;
  });

  html += `</div></div>`;
  document.getElementById('page-content').innerHTML = html;
}

/* ═══════════════════════════════════════
   PRICING & CHECKOUT
═══════════════════════════════════════ */

const _PRICES = {
  basic:  { mo: 'price_1T9p6kIfHbUBqIETVALD0ktp', yr: 'price_1T9p7eIfHbUBqIETlrzMwiwy', mo_amt:'$27', yr_amt:'$22', mo_full:'$27', yr_full:'$22' },
  pro:    { mo: 'price_1T9p8PIfHbUBqIET1ejMXvSK', yr: 'price_1T9p8jIfHbUBqIETmY6XOQNs', mo_amt:'$67', yr_amt:'$54', mo_full:'$67', yr_full:'$54' },
  agency: { mo: 'price_1T9pBpIfHbUBqIETqVYvWgPs', yr: 'price_1T9pCSIfHbUBqIETwsjIHeJK', mo_amt:'$147', yr_amt:'$118', mo_full:'$147', yr_full:'$118' },
};

let _billingAnnual = false;

function toggleBilling() {
  _billingAnnual = !_billingAnnual;
  const track = document.getElementById('pm-toggle');
  track.classList.toggle('annual', _billingAnnual);
  document.getElementById('pm-lbl-mo').classList.toggle('active', !_billingAnnual);
  document.getElementById('pm-lbl-yr').classList.toggle('active', _billingAnnual);

  ['basic','pro','agency'].forEach(tier => {
    const p = _PRICES[tier];
    document.getElementById(`pm-price-${tier}`).textContent = _billingAnnual ? p.yr_amt : p.mo_amt;
    document.getElementById(`pm-period-${tier}`).textContent = _billingAnnual ? '/mo billed annually' : '/mo';
  });
}

function openPricing() {
  // Highlight current tier
  const cur = _TIER || 'basic';
  ['basic','pro','agency'].forEach(tier => {
    const btn = document.getElementById(`pm-btn-${tier}`);
    if (!btn) return;
    if (tier === cur) {
      btn.textContent = 'Current Plan';
      btn.className = 'pm-card-btn current';
      btn.onclick = null;
    } else {
      btn.className = tier === 'pro' ? 'pm-card-btn primary' : 'pm-card-btn secondary';
      btn.textContent = `Get ${tier.charAt(0).toUpperCase()+tier.slice(1)}`;
      btn.onclick = () => startCheckout(tier);
    }
  });
  document.getElementById('pricing-modal').classList.add('open');
}

function closePricing() {
  document.getElementById('pricing-modal').classList.remove('open');
}

// Close on backdrop click
document.addEventListener('click', e => {
  const modal = document.getElementById('pricing-modal');
  if (e.target === modal) closePricing();
});

async function startCheckout(tier) {
  const btn = document.getElementById(`pm-btn-${tier}`);
  if (btn) { btn.disabled = true; btn.textContent = 'Loading…'; }

  const priceId = _billingAnnual ? _PRICES[tier].yr : _PRICES[tier].mo;

  try {
    const r = await fetch(`${_API_BASE}/stripe/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${_SESSION?.access_token}`
      },
      body: JSON.stringify({
        price_id: priceId,
        success_url: `${window.location.origin}${window.location.pathname}?checkout=success`,
        cancel_url:  `${window.location.origin}${window.location.pathname}?checkout=cancel`,
      })
    });
    const data = await r.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error(data.error || 'Checkout failed');
    }
  } catch(e) {
    alert('Could not start checkout: ' + e.message);
    if (btn) { btn.disabled = false; btn.textContent = `Get ${tier.charAt(0).toUpperCase()+tier.slice(1)}`; }
  }
}

async function openBillingPortal() {
  try {
    const r = await fetch(`${_API_BASE}/stripe/portal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${_SESSION?.access_token}`
      },
      body: JSON.stringify({ return_url: window.location.href })
    });
    const data = await r.json();
    if (data.url) window.location.href = data.url;
  } catch(e) {
    alert('Could not open billing portal.');
  }
}

// Handle post-checkout redirect
function _checkCheckoutReturn() {
  const p = new URLSearchParams(window.location.search);
  if (p.get('checkout') === 'success') {
    history.replaceState(null, '', window.location.pathname);
    // Reload profile to get updated tier
    setTimeout(async () => {
      await _loadProfile();
      _applyTierUI();
      _showToast('🎉 Welcome! Your plan has been activated.', 'green');
    }, 2000);
  }
}

function _showToast(msg, color) {
  let t = document.getElementById('app-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'app-toast';
    t.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);border-radius:10px;padding:14px 24px;z-index:9999;text-align:center;box-shadow:0 8px 32px rgba(0,0,0,0.4);font-size:12px;font-weight:700;font-family:var(--font);';
    document.body.appendChild(t);
  }
  const bg = color === 'green' ? 'rgba(55,202,55,0.15)' : 'rgba(255,187,0,0.12)';
  const bc = color === 'green' ? 'var(--green-b)' : 'var(--yellow-b)';
  const tc = color === 'green' ? 'var(--green)' : 'var(--yellow)';
  t.style.cssText += `;background:${bg};border:1px solid ${bc};color:${tc};`;
  t.textContent = msg;
  t.style.display = 'block';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.style.display = 'none', 5000);
}

function getCreds()         { return { claude: S.raw('aob_claude'), token: S.raw('aob_ghl_token'), loc: S.raw('aob_ghl_loc'), agencyUrl: S.raw('aob_ghl_url') }; }

/* ── History (up to 8 snapshots per field) ── */
const HIST_MAX = 8;
function getHistory(key)       { return S.get('aob_hist_'+key, []); }
function clearHistory(key)     { S.set('aob_hist_'+key, []); refreshHistBtn(key); }
function _pushHistory(key, val) {
  let h = getHistory(key);
  if (h.length && h[0].v === val) return;
  h.unshift({ v: val, t: Date.now() });
  if (h.length > HIST_MAX) h = h.slice(0, HIST_MAX);
  S.set('aob_hist_'+key, h);
  refreshHistBtn(key);
}
function refreshHistBtn(key) {
  const btn = document.getElementById('btn-hist-'+key);
  if (!btn) return;
  const h = getHistory(key);
  btn.classList.toggle('has-history', h.length > 0);
  btn.title = h.length ? `${h.length} saved version${h.length>1?'s':''}` : 'No history yet';
  btn.textContent = h.length ? `⏱ ${h.length}` : '⏱';
}
function fmtTs(ts) {
  const diff = Date.now() - ts;
  if (diff < 60000)   return 'just now';
  if (diff < 3600000) return Math.round(diff/60000)+'m ago';
  if (diff < 86400000)return Math.round(diff/3600000)+'h ago';
  return new Date(ts).toLocaleDateString()+' '+new Date(ts).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
}
function toggleHistory(key) {
  const dd = document.getElementById('hist-dd-'+key);
  if (!dd) return;
  // Close all other open dropdowns first
  document.querySelectorAll('.history-dropdown.open').forEach(el => {
    if (el.id !== 'hist-dd-'+key) el.classList.remove('open');
  });
  const h = getHistory(key);
  dd.innerHTML = `
    <div class="history-header">
      <span>Version History</span>
      ${h.length ? `<button class="btn-clear-history" onclick="clearHistory('${key}');document.getElementById('hist-dd-${key}').classList.remove('open')">Clear</button>` : ''}
    </div>
    ${!h.length ? '<div class="history-empty">No history yet.<br>Changes save automatically.</div>' :
      h.map((item,i) => `
        <div class="history-item" onclick="restoreHistory('${key}','${i}')">
          <div class="history-item-text">${esc(item.v)}</div>
          <div class="history-item-meta">
            <span>${fmtTs(item.t)}</span>
            <span class="history-item-use">↩ Restore</span>
          </div>
        </div>`).join('')
    }`;
  dd.classList.toggle('open');
}
function restoreHistory(key, idx) {
  const h = getHistory(key);
  const item = h[parseInt(idx)];
  if (!item) return;
  const inp = document.getElementById('finp-'+key);
  if (inp) {
    inp.value = item.v;
    // Trigger as if user typed it
    onFieldInput(key, item.v);
  }
  document.getElementById('hist-dd-'+key)?.classList.remove('open');
}
// Close dropdowns on outside click
document.addEventListener('click', e => {
  if (!e.target.closest('.history-wrap')) {
    document.querySelectorAll('.history-dropdown.open').forEach(el => el.classList.remove('open'));
  }
});

/* ═══════════════════════════════════════
   CREDENTIALS
═══════════════════════════════════════ */
function toggleVis(id) {
  const el = document.getElementById(id);
  if (el) el.type = el.type==='password'?'text':'password';
}

window.addEventListener('load', () => {
  const c = getCreds();
  if (c.claude) document.getElementById('inp-claude').value = c.claude;
  if (c.token)  document.getElementById('inp-ghl-token').value = c.token;
  if (c.loc)    document.getElementById('inp-ghl-location').value = c.loc;
  if (c.agencyUrl) document.getElementById('inp-ghl-url').value = c.agencyUrl;
  if (c.claude && c.token && c.loc) {
    launchApp();
  }
});

async function verifyCreds() {
  const claude     = document.getElementById('inp-claude').value.trim();
  const token      = document.getElementById('inp-ghl-token').value.trim();
  const loc        = document.getElementById('inp-ghl-location').value.trim();
  const agencyUrl  = document.getElementById('inp-ghl-url').value.trim().replace(/^https?:\/\//i,'').replace(/\/+$/,'');
  const errEl  = document.getElementById('cred-error');
  const btn    = document.getElementById('btn-verify');
  errEl.style.display = 'none';

  if (!claude) { showCredErr('Claude API Key is required'); return; }
  if (!claude.startsWith('sk-ant-')) { showCredErr('Claude key should start with sk-ant-'); return; }
  if (!token)  { showCredErr('GHL Integration Token is required'); return; }
  if (!loc)    { showCredErr('GHL Location ID is required'); return; }

  btn.disabled = true; btn.textContent = '⏳ Verifying…';

  // Test Claude
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method:'POST',
      headers:{ 'Content-Type':'application/json','x-api-key':claude,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true' },
      body: JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:10, messages:[{role:'user',content:'ping'}] })
    });
    if (!r.ok) { const e=await r.json().catch(()=>{}); throw new Error('Claude: '+(e?.error?.message||`HTTP ${r.status}`)); }
  } catch(e) {
    btn.disabled=false; btn.textContent='Verify & Enter Builder →';
    showCredErr(e.message); return;
  }

  // Test GHL
  try {
    const r = await fetch(`https://services.leadconnectorhq.com/locations/${loc}/customValues`,
      { headers:{ 'Authorization':'Bearer '+token,'Content-Type':'application/json','Version':'2021-07-28' } });
    if (!r.ok) { const e=await r.json().catch(()=>{}); throw new Error('GHL: '+(e?.message||`HTTP ${r.status}`)); }
  } catch(e) {
    btn.disabled=false; btn.textContent='Verify & Enter Builder →';
    showCredErr(e.message); return;
  }

  S.rset('aob_claude', claude); S.rset('aob_ghl_token', token); S.rset('aob_ghl_loc', loc); S.rset('aob_ghl_url', agencyUrl);
  btn.disabled=false; btn.textContent='Verify & Enter Builder →';
  launchApp();
}

function showCredErr(msg) {
  const el = document.getElementById('cred-error');
  el.textContent = '✗ '+msg; el.style.display='block';
}

function openCredModal() {
  document.getElementById('cred-modal').style.display='flex';
  // Only show close button if the app is already open (i.e. user is editing creds, not first-time setup)
  const closeBtn = document.getElementById('cred-close-btn');
  if (closeBtn) closeBtn.style.display = document.getElementById('app').style.display === 'flex' ? 'block' : 'none';
}

function closeCredModal() {
  document.getElementById('cred-modal').style.display='none';
}

function doLogout() {
  if (!confirm('Log out and clear your saved credentials?')) return;
  // Clear Supabase session
  _saveSession(null);
  // Clear GHL credentials
  ['aob_claude','aob_ghl_token','aob_ghl_loc','aob_ghl_url'].forEach(k => {
    try { localStorage.removeItem(k); } catch {}
  });
  // Reset UI and show auth gate
  document.getElementById('app').style.display = 'none';
  document.getElementById('cred-modal').style.display = 'none';
  document.getElementById('license-gate').style.display = 'flex';
}

function launchApp() {
  document.getElementById('cred-modal').style.display='none';
  document.getElementById('app').style.display='flex';
  _applyTierUI(); // apply tier gating before any tab renders
  document.getElementById('tab-core-setup').classList.add('active');
  document.getElementById('sidebar').innerHTML = buildDocsSidebar();
  loadChecklistState();
  document.getElementById('sidebar').innerHTML = buildCoreSetupSidebar();
  renderGHLChecklist();
  updateSidebarDots();
  updateSidebarDots();
  updateOverallProgress();
  // Auto-load current GHL values into all fields
  loadFromGHL();
}

/* ═══════════════════════════════════════
   LAUNCHPAD STATE
═══════════════════════════════════════ */
let currentLaunchpad = 'masterclass';
let currentLPSection = {};  // { launchpadKey: sectionKey }
let currentLPStep    = {};  // { launchpadKey_sectionKey: stepIndex }

function getLPSectionKey(lpKey) {
  return currentLPSection[lpKey] || Object.keys(LAUNCHPADS[lpKey].sections)[0];
}
function getLPStepIdx(lpKey, secKey) {
  return currentLPStep[lpKey+'_'+secKey] || 0;
}

/* ═══════════════════════════════════════
   TOP TAB SWITCHING
═══════════════════════════════════════ */
function switchTopTab(tab) {
  const tabId = 'tab-' + tab;
  const gate = _TAB_GATES[tabId];

  // Block access if locked
  if (gate && !gate.allowed) {
    // Still mark the tab visually active so user knows where they tried to go
    document.querySelectorAll('.topnav-tab').forEach(b => b.classList.remove('active'));
    const t = document.getElementById(tabId);
    if (t) t.classList.add('active');
    currentTopTab = tab;

    // Show lock overlay in content area
    document.getElementById('sidebar').innerHTML = '';
    document.getElementById('page-content').innerHTML = `
      <div style="position:relative;height:100%;min-height:400px;">
        <div class="tab-locked-overlay">
          <div style="font-size:36px;margin-bottom:4px">🔒</div>
          <div class="lock-msg">${gate.upgradeMsg}</div>
          <div class="lock-sub">${gate.subMsg}</div>
          <button class="lock-upgrade" onclick="openPricing()">View Plans & Upgrade →</button>
        </div>
      </div>`;
    return;
  }

  currentTopTab = tab;
  document.querySelectorAll('.topnav-tab').forEach(b => b.classList.remove('active'));
  const t = document.getElementById('tab-'+tab);
  if(t) t.classList.add('active');

  if (tab === 'core-setup') {
    loadChecklistState();
    document.getElementById('sidebar').innerHTML = buildCoreSetupSidebar();
    renderCoreSetup();
    updateSidebarDots();
  } else if (tab === 'docs') {
    document.getElementById('sidebar').innerHTML = buildDocsSidebar();
    renderDoc(currentDoc);
  } else if (tab === 'launchpads') {
    document.getElementById('sidebar').innerHTML = buildLPSidebar();
    renderLaunchpad(currentLaunchpad);
  } else if (tab === 'marketing') {
    document.getElementById('sidebar').innerHTML = '';
    document.getElementById('page-content').innerHTML = `
      <div class="welcome-state">
        <div class="welcome-icon">📣</div>
        <div class="welcome-title">Marketing — Coming Soon</div>
        <div class="welcome-sub">This section will be unlocked in the next build phase.</div>
      </div>`;
  }
}

function buildDocsSidebar() {
  return `
    <div class="sidebar-section-label">Foundational Documents</div>
    <button class="sidebar-item${currentDoc==='business'?' active':''}" id="sib-business" onclick="switchDoc('business')">Business Profile <div class="item-status" id="dot-business"></div></button>
    <button class="sidebar-item${currentDoc==='brand'?' active':''}" id="sib-brand" onclick="switchDoc('brand')">Brand Guidelines <div class="item-status" id="dot-brand"></div></button>
    <button class="sidebar-item${currentDoc==='audience'?' active':''}" id="sib-audience" onclick="switchDoc('audience')">Audience Profile <div class="item-status" id="dot-audience"></div></button>
    <button class="sidebar-item${currentDoc==='offers'?' active':''}" id="sib-offers" onclick="switchDoc('offers')">Offers Portfolio <div class="item-status" id="dot-offers"></div></button>`;
}

function buildLPSidebar() {
  let html = '<div class="sidebar-section-label">Launchpads</div>';
  Object.entries(LAUNCHPADS).forEach(([lpKey, lp]) => {
    const allF = getAllLPFields(lpKey);
    const filled = allF.filter(f => getField(f.key).trim()).length;
    let dotClass = 'item-status';
    if (filled > 0 && filled < allF.length) dotClass = 'item-status partial';
    else if (filled === allF.length && allF.length > 0) dotClass = 'item-status done';
    html += `<button class="sidebar-item${currentLaunchpad===lpKey?' active':''}" id="sib-lp-${lpKey}" onclick="switchLaunchpad('${lpKey}')">
      ${lp.icon} ${lp.label} <div class="${dotClass}" id="lpdot-${lpKey}"></div>
    </button>`;
  });
  return html;
}

function getAllLPFields(lpKey) {
  const lp = LAUNCHPADS[lpKey];
  return Object.values(lp.sections).flatMap(sec => sec.steps.flatMap(st => st.fields));
}

function switchLaunchpad(lpKey) {
  currentLaunchpad = lpKey;
  document.querySelectorAll('.sidebar-item').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('sib-lp-'+lpKey);
  if(btn) btn.classList.add('active');
  renderLaunchpad(lpKey);
}

/* ═══════════════════════════════════════
   RENDER LAUNCHPAD
═══════════════════════════════════════ */
function renderLaunchpad(lpKey) {
  const lp = LAUNCHPADS[lpKey];
  const secKey = getLPSectionKey(lpKey);
  const stepIdx = getLPStepIdx(lpKey, secKey);

  const allF = getAllLPFields(lpKey);
  const filled = allF.filter(f => getField(f.key).trim()).length;
  const pct = allF.length ? Math.round(filled/allF.length*100) : 0;

  // Build sub-section buttons
  const secButtons = Object.entries(lp.sections).map(([sk, sec]) => {
    const secFields = sec.steps.flatMap(s=>s.fields);
    const secFilled = secFields.filter(f=>getField(f.key).trim()).length;
    const done = secFilled === secFields.length && secFields.length > 0;
    const partial = secFilled > 0 && !done;
    const indicator = done ? ' ✓' : partial ? ' ·' : '';
    return `<button class="subtab${sk===secKey?' active':''}" onclick="switchLPSection('${lpKey}','${sk}')">${sec.label}${indicator}</button>`;
  }).join('');

  const sec = lp.sections[secKey];
  const step = sec.steps[stepIdx] || sec.steps[0];

  // Step panel
  const stepItems = sec.steps.map((st, i) => {
    const stFilled = st.fields.filter(f=>getField(f.key).trim()).length;
    const stDone = stFilled === st.fields.length;
    const isActive = i === stepIdx;
    return `<div class="lp-step-item${isActive?' active':''}" onclick="switchLPStep('${lpKey}','${secKey}',${i})">
      <div class="lp-step-num">${i+1}</div>
      <div class="lp-step-label">${st.label}</div>
      ${stDone ? '<div style="color:var(--green);font-size:9px;flex-shrink:0">✓</div>' : ''}
    </div>`;
  }).join('');

  // Fields
  let fieldsHtml = '';
  if (step.note) {
    fieldsHtml += `<div class="lp-step-note">${step.note}</div>`;
  }
  step.fields.forEach(field => {
    const val = getField(field.key);
    const hasVal = val.trim().length > 0;
    let inputHtml = '';
    if (field.type === 'color') {
      inputHtml = `<div class="lp-color-row">
        <input type="color" class="lp-color-swatch" id="finp-swatch-${field.key}" value="${val||'#000000'}" oninput="onLPColorInput('${field.key}',this.value)">
        <input type="text" class="field-input lp-color-hex" id="finp-${field.key}" value="${esc(val)}" placeholder="#000000" oninput="onLPHexInput('${field.key}',this.value)">
      </div>`;
    } else if (field.type === 'upload') {
      inputHtml = `<div class="lp-upload-zone" id="finp-${field.key}">
        <div class="lp-upload-icon">📎</div>
        <div class="lp-upload-text">Upload your file</div>
        <div class="lp-upload-hint">${field.hint||'Supports images and videos up to 50MB (JPG, PNG, JPEG, MP4)'}</div>
        ${val ? `<div class="lp-upload-val">✓ ${esc(val)}</div>` : ''}
        <input type="text" class="field-input" style="margin-top:8px;background:rgba(255,255,255,0.05);padding:4px 8px;border-radius:4px;font-size:11px" id="finp-url-${field.key}" value="${esc(val)}" placeholder="Or paste URL here…" oninput="onFieldInput('${field.key}',this.value)">
      </div>`;
    } else if (field.type === 'dropdown') {
      inputHtml = `<select class="field-input lp-select" id="finp-${field.key}" onchange="onFieldInput('${field.key}',this.value)">
        <option value="">Please select an option</option>
        ${val ? `<option value="${esc(val)}" selected>${esc(val)}</option>` : ''}
      </select>`;
    } else if (field.type === 'textarea') {
      inputHtml = `<textarea class="field-input" id="finp-${field.key}" rows="3" placeholder="Enter ${esc(field.name)}…" oninput="onFieldInput('${field.key}',this.value)">${esc(val)}</textarea>`;
    } else {
      inputHtml = `<input class="field-input" type="text" id="finp-${field.key}" value="${esc(val)}" placeholder="Enter ${esc(field.name)}…" oninput="onFieldInput('${field.key}',this.value)">`;
    }

    fieldsHtml += `
      <div class="lp-field-block${hasVal?' has-val':''}" id="fcard-${field.key}">
        <div class="lp-field-label">${field.name}</div>
        <div class="lp-field-input-wrap">${inputHtml}</div>
        <div class="lp-field-footer">
          <div class="field-status" id="fstatus-${field.key}">${hasVal?'● Saved':'○ Empty'}</div>
          <button class="btn-sync" id="btn-sync-${field.key}" onclick="syncLPField('${field.key}','${field.ghl}')">⚡ Sync</button>
        </div>
      </div>`;
  });

  // Nav buttons
  const isFirst = stepIdx === 0;
  const isLast  = stepIdx === sec.steps.length - 1;
  const navBtns = `
    <div class="lp-nav-btns">
      ${!isFirst ? `<button class="lp-btn-back" onclick="switchLPStep('${lpKey}','${secKey}',${stepIdx-1})">← Back</button>` : '<span></span>'}
      <button class="lp-btn-save" onclick="saveLPStep('${lpKey}','${secKey}',${stepIdx})">Save</button>
      ${!isLast ? `<button class="lp-btn-next" onclick="switchLPStep('${lpKey}','${secKey}',${stepIdx+1})">Next Step →</button>` : ''}
    </div>`;

  const html = `
    <div class="page-header">
      <div class="page-header-top">
        <div class="page-title-row">
          <span class="page-icon">${lp.icon}</span>
          <div>
            <div class="page-title">${lp.label}</div>
            <div class="page-sub">${filled} / ${allF.length} fields complete · ${pct}%</div>
          </div>
        </div>
        <button class="btn-sync-all" onclick="syncAllLPFields('${lpKey}')">⚡ Sync All to GHL</button>
      </div>
      <div class="subtabs">${secButtons}</div>
    </div>
    <div class="progress-bar-wrap">
      <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
      <div class="progress-label">${filled} / ${allF.length} fields · ${pct}%</div>
    </div>
    <div class="lp-body">
      <div class="lp-steps-panel">
        <div class="lp-steps-title">Step ${stepIdx+1}</div>
        ${stepItems}
      </div>
      <div class="lp-content-panel">
        <div class="lp-content-title">${lp.label} – ${sec.label}</div>
        <div class="lp-content-sub">${sec.label} – ${step.label}.</div>
        ${fieldsHtml}
        ${navBtns}
      </div>
    </div>`;

  document.getElementById('page-content').innerHTML = html;
}

function switchLPSection(lpKey, secKey) {
  currentLPSection[lpKey] = secKey;
  renderLaunchpad(lpKey);
}

function switchLPStep(lpKey, secKey, idx) {
  currentLPStep[lpKey+'_'+secKey] = idx;
  renderLaunchpad(lpKey);
}

function saveLPStep(lpKey, secKey, idx) {
  // Fields auto-save on input; this just gives visual feedback
  const btn = document.querySelector('.lp-btn-save');
  if (btn) { btn.textContent = '✓ Saved'; setTimeout(()=>{ btn.textContent='Save'; }, 1500); }
  updateLPDots(lpKey);
}

function onLPColorInput(key, hex) {
  const hexInp = document.getElementById('finp-'+key);
  if (hexInp) hexInp.value = hex;
  onFieldInput(key, hex);
}

function onLPHexInput(key, hex) {
  const swatch = document.getElementById('finp-swatch-'+key);
  if (swatch && /^#[0-9A-Fa-f]{6}$/.test(hex)) swatch.value = hex;
  onFieldInput(key, hex);
}

function updateLPDots(lpKey) {
  const allF = getAllLPFields(lpKey);
  const filled = allF.filter(f => getField(f.key).trim()).length;
  const dot = document.getElementById('lpdot-'+lpKey);
  if (!dot) return;
  if (filled === 0) dot.className = 'item-status';
  else if (filled === allF.length) dot.className = 'item-status done';
  else dot.className = 'item-status partial';
}

async function syncLPField(key, ghlName) {
  const value = getField(key).trim();
  const btn = document.getElementById('btn-sync-'+key);
  const st  = document.getElementById('fstatus-'+key);
  if (!value) { if(st){st.className='field-status err';st.textContent='✗ Nothing to sync — fill in a value first';} return; }
  if(btn){btn.disabled=true;btn.innerHTML='<span class="spinner"></span>';}
  if(st){st.className='field-status busy';st.textContent='● Syncing…';}
  try {
    const result = await writeCV(ghlName, value);
    const card = document.getElementById('fcard-'+key);
    if(card){card.classList.add('synced');card.classList.remove('error');}
    if(st){st.className='field-status ok';st.textContent=`✓ ${result==='created'?'Created':'Updated'} in GHL`;}
    if(btn){btn.textContent='✓ Done';setTimeout(()=>{btn.textContent='⚡ Sync';btn.disabled=false;},2000);}
  } catch(e) {
    const card = document.getElementById('fcard-'+key);
    if(card) card.classList.add('error');
    if(st){st.className='field-status err';st.textContent='✗ '+e.message;}
    if(btn){btn.textContent='Retry';btn.disabled=false;}
  }
}

async function syncAllLPFields(lpKey) {
  const allFields = getAllLPFields(lpKey);
  _cvCache = null;
  let created=0,updated=0,skipped=0,errors=0;
  for (const field of allFields) {
    const value = getField(field.key).trim();
    if (!value) { skipped++; continue; }
    try {
      const r = await writeCV(field.ghl, value);
      r==='created'?created++:updated++;
      const card=document.getElementById('fcard-'+field.key);
      if(card){card.classList.add('synced');card.classList.remove('error');}
      const st=document.getElementById('fstatus-'+field.key);
      if(st){st.className='field-status ok';st.textContent=`✓ ${r==='created'?'Created':'Updated'} in GHL`;}
    } catch(e) {
      errors++;
      const card=document.getElementById('fcard-'+field.key);
      if(card) card.classList.add('error');
    }
  }
  alert(`Sync complete: ${created} created · ${updated} updated · ${skipped} skipped · ${errors} errors`);
  updateLPDots(lpKey);
}

/* ═══════════════════════════════════════
   SIDEBAR DOC SWITCHING
═══════════════════════════════════════ */
function switchDoc(doc) {
  currentDoc = doc;
  document.getElementById('sidebar').innerHTML = buildDocsSidebar();
  updateSidebarDots();
  renderDoc(doc);
}

/* ═══════════════════════════════════════
   RENDER DOC
═══════════════════════════════════════ */
function renderDoc(docKey) {
  const doc = DOCS[docKey];
  const allFields = doc.sections.flatMap(s => s.fields);
  const filled = allFields.filter(f => getField(f.key).trim()).length;
  const pct = allFields.length ? Math.round(filled/allFields.length*100) : 0;

  let html = `
    <div class="page-header">
      <div class="page-header-top">
        <div class="page-title-row">
          <span class="page-icon">${doc.icon}</span>
          <div>
            <div class="page-title">${doc.label}</div>
            <div class="page-sub">${doc.sub}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="progress-bar-wrap">
      <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
      <div class="progress-label">${filled} / ${allFields.length} fields · ${pct}%</div>
    </div>
    <div class="content">`;

  // Soft gate if other docs want launchpads
  const overallPct = calcDocProgress();
  if (overallPct < 25 && docKey !== 'business') {
    html += `<div class="soft-gate">
      <span class="soft-gate-icon">⚠️</span>
      <div><strong>Tip:</strong> Start with Business Profile first — Claude uses all four Foundational Documents as context when generating answers. The more complete they are, the more tailored every AI output will be.</div>
    </div>`;
  }

  doc.sections.forEach(section => {
    html += `<div class="section-block">
      <div class="section-label">${section.label}</div>`;

    section.fields.forEach(field => {
      const val = getField(field.key);
      const hasVal = val.trim().length > 0;
      const inputEl = field.rows > 1
        ? `<textarea class="field-input" id="finp-${field.key}" rows="${field.rows}" placeholder="${esc(field.placeholder)}" oninput="onFieldInput('${field.key}',this.value)">${esc(val)}</textarea>`
        : `<input class="field-input" type="text" id="finp-${field.key}" value="${esc(val)}" placeholder="${esc(field.placeholder)}" oninput="onFieldInput('${field.key}',this.value)">`;

      html += `
        <div class="field-card${hasVal?' has-val':''}" id="fcard-${field.key}">
          <div class="field-header">
            <div class="field-meta">
              <div class="field-name">${field.name}</div>
              <div class="field-desc">${field.desc}</div>
              <div class="field-ghl-key">→ ${field.ghl}</div>
            </div>
            <div class="field-actions">
              <button class="btn-ai" id="btn-ai-${field.key}" onclick="generateField('${field.key}')">
                ✦ Generate
              </button>
              <button class="btn-sync" id="btn-sync-${field.key}" onclick="syncField('${field.key}')">
                ⚡ Sync
              </button>
              <div class="history-wrap">
                <button class="btn-history${getHistory(field.key).length?' has-history':''}" id="btn-hist-${field.key}" onclick="toggleHistory('${field.key}')" title="${getHistory(field.key).length?getHistory(field.key).length+' saved version(s)':'No history yet'}">⏱${getHistory(field.key).length?' '+getHistory(field.key).length:''}</button>
                <div class="history-dropdown" id="hist-dd-${field.key}"></div>
              </div>
            </div>
          </div>
          <div class="field-body" id="fbody-${field.key}">${inputEl}</div>
          <div class="ai-response" id="ai-resp-${field.key}">
            <div class="ai-response-header">
              <span>✦ Claude Suggestion</span>
              <button class="btn-use-ai" onclick="useAISuggestion('${field.key}')">Use This →</button>
            </div>
            <div id="ai-resp-text-${field.key}"></div>
          </div>
          <div class="field-footer">
            <div class="field-status" id="fstatus-${field.key}">${hasVal?'● Saved':'○ Empty'}</div>
            <div class="char-count" id="fcount-${field.key}">${val.length} chars</div>
          </div>
        </div>`;
    });

    html += `</div>`;
  });

  // Section sync bar
  html += `
    <div class="section-sync-bar">
      <div class="sync-summary">
        <strong>${filled}</strong> of <strong>${allFields.length}</strong> fields ready to sync to GHL
      </div>
      <button class="btn-sync-all" id="btn-sync-all-${docKey}" onclick="syncAllFields('${docKey}')">
        ⚡ Sync All to GHL
      </button>
    </div>
    <div id="sync-log"></div>
    </div>`;

  document.getElementById('page-content').innerHTML = html;
}

/* ═══════════════════════════════════════
   FIELD INTERACTION
═══════════════════════════════════════ */
function esc(str) {
  return String(str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

const _saveTimers = {};
function onFieldInput(key, val) {
  setField(key, val);
  const st   = document.getElementById('fstatus-'+key);
  const ct   = document.getElementById('fcount-'+key);
  const card = document.getElementById('fcard-'+key);
  const body = document.getElementById('fbody-'+key);
  if (ct) ct.textContent = val.length + ' chars';
  if (card) { card.classList.remove('synced'); card.classList.remove('error'); }
  if (val.trim()) {
    if (body) { body.classList.remove('save-flash'); void body.offsetWidth; body.classList.add('save-flash'); }
    if (st) { st.className='field-status ok'; st.textContent='✓ Saved'; }
    clearTimeout(_saveTimers[key]);
    _saveTimers[key] = setTimeout(() => {
      const s = document.getElementById('fstatus-'+key);
      if (s && s.textContent === '✓ Saved') { s.className='field-status'; s.textContent='● Saved'; }
    }, 2000);
  } else {
    if (st) { st.className='field-status'; st.textContent='○ Empty'; }
  }
  updateSidebarDots();
  updateOverallProgress();
}

/* ═══════════════════════════════════════
   AI GENERATION
═══════════════════════════════════════ */
function buildFoundationalContext() {
  let ctx = '';
  Object.entries(DOCS).forEach(([dk, doc]) => {
    const allFields = doc.sections.flatMap(s=>s.fields);
    const filled = allFields.filter(f=>getField(f.key).trim());
    if (filled.length) {
      ctx += `\n\n=== ${doc.label.toUpperCase()} ===\n`;
      filled.forEach(f => { ctx += `${f.name}: ${getField(f.key)}\n`; });
    }
  });
  return ctx.trim();
}

async function generateField(key) {
  const { claude } = getCreds();
  if (!claude) { alert('Add your Claude API key via ⚙ Credentials'); return; }

  // Find field definition
  let fieldDef = null;
  Object.values(DOCS).forEach(doc => {
    doc.sections.forEach(s => {
      s.fields.forEach(f => { if(f.key===key) fieldDef=f; });
    });
  });
  if (!fieldDef) return;

  const btn = document.getElementById('btn-ai-'+key);
  const respEl = document.getElementById('ai-resp-'+key);
  const respText = document.getElementById('ai-resp-text-'+key);
  btn.disabled=true; btn.innerHTML='<span class="spinner"></span> Generating…';
  if(respEl) { respEl.classList.remove('show'); }

  const context = buildFoundationalContext();
  const currentVal = getField(key);

  const systemPrompt = `You are an expert business strategist and copywriter for GHL University by Growing Entrepreneur, LLC. You help already-monetized coaches, consultants, and expert service providers build their Authority Operating System on GoHighLevel.

Your tone is: Direct, Calm, Structured, Insightful, No-hype. Operator-to-operator. Never use bro-marketing, hype income claims, or passive income framing.

The user is filling in their business profile fields. Generate a concise, specific, on-brand response for the field requested.${context ? `\n\nFOUNDATIONAL CONTEXT (use this to personalize):\n${context}` : ''}`;

  const userPrompt = `Generate a concise, specific answer for this business profile field:

Field: ${fieldDef.name}
Description: ${fieldDef.desc}
GHL Custom Value: ${fieldDef.ghl}
${currentVal ? `Current value: "${currentVal}" (improve or refine this)` : 'No value yet — generate a strong starting point.'}

Example format: ${fieldDef.placeholder}

Respond with ONLY the field value itself — no preamble, no labels, no quotes. Just the answer, ready to use.`;

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method:'POST',
      headers:{ 'Content-Type':'application/json','x-api-key':claude,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true' },
      body: JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:300, system:systemPrompt, messages:[{role:'user',content:userPrompt}] })
    });
    if (!r.ok) { const e=await r.json().catch(()=>{}); throw new Error(e?.error?.message||`HTTP ${r.status}`); }
    const data = await r.json();
    const text = data.content?.filter(b=>b.type==='text').map(b=>b.text).join('').trim()||'';

    if(respEl && respText) {
      respText.textContent = text;
      respEl.classList.add('show');
    }
    btn.disabled=false; btn.innerHTML='✦ Generate';
  } catch(e) {
    btn.disabled=false; btn.innerHTML='✦ Generate';
    const st = document.getElementById('fstatus-'+key);
    if(st) { st.className='field-status err'; st.textContent='✗ '+e.message; }
  }
}

function useAISuggestion(key) {
  const text = document.getElementById('ai-resp-text-'+key)?.textContent||'';
  if (!text) return;
  const inp = document.getElementById('finp-'+key);
  if (inp) {
    inp.value = text;
    onFieldInput(key, text); // saves + flashes + pushes history
  }
  const respEl = document.getElementById('ai-resp-'+key);
  if(respEl) respEl.classList.remove('show');
}

/* ═══════════════════════════════════════
   GHL SYNC
═══════════════════════════════════════ */
let _cvCache = null;

async function ghlFetch(path, method='GET', body=null) {
  const { token, loc } = getCreds();
  if (!token||!loc) throw new Error('GHL credentials not configured');
  const url = 'https://services.leadconnectorhq.com'+path.replace('{loc}',loc);
  const opts = { method, headers:{ 'Authorization':'Bearer '+token,'Content-Type':'application/json','Version':'2021-07-28' } };
  if (body) opts.body=JSON.stringify(body);
  const r = await fetch(url, opts);
  if (!r.ok) { const e=await r.json().catch(()=>{}); throw new Error(e?.message||`HTTP ${r.status}`); }
  return r.json();
}

async function getCVs(bust=false) {
  if (_cvCache && !bust) return _cvCache;
  const d = await ghlFetch('/locations/{loc}/customValues');
  _cvCache = d.customValues||[];
  return _cvCache;
}


function _normKey(s) {
  if (!s) return '';
  let v = s.toLowerCase();
  // Strip everything from ' - (ex:' or '__ex_' onwards
  v = v.replace(/[_\s][-–—]?[_\s]*\(?ex[_:\s].*$/i, '');
  v = v.replace(/__ex_.*$/, '');
  // Normalize decimal sub-numbers: 07.01 → 0701, 07_01 → 0701
  v = v.replace(/(\d+)[._](\d+)/g, '$1$2');
  // Normalize remaining
  return v
    .replace(/[\[\]()#–—]/g,' ')
    .replace(/[^a-z0-9\s_]/g,' ')
    .replace(/\s+/g,'_')
    .replace(/_+/g,'_')
    .replace(/^_|_$/g,'');
}

async function loadFromGHL() {
  const btn = document.getElementById('btn-load-ghl');
  const status = document.getElementById('load-ghl-status');
  if (btn) { btn.disabled=true; btn.textContent='⏳ Loading…'; }
  if (status) { status.textContent=''; status.className=''; }
  try {
    const cvs = await getCVs(true); // bust cache, fresh pull

    // DEBUG: log first 10 CV names to console so we can see what GHL returns
    console.log('GHL returned', cvs.length, 'custom values');
    console.log('First 10 CV names:', cvs.slice(0,10).map(cv=>cv.name));
    console.log('Sample MC keys in app:', Object.values(LAUNCHPADS?.masterclass?.sections||{}).flatMap(s=>s.steps.flatMap(st=>st.fields.map(f=>f.ghl))).filter(Boolean).slice(0,5));

    if (!cvs.length) {
      if (status) { status.textContent='No custom values found in GHL for this location.'; status.className='load-ghl-warn'; }
      return;
    }
    // Build lookup two ways: by exact name AND by normalised key
    const lookup = {};
    const lookupNorm = {};
    cvs.forEach(cv => {
      if (cv.name) {
        lookup[cv.name] = cv.value||'';
        lookupNorm[_normKey(cv.name)] = cv.value||'';
      }
    });

    function _cvLookup(ghlKey) {
      if (!ghlKey) return undefined;
      // Try exact match first
      if (lookup[ghlKey] !== undefined) return lookup[ghlKey];
      // Try normalised match
      const norm = _normKey(ghlKey);
      if (lookupNorm[norm] !== undefined) return lookupNorm[norm];
      return undefined;
    }

    // Debug: count how many app keys have ANY match (including empty)
    let matchCount = 0, emptyCount = 0;
    Object.values(LAUNCHPADS).forEach(lp => Object.values(lp.sections).forEach(sec => sec.steps.forEach(step => step.fields.forEach(field => {
      if (!field.ghl) return;
      const v = _cvLookup(field.ghl);
      if (v !== undefined) { matchCount++; if (v === '') emptyCount++; }
    }))));
    console.log('Key matches (any):', matchCount, '| Empty values:', emptyCount, '| No match:', 255 - matchCount);

    let populated = 0;
    let attempted = 0;

    // Populate LAUNCHPAD fields
    Object.entries(LAUNCHPADS).forEach(([lpKey, lp]) => {
      Object.entries(lp.sections).forEach(([, sec]) => {
        sec.steps.forEach(step => {
          step.fields.forEach(field => {
            const val = _cvLookup(field.ghl);
            if (field.ghl) attempted++;
            if (val !== undefined && val !== '') {
              setField(field.key, val);
              // Update visible input/textarea/select
              const el = document.getElementById('lp-field-'+field.key) || document.getElementById('field-'+field.key);
              if (el) {
                el.value = val;
                // For color fields, also sync the swatch
                if (field.type === 'color') {
                  const picker = document.getElementById('picker-'+field.key);
                  const hex    = document.getElementById('hex-'+field.key);
                  if (picker) picker.value = val;
                  if (hex)    hex.value    = val;
                }
              }
              populated++;
            }
          });
        });
      });
    });

    // Populate DOCS fields
    Object.entries(DOCS).forEach(([, doc]) => {
      doc.sections.forEach(sec => {
        sec.fields.forEach(field => {
          const val = _cvLookup(field.ghl);
          if (val !== undefined && val !== '') {
            setField(field.key, val);
            const el = document.getElementById('field-'+field.key);
            if (el) el.value = val;
            populated++;
          }
        });
      });
    });

    console.log('GHL sync: attempted='+attempted+' populated='+populated);
    // Refresh progress dots
    Object.keys(LAUNCHPADS).forEach(lpKey => updateLPDots(lpKey));

    if (status) {
      status.textContent = `✓ ${populated} field${populated!==1?'s':''} loaded from GHL`;
      status.className = 'load-ghl-ok';
    }
  } catch(e) {
    if (status) { status.textContent = '✗ '+e.message; status.className = 'load-ghl-err'; }
  } finally {
    if (btn) { btn.disabled=false; btn.textContent='↓ Load from GHL'; }
  }
}

async function writeCV(name, value) {
  const cvs = await getCVs();
  const found = cvs.find(cv=>cv.name===name) || cvs.find(cv=>_normKey(cv.name)===_normKey(name));
  if (found) {
    await ghlFetch(`/locations/{loc}/customValues/${found.id}`,'PUT',{name,value});
    return 'updated';
  } else {
    await ghlFetch('/locations/{loc}/customValues','POST',{name,value});
    _cvCache=null;
    return 'created';
  }
}

async function syncField(key) {
  const value = getField(key).trim();
  const btn   = document.getElementById('btn-sync-'+key);
  const st    = document.getElementById('fstatus-'+key);
  const card  = document.getElementById('fcard-'+key);

  if (!value) {
    if(st) { st.className='field-status err'; st.textContent='✗ Nothing to sync — fill in a value first'; }
    return;
  }

  // Find ghl name
  let ghlName='';
  Object.values(DOCS).forEach(doc=>doc.sections.forEach(s=>s.fields.forEach(f=>{if(f.key===key)ghlName=f.ghl;})));
  if(!ghlName) return;

  if(btn) { btn.disabled=true; btn.innerHTML='<span class="spinner"></span>'; }
  if(st)  { st.className='field-status busy'; st.textContent='● Syncing…'; }

  try {
    const result = await writeCV(ghlName, value);
    if(card) { card.classList.add('synced'); card.classList.remove('error'); }
    if(st)   { st.className='field-status ok'; st.textContent=`✓ ${result==='created'?'Created':'Updated'} in GHL`; }
    if(btn)  { btn.textContent='✓ Done'; setTimeout(()=>{btn.textContent='⚡ Sync';btn.disabled=false;},2000); }
  } catch(e) {
    if(card) card.classList.add('error');
    if(st)   { st.className='field-status err'; st.textContent='✗ '+e.message; }
    if(btn)  { btn.textContent='Retry'; btn.disabled=false; }
  }
}

async function syncAllFields(docKey) {
  const doc = DOCS[docKey];
  const allFields = doc.sections.flatMap(s=>s.fields);
  const btn = document.getElementById('btn-sync-all-'+docKey);
  const logEl = document.getElementById('sync-log');
  if(btn) { btn.disabled=true; btn.textContent='⏳ Syncing…'; }
  if(logEl) logEl.innerHTML='';
  _cvCache=null;

  let created=0,updated=0,skipped=0,errors=0;
  const rows=[];

  for(const field of allFields) {
    const value = getField(field.key).trim();
    if(!value) { skipped++; rows.push({s:'skip',n:field.name,m:'Skipped — empty'}); continue; }
    const st = document.getElementById('fstatus-'+field.key);
    const btn2 = document.getElementById('btn-sync-'+field.key);
    if(st)  { st.className='field-status busy'; st.textContent='● Syncing…'; }
    if(btn2){ btn2.disabled=true; btn2.innerHTML='<span class="spinner"></span>'; }
    try {
      const r = await writeCV(field.ghl, value);
      r==='created'?created++:updated++;
      rows.push({s:'ok',n:field.name,m:`${r==='created'?'Created':'Updated'} ✓`});
      const card=document.getElementById('fcard-'+field.key);
      if(card){card.classList.add('synced');card.classList.remove('error');}
      if(st){st.className='field-status ok';st.textContent=`✓ ${r==='created'?'Created':'Updated'} in GHL`;}
      if(btn2){btn2.textContent='✓ Done';setTimeout(()=>{btn2.textContent='⚡ Sync';btn2.disabled=false;},2000);}
    } catch(e) {
      errors++;
      rows.push({s:'err',n:field.name,m:'Error: '+e.message});
      const card=document.getElementById('fcard-'+field.key);
      if(card)card.classList.add('error');
      if(st){st.className='field-status err';st.textContent='✗ '+e.message;}
      if(btn2){btn2.textContent='Retry';btn2.disabled=false;}
    }
  }

  if(btn) { btn.disabled=false; btn.textContent=errors?'⚡ Retry Sync':'✓ Synced — Run Again'; }
  if(logEl) {
    logEl.innerHTML = `
      <div style="padding:12px 0 4px;font-size:9px;font-weight:800;letter-spacing:0.2em;color:var(--w30);text-transform:uppercase">
        Sync Results
      </div>` +
      rows.map(r=>`<div class="sync-log-row ${r.s}">
        <span>${r.s==='ok'?'✓':r.s==='skip'?'○':'✗'}</span>
        <span style="flex:1;font-weight:600">${r.n}</span>
        <span style="opacity:0.7">${r.m}</span>
      </div>`).join('') +
      `<div style="margin-top:8px;padding:10px 12px;background:rgba(255,255,255,0.03);border-radius:6px;font-size:10px;color:var(--w50);display:flex;gap:16px;flex-wrap:wrap">
        ${created?`<span style="color:var(--green)">✓ ${created} created</span>`:''}
        ${updated?`<span style="color:var(--blue)">↑ ${updated} updated</span>`:''}
        ${skipped?`<span>○ ${skipped} skipped</span>`:''}
        ${errors?`<span style="color:var(--red)">✗ ${errors} errors</span>`:''}
        <span style="margin-left:auto;color:var(--w30)">${new Date().toLocaleTimeString()}</span>
      </div>`;
  }
}

/* ═══════════════════════════════════════
   PROGRESS & STATUS
═══════════════════════════════════════ */
function calcDocProgress() {
  let total=0, filled=0;
  Object.values(DOCS).forEach(doc => {
    doc.sections.forEach(s => {
      s.fields.forEach(f => {
        total++;
        if(getField(f.key).trim()) filled++;
      });
    });
  });
  return total ? Math.round(filled/total*100) : 0;
}

function updateSidebarDots() {
  Object.entries(DOCS).forEach(([dk, doc]) => {
    const allFields = doc.sections.flatMap(s=>s.fields);
    const filled = allFields.filter(f=>getField(f.key).trim()).length;
    const dot = document.getElementById('dot-'+dk);
    if(!dot) return;
    if(filled===0) { dot.className='item-status'; }
    else if(filled===allFields.length) { dot.className='item-status done'; }
    else { dot.className='item-status partial'; }
  });
  Object.keys(LAUNCHPADS).forEach(lpKey => updateLPDots(lpKey));
}

function updateOverallProgress() {
  const pct = calcDocProgress();
  const el = document.getElementById('overall-pct');
  if(el) el.textContent=pct+'%';
}
