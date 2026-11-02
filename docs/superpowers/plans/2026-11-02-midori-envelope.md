# Midori Envelope 2048 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the existing 2048 game as a cute green-and-cream stationery envelope/card with readable animal and food tile motifs while preserving all game behavior.

**Architecture:** Add a small dependency-free presentation module that maps tile values to safe motif metadata, then let the existing HTML actuator render that metadata alongside the numeric value. Update the page shell and both SCSS source and directly-loaded compiled CSS for the stationery visual system; keep `game_manager.js`, `grid.js`, `tile.js`, input, and storage logic unchanged.

**Tech Stack:** Plain HTML, legacy browser JavaScript, SCSS/CSS, Node's built-in `assert` and `vm` modules for a lightweight presentation regression test.

**Spec:** `docs/superpowers/specs/2026-11-02-midori-envelope-design.md`

## Global Constraints

- Preserve the existing 4x4 layout, controls, persistence, scoring, merge behavior, win/loss behavior, and animation hooks.
- Keep the implementation dependency-free and compatible with the repository's plain HTML, JavaScript, SCSS, and compiled CSS structure.
- Keep the compiled `style/main.css` synchronized with `style/main.scss` because the page loads CSS directly.
- Keep every tile value readable; motifs are supportive presentation only and must have a text fallback.
- Do not add external fonts, remote images, frameworks, or image services.

## Review Focus

- A tile value above 2048 still renders a sensible fallback motif and remains readable.
- A tile value is inserted as text, not HTML, so presentation metadata cannot create markup.
- The small-screen layout keeps the card, score labels, tile numbers, and overlay controls inside the viewport.
- The existing `.tile-container`, score selectors, game-message classes, and button selectors remain intact for the current JavaScript.
- The directly loaded CSS and SCSS source do not drift in their core visual rules.

---

### Task 1: Add the tile-presentation contract and regression test

**Files:**
- Create: `js/tile_theme.js`
- Create: `tests/tile_theme_test.js`

**Interfaces:**
- Produces global `getTileTheme(value)` returning `{ motif, name, accent }`, where `motif` is a short text symbol, `name` is a safe human-readable label, and `accent` is a CSS modifier token.
- Produces a `tileThemeFallback` object for values not explicitly mapped.

- [ ] **Step 1: Write the failing test**

  Add a Node test that loads `js/tile_theme.js` in a VM context and asserts:

  - `getTileTheme(2)` returns a cat motif, the name `sleepy cat`, and accent `sage`.
  - `getTileTheme(32)` returns a food motif, the name `strawberry`, and accent `berry`.
  - `getTileTheme(2048)` returns a celebratory motif, the name `party parcel`, and accent `gold`.
  - `getTileTheme(4096)` returns the fallback name `mystery parcel` and accent `forest`.

- [ ] **Step 2: Run the test to verify it fails**

  Run: `node tests/tile_theme_test.js`

  Expected: FAIL because `js/tile_theme.js` does not exist yet.

- [ ] **Step 3: Implement `getTileTheme(value)` in `js/tile_theme.js`**

  Define explicit entries for `2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048`, mixing gentle animal and food motifs. Return the fallback for any other value. Keep the returned data plain text and use only the three documented keys.

- [ ] **Step 4: Run the test to verify it passes**

  Run: `node tests/tile_theme_test.js`

  Expected: PASS with four assertions and no uncaught errors.

- [ ] **Step 5: Commit**

  ```bash
  git add js/tile_theme.js tests/tile_theme_test.js
  git commit -m "feat: add stationery tile theme metadata"
  ```

### Task 2: Render motifs without changing game behavior

**Files:**
- Modify: `index.html`
- Modify: `js/html_actuator.js`

**Interfaces:**
- Consumes `getTileTheme(value)` from `js/tile_theme.js`.
- Produces tile markup with `.tile-value`, `.tile-motif`, and `.tile-name` children plus a `tile-accent-*` wrapper class; existing `.tile`, `.tile-inner`, position, merge, and new-tile classes remain present.

