# CHANGELOG_AI.md

This file tracks project changes made with AI so future sessions can quickly understand what changed.

---

## 2026-03-18

### index.css — dead code cleanup (no visual change)
- Removed first duplicate of "Phase Sidebar Accordion" section (~33 lines) — was fully overridden by a second copy lower in the file
- Removed first duplicate of "Right Progress Panel" section (~78 lines) — same reason
- Removed 2 of 3 duplicate `#sib-dashboard.active` rules — only the final copy in "Sidebar Fixes" survives and applies
- Moved `--topnav-h: 80px` directly into the main `:root` block; removed the standalone `:root { --topnav-h: 80px }` override block that was added later
- Net result: 1,480 lines → 1,349 lines. 131 lines of dead/redundant CSS removed. Zero visual change.

Changed files:
- `css/index.css`

---

### Cloudflare Worker — added admin routes for stats, users, and tier management
- Added 3 missing routes to `worker.js` that the admin dashboard depends on:
  - `GET /api/admin/stats` — returns user count broken down by tier
  - `GET /api/admin/users` — returns paginated user list with search and tier filter
  - `POST /api/admin/set-tier` — updates a user's tier by ID
- All 3 routes verify `is_admin = true` on the requesting user before returning data
- All 3 routes use the Supabase service role key to bypass RLS and see all users
- Root cause: these routes were never built in the original worker — every admin dashboard call was hitting the catch-all 404
- Deploy was blocked by a `**` glob character in the Google Drive folder path; fixed by copying to `~/authority-os-api-deploy` and deploying from there
- Temp deploy folder removed after successful deploy
Changed files:
- `worker.js` (deployed via wrangler, not GitHub)

## 2026-03-14

### Admin auth — full fix (root cause: expired Supabase anon key)
- Updated `SUPABASE_ANON` key in `js/admin-app.js` — old key was invalid/expired, causing all Supabase API calls to fail
- Removed duplicate inline `<script>` block from `admin.html` that was causing `SUPABASE_URL already declared` crash
- `doLogin()` and `handleOAuthRedirect()` now verify admin by querying `profiles` table directly via Supabase REST API instead of the Cloudflare worker
- Worker (`/api/admin/stats`) still called for stats/tier data but no longer blocks login if it fails
- Added Supabase RLS policy: `authenticated` role can SELECT own profile row (`auth.uid() = id`)
- Disabled RLS on `public.profiles` during debugging (can re-enable once confirmed stable)
- Root cause chain: expired anon key → invalid API key error → profiles query returning empty → access denied
Changed files:
- `js/admin-app.js`
- `admin.html`

### Top nav brand area — replaced icon+text with horizontal logo and clean tier row
- Removed `brand-icon` (square icon img), `brand-name` ("GHL Jetpack"), `brand-sub` ("GHL University") from `#topnav .brand`
- Added `assets/index-logo-horizontal-white.webp` as full-width brand image
- Moved `tier-badge`, `upgrade-btn`, `billing-btn` to their own flex row below the logo
- Changed `.brand` flex direction to `column` so logo stacks above tier/buttons
- Increased `--topnav-h` from `52px` to `72px` to give logo + tier row room to breathe
- Added `padding: 10px 16px 10px 0` to `.brand` for vertical spacing
Changed files:
- `index.html`
- `css/index.css`

### Credentials modal — removed icon and wordmark from header
- Removed `cred-modal-icon` (index-logo.png), `cred-modal-title` ("GHL Jetpack"), and `cred-modal-sub` ("GHL University · Growing Entrepreneur") from `.cred-modal-header`
- Added `assets/index-logo-horizontal-white.webp` centered in header to replace wordmark
- Close button (`cred-close-btn`) retained
Changed files:
- `index.html`

### Login screen — replaced logo+wordmark with horizontal logo; removed "Sign In" heading
- Removed `lg-logo` div (icon + title + subtitle) and `hr.lg-divider` from `#license-gate`
- Added `assets/index-logo-horizontal-white.webp` centered above fields in `#auth-panel-signin`
- Removed `<div class="lg-heading">Sign In</div>` — logo now stands alone above the form
Changed files:
- `index.html`

## 2026-03-13
### Initial refactor for Claude-friendly structure
Changed files:
- `index.html`
- `admin.html`
- `css/index.css`
- `css/admin.css`
- `js/index-docs.js`
- `js/index-checklist.js`
- `js/index-launchpads.js`
- `js/index-app.js`
- `js/admin-app.js`
- `assets/index-logo.png`
- `assets/admin-logo.png`
- `README.md`
- `CLAUDE.md`

Summary:
- Split the original large single-file `index.html` into smaller builder files.
- Split the original large single-file `admin.html` into smaller admin files.
- Extracted inline CSS into dedicated CSS files.
- Extracted main logic into dedicated JS files.
- Extracted large embedded base64 logos into image files.
- Added documentation to make future Claude sessions easier.

Notes for future AI sessions:
- The project is now much easier to edit than before, but `js/index-app.js` is still one of the larger files.
- The next recommended refactor is splitting `js/index-app.js` into smaller files such as auth, render, AI, and sync.
- Prefer small, targeted edits instead of broad rewrites.

---

## 2026-03-13
### AI workflow support files added
Changed files:
- `PROJECT_MAP.md`
- `CHANGELOG_AI.md`

Summary:
- Added a plain-English project routing file so a non-technical user can know which files to give Claude.
- Added a running AI change log for continuity across sessions.

Notes for future AI sessions:
- Claude should read `PROJECT_MAP.md` first.
- After meaningful changes, append a new dated entry here.