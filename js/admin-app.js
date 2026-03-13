// ── CONFIG — update these two values ─────────────────────────────────────────
const SUPABASE_URL     = 'https://tbjbviakpjcpacfaxigw.supabase.co';
const SUPABASE_ANON    = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiamJ2aWFrcGpjcGFjZmF4aWd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTIzODAsImV4cCI6MjA2MTc4ODM4MH0.i2UfXPMgrSJupBKECrRCNNB8bDHBGJbm7wHmBzBMEF8';
const API_BASE         = 'https://authority-os-api.brendan-c89.workers.dev';
// ─────────────────────────────────────────────────────────────────────────────

let _session = null;
let _page    = 0;
let _tier    = '';
let _search  = '';
let _searchTimer = null;
let _totalUsers = 0;
const LIMIT = 50;

// ── GOOGLE OAUTH ─────────────────────────────────────────────────────────────
function doGoogleLogin() {
  const btn = document.getElementById('google-btn');
  btn.disabled = true; btn.textContent = '⏳ Redirecting to Google…';
  const redirectTo = window.location.origin + window.location.pathname;
  window.location.href = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(redirectTo)}`;
}

// Handle OAuth redirect — parse token from URL hash on page load
async function handleOAuthRedirect() {
  const hash = window.location.hash;
  if (!hash) return false;
  const p = new URLSearchParams(hash.slice(1));
  const access_token  = p.get('access_token');
  const refresh_token = p.get('refresh_token');
  if (!access_token) return false;

  // Clean URL
  history.replaceState(null, '', window.location.pathname);

  _session = { access_token, refresh_token };

  // Verify admin
  try {
    const meRes = await fetch(`${API_BASE}/api/admin/stats`, {
      headers: { 'Authorization': `Bearer ${access_token}` }
    });
    const me = await meRes.json();
    if (!meRes.ok || me.error) throw new Error('Access denied — you need is_admin = true on your profile');

    // Get email from Supabase
    const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { 'apikey': SUPABASE_ANON, 'Authorization': `Bearer ${access_token}` }
    });
    const userData = await userRes.json();

    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('app').style.display = 'flex';
    document.getElementById('app').style.flexDirection = 'column';
    document.getElementById('topbar-email').textContent = userData.email || 'Admin';
    setTopbarTier(me.userTier || 'basic');
    renderStats(me);
    loadUsers();
    return true;
  } catch(e) {
    showAuthErr(e.message);
    return false;
  }
}

// Run on page load
handleOAuthRedirect();

// ── AUTH ──────────────────────────────────────────────────────────────────────
async function doLogin() {
  const email    = document.getElementById('auth-email').value.trim();
  const password = document.getElementById('auth-password').value;
  const btn      = document.getElementById('auth-btn');
  const errEl    = document.getElementById('auth-error');
  errEl.style.display = 'none';

  if (!email || !password) { showAuthErr('Email and password required'); return; }
  btn.disabled = true; btn.textContent = '⏳ Signing in…';

  try {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: { 'Content-Type':'application/json', 'apikey': SUPABASE_ANON },
      body: JSON.stringify({ email, password }),
    });
    const data = await r.json();
    if (!r.ok || data.error) throw new Error(data.error_description || data.error || 'Login failed');

    _session = data;
    // Verify admin via worker
    const meRes = await fetch(`${API_BASE}/api/admin/stats`, {
      headers: { 'Authorization': `Bearer ${_session.access_token}` }
    });
    const me = await meRes.json();
    if (!meRes.ok || me.error) throw new Error('Access denied — you need is_admin = true on your profile');

    // All good
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('app').style.display = 'flex';
    document.getElementById('app').style.flexDirection = 'column';
    document.getElementById('topbar-email').textContent = email;
    setTopbarTier(me.userTier || 'basic');
    renderStats(me);
    loadUsers();

  } catch(e) {
    showAuthErr(e.message);
    btn.disabled = false; btn.textContent = 'Sign In →';
  }
}

document.getElementById('auth-password').addEventListener('keydown', e => {
  if (e.key === 'Enter') doLogin();
});

function setTopbarTier(tier) {
  const badge = document.getElementById('topbar-tier-badge');
  const link  = document.getElementById('topbar-upgrade-link');
  if (!badge) return;
  const t = (tier || 'basic').toLowerCase();
  badge.textContent = t.toUpperCase();
  badge.className = `topbar-tier-badge tier-${t}`;
  // Show upgrade link for non-owner tiers
  const tierOrder = ['basic','pro','agency','owner'];
  const idx = tierOrder.indexOf(t);
  if (idx < tierOrder.length - 1) {
    link.style.display = 'inline';
    link.href = '/upgrade'; // update to your upgrade page URL
  } else {
    link.style.display = 'none';
  }
}

function showAuthErr(msg) {
  const el = document.getElementById('auth-error');
  el.textContent = msg; el.style.display = 'block';
}

function doLogout() {
  _session = null;
  document.getElementById('app').style.display = 'none';
  document.getElementById('auth-screen').style.display = 'flex';
  document.getElementById('auth-password').value = '';
  document.getElementById('auth-error').style.display = 'none';
}

// ── STATS ────────────────────────────────────────────────────────────────────
function renderStats(data) {
  const t = data.tiers || {};
  document.getElementById('stat-total').textContent  = t.total  ?? '—';
  document.getElementById('stat-basic').textContent  = t.basic  ?? '—';
  document.getElementById('stat-pro').textContent    = t.pro    ?? '—';
  document.getElementById('stat-agency').textContent = t.agency ?? '—';
  document.getElementById('stat-owner').textContent  = t.owner  ?? '—';
}

async function refreshStats() {
  try {
    const r = await fetch(`${API_BASE}/api/admin/stats`, {
      headers: { 'Authorization': `Bearer ${_session.access_token}` }
    });
    const d = await r.json();
    if (d.tiers) renderStats(d);
  } catch {}
}

// ── USERS ────────────────────────────────────────────────────────────────────
function handleSearch(val) {
  clearTimeout(_searchTimer);
  _searchTimer = setTimeout(() => { _search = val; _page = 0; loadUsers(); }, 350);
}

function handleTierFilter(val) {
  _tier = val; _page = 0; loadUsers();
}

function changePage(dir) {
  const maxPage = Math.ceil(_totalUsers / LIMIT) - 1;
  _page = Math.max(0, Math.min(_page + dir, maxPage));
  loadUsers();
}

async function loadUsers() {
  const tbody = document.getElementById('user-tbody');
  tbody.innerHTML = '<tr><td colspan="5" class="table-msg"><span class="spinner"></span> Loading…</td></tr>';
  document.getElementById('pagination').style.display = 'none';

  try {
    const params = new URLSearchParams({ page: _page, limit: LIMIT });
    if (_search) params.set('q', _search);
    if (_tier)   params.set('tier', _tier);

    const r = await fetch(`${API_BASE}/api/admin/users?${params}`, {
      headers: { 'Authorization': `Bearer ${_session.access_token}` }
    });
    const d = await r.json();
    if (!r.ok) throw new Error(d.error || 'Failed to load users');

    _totalUsers = d.total || d.users?.length || 0;
    renderUsers(d.users || []);
    document.getElementById('total-label').textContent = `${_totalUsers} user${_totalUsers !== 1 ? 's' : ''}`;

    // Pagination
    if (_totalUsers > LIMIT) {
      document.getElementById('pagination').style.display = 'flex';
      const totalPages = Math.ceil(_totalUsers / LIMIT);
      document.getElementById('page-info').textContent = `Page ${_page + 1} of ${totalPages}`;
      document.getElementById('btn-prev').disabled = _page === 0;
      document.getElementById('btn-next').disabled = _page >= totalPages - 1;
    }

  } catch(e) {
    tbody.innerHTML = `<tr><td colspan="5" class="table-msg">⚠️ ${e.message}</td></tr>`;
  }
}

function renderUsers(users) {
  const tbody = document.getElementById('user-tbody');
  if (!users.length) {
    tbody.innerHTML = '<tr><td colspan="5" class="table-msg">No users found</td></tr>';
    return;
  }

  tbody.innerHTML = users.map(u => {
    const sub = Array.isArray(u.subscriptions) ? u.subscriptions[0] : null;
    const subHtml = sub
      ? `<span class="sub-status sub-${sub.status}">${sub.status}</span>
         <span style="margin-left:6px;font-family:var(--mono);font-size:9px;color:var(--w30)">${sub.tier?.toUpperCase() || ''}</span>
         ${sub.current_period_end ? `<span style="display:block;font-family:var(--mono);font-size:9px;color:var(--w30);margin-top:2px">renews ${fmtDate(sub.current_period_end)}</span>` : ''}`
      : `<span class="sub-none">no subscription</span>`;

    const stripeHtml = u.stripe_customer_id
      ? `<a href="https://dashboard.stripe.com/customers/${u.stripe_customer_id}" target="_blank" rel="noopener">${u.stripe_customer_id.slice(0,18)}…</a>`
      : `<span style="color:var(--w30)">—</span>`;

    return `<tr>
      <td class="td-email">
        ${u.email || '—'}
        ${u.full_name ? `<span>${u.full_name}</span>` : ''}
        ${u.is_admin ? `<span class="td-admin">★ Admin</span>` : ''}
      </td>
      <td>
        <select class="tier-select tier-${u.tier}" id="tier-sel-${u.id}"
          onchange="setTier('${u.id}', this.value, this)">
          <option value="basic"  ${u.tier==='basic'  ?'selected':''}>BASIC</option>
          <option value="pro"    ${u.tier==='pro'    ?'selected':''}>PRO</option>
          <option value="agency" ${u.tier==='agency' ?'selected':''}>AGENCY</option>
          <option value="owner"  ${u.tier==='owner'  ?'selected':''}>OWNER</option>
        </select>
        <span class="save-flash" id="flash-${u.id}">✓ saved</span>
      </td>
      <td>${subHtml}</td>
      <td class="td-stripe">${stripeHtml}</td>
      <td class="td-date">${fmtDate(u.created_at)}</td>
    </tr>`;
  }).join('');
}

// ── SET TIER ─────────────────────────────────────────────────────────────────
async function setTier(userId, tier, selectEl) {
  selectEl.disabled = true; selectEl.classList.add('saving');
  try {
    const r = await fetch(`${API_BASE}/api/admin/set-tier`, {
      method: 'POST',
      headers: { 'Content-Type':'application/json', 'Authorization': `Bearer ${_session.access_token}` },
      body: JSON.stringify({ userId, tier }),
    });
    const d = await r.json();
    if (!r.ok || !d.ok) throw new Error(d.error || 'Failed');

    // Update select styling
    selectEl.className = `tier-select tier-${tier}`;
    // Flash confirmation
    const flash = document.getElementById(`flash-${userId}`);
    if (flash) {
      flash.classList.add('show');
      setTimeout(() => flash.classList.remove('show'), 2000);
    }
    toast(`Tier updated to ${tier.toUpperCase()}`, 'success');
    refreshStats();

  } catch(e) {
    toast(e.message, 'error');
    // Revert select
    loadUsers();
  } finally {
    selectEl.disabled = false; selectEl.classList.remove('saving');
  }
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
function fmtDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });
}

let _toastTimer;
function toast(msg, type = 'success') {
  const el = document.getElementById('toast');
  el.textContent = (type === 'success' ? '✓ ' : '⚠ ') + msg;
  el.className = `show ${type}`;
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.className = '', 3000);
}
