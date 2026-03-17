# Refactored project structure

This package turns the two monolithic HTML files into a smaller, Claude-friendly structure.

## Structure

- `index.html` — main builder shell markup only
- `admin.html` — admin dashboard markup only
- `css/index.css` — all main-app styles
- `css/admin.css` — all admin styles
- `js/index-docs.js` — `DOCS` field definitions
- `js/index-checklist.js` — GHL checklist data
- `js/index-launchpads.js` — `LAUNCHPADS` configuration
- `js/index-app.js` — main app logic, auth, rendering, AI generation, GHL sync
- `js/admin-app.js` — admin auth, stats, user table, tier changes
- `assets/index-logo.png` — main app logo extracted from inline base64
- `assets/admin-logo.png` — admin logo extracted from inline base64

## Best way to work with Claude

For most changes, tell Claude exactly which file to edit:

- UI styling for builder → `css/index.css`
- Builder logic / auth / sync → `js/index-app.js`
- Business field definitions → `js/index-docs.js`
- Launchpad field definitions → `js/index-launchpads.js`
- Admin UI styling → `css/admin.css`
- Admin logic → `js/admin-app.js`

## Recommended edit rules

1. Keep HTML files focused on structure only.
2. Put new styles in the matching CSS file.
3. Put new behavior in the matching JS file.
4. Put new form fields/config in the data files instead of hardcoding them in logic.
5. Avoid re-inlining base64 images into HTML.

## Suggested next cleanup passes

- Extract shared auth/session helpers into a shared `js/common/` folder.
- Split `js/index-app.js` into `auth`, `render`, `ai`, and `ghl-sync` if it grows much larger.
- Move environment/config constants to a dedicated config file.
Test from Brendan