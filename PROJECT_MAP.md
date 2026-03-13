# PROJECT_MAP.md

## What this project is
This project has **two main pages**:

- `index.html` = the main customer-facing app / builder
- `admin.html` = the admin dashboard

The original version was built as two very large single files. It has now been split into smaller files so Claude can edit it without timing out.

---

## Plain-English rule for non-coders
You do **not** need to know code to use this structure.

When you want Claude to make a change, use this rule:

- **If the change is about what normal users see or do** → it is probably the **index side**
- **If the change is about admins, user accounts, subscriptions, or dashboard controls** → it is probably the **admin side**
- **If the change is mostly visual** → it is probably a **CSS** file
- **If the change is mostly behavior / logic / buttons / saving / syncing** → it is probably a **JS** file

If you are unsure, upload:

1. `PROJECT_MAP.md`
2. the matching HTML file (`index.html` or `admin.html`)
3. the main JS file for that side (`js/index-app.js` or `js/admin-app.js`)
4. the matching CSS file (`css/index.css` or `css/admin.css`)

That is the safest default.

---

## Fast task router

### 1) "Change how the main app looks"
Upload:
- `PROJECT_MAP.md`
- `index.html`
- `css/index.css`

### 2) "Change how the main app works"
Upload:
- `PROJECT_MAP.md`
- `index.html`
- `js/index-app.js`
- optionally `css/index.css` if the change is also visual

### 3) "Add or change fields/questions/content sections in the main builder"
Upload:
- `PROJECT_MAP.md`
- `js/index-docs.js`
- optionally `js/index-app.js`

### 4) "Add or change checklist items"
Upload:
- `PROJECT_MAP.md`
- `js/index-checklist.js`
- optionally `js/index-app.js`

### 5) "Add or change launchpads / launchpad fields / mappings"
Upload:
- `PROJECT_MAP.md`
- `js/index-launchpads.js`
- optionally `js/index-app.js`

### 6) "Change how the admin dashboard looks"
Upload:
- `PROJECT_MAP.md`
- `admin.html`
- `css/admin.css`

### 7) "Change how the admin dashboard works"
Upload:
- `PROJECT_MAP.md`
- `admin.html`
- `js/admin-app.js`
- optionally `css/admin.css`

### 8) "I don't know which file to send"
Upload one of these bundles:

**For main app changes**
- `PROJECT_MAP.md`
- `index.html`
- `css/index.css`
- `js/index-app.js`

**For admin changes**
- `PROJECT_MAP.md`
- `admin.html`
- `css/admin.css`
- `js/admin-app.js`

That is usually enough for Claude to work successfully.

---

## File-by-file map

### Root files
- `index.html` → main app structure only
- `admin.html` → admin dashboard structure only
- `PROJECT_MAP.md` → this file; Claude should read this first
- `CHANGELOG_AI.md` → running record of AI changes
- `README.md` → project overview
- `CLAUDE.md` → short technical edit guidance for Claude

### Main app styles
- `css/index.css` → all styling for the main app

### Admin styles
- `css/admin.css` → all styling for the admin dashboard

### Main app logic/data
- `js/index-app.js` → the main app runtime logic; rendering, behavior, saving, syncing, auth-related flow, AI actions
- `js/index-docs.js` → business field definitions / content schema
- `js/index-checklist.js` → checklist data and related definitions
- `js/index-launchpads.js` → launchpad schemas, field definitions, mappings

### Admin logic
- `js/admin-app.js` → admin auth, stats, search/filtering, table behavior, user management, tier updates

### Assets
- `assets/index-logo.png` → extracted main app logo
- `assets/admin-logo.png` → extracted admin logo

---

## Simple “what kind of change is this?” guide

### Visual / design changes
Examples:
- change colors
- spacing
- font sizes
- button styles
- card layout
- mobile responsiveness

Usually edit:
- `css/index.css` or `css/admin.css`

### Content / fields / labels changes
Examples:
- add a new field
- rename a section
- add a new input
- change checklist copy
- change launchpad options

Usually edit:
- `js/index-docs.js`
- `js/index-checklist.js`
- `js/index-launchpads.js`
- sometimes the matching HTML or main JS file too

### Behavior / functionality changes
Examples:
- button actions
- saving data
- loading data
- sync behavior
- AI generation behavior
- filtering/searching
- admin tier update logic

Usually edit:
- `js/index-app.js`
- `js/admin-app.js`

---

## Editing rules for Claude
- Prefer the **smallest-file edit possible**.
- Do not paste giant base64 images back into HTML.
- Do not rewrite the whole project unless explicitly asked.
- Keep HTML focused on structure.
- Keep styling in CSS.
- Keep behavior in JS.
- When adding builder fields, prefer updating the dedicated data/config file instead of hardcoding everything into app logic.
- After every meaningful change, add a short entry to `CHANGELOG_AI.md`.

---

## Recommended prompt template for Brendan
Copy/paste this into Claude:

```md
Read `PROJECT_MAP.md` first.

Task:
[describe what you want in plain English]

Constraints:
- Make the smallest clean edit possible
- Do not rewrite unrelated sections
- Preserve current styling unless I asked for design changes
- After making changes, update `CHANGELOG_AI.md`

Return:
1. what changed
2. which files changed
3. anything I should test
```

---

## Best default workflow
If you want the easiest workflow with the least stress:

### For main app tasks
Upload:
- `PROJECT_MAP.md`
- `index.html`
- `css/index.css`
- `js/index-app.js`

### For admin tasks
Upload:
- `PROJECT_MAP.md`
- `admin.html`
- `css/admin.css`
- `js/admin-app.js`

That keeps context small while still giving Claude enough to work with.
