# CHANGELOG_AI.md

This file tracks project changes made with AI so future sessions can quickly understand what changed.

---

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