- [ ] **Step 1: Extend the regression test with actuator-facing source checks**

  Add assertions that `index.html` loads `js/tile_theme.js` before `js/html_actuator.js`, and that `js/html_actuator.js` contains the `tile-accent-`, `tile-value`, `tile-motif`, and `tile-name` hooks.

- [ ] **Step 2: Run the test to verify it fails**

  Run: `node tests/tile_theme_test.js`

  Expected: FAIL because the page and actuator do not yet include the new presentation hooks.

- [ ] **Step 3: Update the page and actuator**

  Add a small stationery eyebrow/description in `index.html` while preserving all existing selectors. Load `js/tile_theme.js` before `html_actuator.js`. In `HTMLActuator.prototype.addTile`, read the theme for the tile value, add the accent class, create the three text children, keep the numeric value as the primary visible content, and set an accessible `aria-label` such as `32, strawberry tile`. Use `textContent` for all dynamic strings.

- [ ] **Step 4: Run the test to verify it passes**

  Run: `node tests/tile_theme_test.js`

  Expected: PASS with all theme and source-contract assertions.

- [ ] **Step 5: Commit**

  ```bash
  git add index.html js/html_actuator.js tests/tile_theme_test.js
  git commit -m "feat: render animal and food tile motifs"
  ```

### Task 3: Apply the Midori envelope/card visual system

**Files:**
- Modify: `style/helpers.scss`
- Modify: `style/main.scss`
- Modify: `style/main.css`

**Interfaces:**
- Consumes the existing page selectors and new `.tile-value`, `.tile-motif`, `.tile-name`, and `.tile-accent-*` hooks from Task 2.
- Produces the responsive green-and-cream stationery presentation without changing the game layout contract.

- [ ] **Step 1: Add stylesheet contract checks to the regression test**

  Assert that both `style/main.scss` and `style/main.css` contain the core envelope palette tokens/selectors (`.game-container`, `.tile-accent-sage`, `.tile-accent-berry`, `.tile-accent-gold`, and `.tile-motif`).

- [ ] **Step 2: Run the test to verify it fails**

  Run: `node tests/tile_theme_test.js`

  Expected: FAIL because the new visual selectors and palette are not present in the stylesheets.

- [ ] **Step 3: Restyle SCSS and synchronize compiled CSS**

  Use a warm paper page, dark leafy green envelope board, pale paper grid cells, postage-like score cards, a flap/pocket treatment through pseudo-elements, and friendly rounded tile cards. Give each accent a distinct but restrained palette, keep numeric values visually dominant, and keep the existing animation/position rules. Update the shared keyframe helper to interpolate animation names so the current Sass compiler emits valid animation identifiers. Add mobile overrides for the compact board, tile typography, score labels, intro copy, and game message. Mirror the resulting rules into `style/main.css` because there is no build step in this repository.

- [ ] **Step 4: Run the test to verify it passes**

  Run: `node tests/tile_theme_test.js`

  Expected: PASS with all presentation contract assertions.

- [ ] **Step 5: Commit**

  ```bash
  git add style/main.scss style/main.css tests/tile_theme_test.js
  git commit -m "feat: style 2048 as a Midori envelope card"
  ```

### Task 4: Verify the finished game surface

**Files:**
- Modify: `tests/tile_theme_test.js` only if a verification gap is found.

- [ ] **Step 1: Run the complete presentation test**

  Run: `node tests/tile_theme_test.js`

  Expected: PASS with zero failures.

- [ ] **Step 2: Run static syntax checks for every JavaScript file**

  Run: `for file in js/*.js; do node --check "$file"; done`

  Expected: exit 0 with no syntax errors.

- [ ] **Step 3: Inspect the final diff and repository status**

  Run: `git diff --check && git status --short`

  Expected: `git diff --check` produces no whitespace errors, and status contains only the intended design/plan, theme/test, HTML/actuator, and stylesheet changes.

- [ ] **Step 4: Commit any verification-only correction**

  If verification identifies a real issue, fix it with a focused change, rerun the full commands above, and commit it with a specific message; otherwise leave the verified task commits intact.
