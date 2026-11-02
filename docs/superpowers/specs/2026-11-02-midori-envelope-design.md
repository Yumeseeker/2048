# Midori Envelope 2048 Design

## Intent

Turn the classic 2048 interface into a cute, Midori-inspired stationery piece: a soft paper card with a leafy green envelope frame, friendly animal/food tile motifs, and tactile details that make the game feel like opening a tiny letter. The existing 2048 rules, controls, persistence, and animation behavior stay intact.

## Goals

- Make the first screen feel like a warm cream stationery card rather than a generic game board.
- Use a forest-green envelope/pocket frame, paper-like tile cards, rounded corners, subtle shadows, and small stamp/label details.
- Give each tile value a readable number plus a cute animal or food motif, with higher values feeling like collectible keepsakes.
- Keep the board legible, responsive, keyboard/touch friendly, and visually coherent on desktop and mobile.
- Keep the implementation dependency-free and compatible with this repository's plain HTML, JavaScript, SCSS, and compiled CSS structure.

## Non-goals

- Do not change tile merging, scoring, win/loss rules, storage, keyboard controls, or touch controls.
- Do not add a framework, build pipeline, web font dependency, image service, or remote asset.
- Do not recreate a branded Midori product exactly; use the general stationery cues of green paper, envelopes, cards, and postage marks.

## Anti-goals

- Avoid tiny illustrations or low-contrast text that make values hard to read.
- Avoid relying on emoji alone for meaning because emoji glyphs vary between platforms; motifs should have a graceful text/CSS fallback.
- Avoid a heavy visual treatment that makes movement animations, overlays, or mobile sizing feel sluggish.

## Chosen approach

Use the Midori stationery-envelope treatment. Restyle the existing page shell and board in `style/main.scss`, mirror the compiled result in `style/main.css`, update the visible copy and decorative markup in `index.html`, and add a small presentation-only motif mapping in `js/html_actuator.js`. The mapping will keep the numeric value as the primary label while adding a short animal/food name and a decorative badge so the game remains understandable without special fonts or image files.

The board will read as an open envelope: cream outer page, green envelope flap/pocket styling around the grid, warm paper grid cells, and tile cards that resemble little notes. Score/best panels will become postage-style labels, and the win/game-over message will remain a readable card overlay with stationery language.

## Constraints and decisions

- Use the current 4x4 layout dimensions and existing responsive breakpoint.
- Preserve the existing DOM hooks required by the JavaScript game (`.tile-container`, score containers, buttons, and message classes).
- Keep the compiled `style/main.css` synchronized with the SCSS source because the page loads CSS directly.
- Treat visual presentation as the changed surface; only add actuator data/classes needed to render motifs.
- Add regression coverage for the new presentation mapping with a lightweight Node-executable test or repository-appropriate check, while retaining the existing browser behavior.

## Success criteria

The game opens as a cohesive green-and-cream stationery card, every rendered tile shows a readable value and a cute animal/food cue, the board and controls remain usable at desktop and mobile widths, and the original game interactions still work without new dependencies or console errors.

## Remaining implementation calls

The builder may choose the exact palette values, motif labels, CSS illustration details, and test harness shape as long as they preserve the direction and constraints above.
