# CLAUDE.md

## Project editing map

This repo was intentionally split so large-context edits are not needed.

### Main builder
- `index.html`: markup only
- `css/index.css`: visual styling
- `js/index-docs.js`: business profile field definitions
- `js/index-checklist.js`: GHL setup checklist items
- `js/index-launchpads.js`: launchpad schemas and GHL key mappings
- `js/index-app.js`: runtime logic, rendering, persistence, AI generation, GHL sync

### Admin
- `admin.html`: markup only
- `css/admin.css`: admin styling
- `js/admin-app.js`: admin auth, stats, users, tier updates

## Editing rules
- Prefer the smallest-file edit possible.
- Do not paste large base64 assets back into HTML.
- When adding fields, update the appropriate data file instead of the render logic where possible.
- Keep global data definitions on `window.*` only in the dedicated data files.
Test from Amanda