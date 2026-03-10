# Proposal: Paragon Design Tokens → Figma Variables

Generated: 2026-03-09

---

## Goal

Import the full set of Paragon core design tokens into the Figma file as **modern Figma variables**, organized into collections with proper aliasing. This replaces the current 64 legacy paint styles + 21 text styles with a complete, structured variable system that matches the codebase 1:1.

---

## Proposed Variable Collections

### Collection 1: `Primitives` (COLOR type)

Raw color values — the base palette. No semantic meaning.

| Variable | Value | Notes |
|----------|-------|-------|
| `white` | `#FFFFFF` | |
| `black` | `#000000` | |
| `gray/100` – `gray/900` + `gray/base` | 10 values | Full gray scale |
| `primary/base` | `#0A3055` | |
| `brand/base` | `#9D0054` | |
| `light/base` | `#E1DDDB` | |
| `dark/base` | `#273F2F` | |
| `info/base` | `#006DAA` | (= teal in token source) |
| `success/base` | `#178253` | |
| `danger/base` | `#C32D3A` | |
| `warning/base` | `#FFD900` | |
| `accent/a` | `#00BBF9` | |
| `accent/b` | `#FFEE88` | |

**Computed scale levels** for each theme color (primary, brand, info, success, danger, warning, light, dark):

| Level | Derivation | Source |
|-------|-----------|--------|
| `100` | mix with white, amount 0.94 | `tokens/src/themes/light/global/color.json` |
| `200` | mix with white, amount 0.75 | same |
| `300` | mix with white, amount 0.50 | same |
| `400` | mix with white, amount 0.25 | same |
| `500` | = base (no transform) | same |
| `600` | mix with black, amount 0.10 | same |
| `700` | mix with black, amount 0.20 | same |
| `800` | mix with black, amount 0.25 | same |
| `900` | mix with black, amount 0.30 | same |

Note: These are `mix` operations (not darken/lighten), processed by chroma-js at build time via Style Dictionary.

**Estimated count:** ~90 color variables

### Collection 2: `Semantic` (COLOR type, 2 modes: Light / Dark)

Aliases that reference Primitives. These carry meaning (background, border, hover, etc.).

| Variable | Light mode value | Notes |
|----------|-----------------|-------|
| `theme/bg/{color}` | → `Primitives/{color}/100` | Background |
| `theme/border/{color}` | → `Primitives/{color}/200` | Borders |
| `theme/default/{color}` | → `Primitives/{color}/300-500` | Default state |
| `theme/hover/{color}` | → `Primitives/{color}/700` | Hover |
| `theme/active/{color}` | → `Primitives/{color}/900` | Active/pressed |
| `border` | → `Primitives/gray/200` | Global border |
| `text/primary` | → `Primitives/gray/700` | Primary text |
| `text/secondary` | → `Primitives/gray/500` | Secondary text |
| `text/disabled` | → `Primitives/gray/300` | Disabled text |
| `text/on-dark` | → `Primitives/white` | Text on dark bg |
| `text/on-light` | → `Primitives/black` | Text on light bg |

**Estimated count:** ~60 color alias variables

This structure enables future Dark mode by adding a second mode to this collection with different Primitive references.

### Collection 3: `Spacing` (FLOAT type)

| Variable | Value | Notes |
|----------|-------|-------|
| `spacer/0` | `0` | |
| `spacer/1` | `4` | 0.25rem × 16 |
| `spacer/1.5` | `6` | 0.375rem × 16 |
| `spacer/2` | `8` | 0.5rem × 16 |
| `spacer/2.5` | `12` | 0.75rem × 16 |
| `spacer/3` | `16` | 1rem (base) |
| `spacer/3.5` | `20` | 1.25rem × 16 |
| `spacer/4` | `24` | 1.5rem × 16 |
| `spacer/4.5` | `32` | 2rem × 16 |
| `spacer/5` | `48` | 3rem × 16 |
| `spacer/5.5` | `64` | 4rem × 16 |
| `spacer/6` | `80` | 5rem × 16 |
| `grid/gutter` | `24` | Grid gutter width |

**Estimated count:** ~14 number variables

### Collection 4: `Typography` (FLOAT type)

| Variable | Value | Notes |
|----------|-------|-------|
| `font-size/base` | `18` | 1.125rem |
| `font-size/lg` | `22.5` | 1.40625rem |
| `font-size/sm` | `15.75` | 87.5% of 18 |
| `font-size/xs` | `13.5` | 75% of 18 |
| `font-size/micro` | `11` | 0.688rem |
| `font-size/h1` | `40` | Desktop |
| `font-size/h1-mobile` | `36` | Mobile |
| `font-size/h2` | `32` | |
| `font-size/h3` | `22` | |
| `font-size/h4` | `18` | |
| `font-size/h5` | `14` | |
| `font-size/h6` | `12` | |
| `font-size/display-1` | `60` | |
| `font-size/display-2` | `78` | |
| `font-size/display-3` | `90` | |
| `font-size/display-4` | `120` | |
| `line-height/base` | `28` | 1.5556 × 18 |
| `line-height/lg` | `34` | 1.5 × 22.5 |
| `line-height/sm` | `24` | 1.5 × 15.75 |
| `line-height/micro` | `15` | |
| `font-weight/light` | `300` | |
| `font-weight/normal` | `400` | |
| `font-weight/semi-bold` | `500` | |
| `font-weight/bold` | `700` | |

**Estimated count:** ~24 number variables

Note: Figma variables don't support STRING type for font families. Font family (Inter vs system stack) must remain as text styles or be documented as a convention.

### Collection 5: `Sizing` (FLOAT type)

| Variable | Value | Notes |
|----------|-------|-------|
| `border/width` | `1` | |
| `border-radius/base` | `6` | 0.375rem |
| `border-radius/lg` | `6.8` | 0.425rem |
| `border-radius/sm` | `4` | 0.25rem |
| `border-radius/pill` | `800` | 50rem |
| `icon/xs` | `16` | |
| `icon/sm` | `20` | |
| `icon/md` | `24` | |
| `icon/lg` | `28` | |
| `avatar/xs` | `24` | |
| `avatar/sm` | `36` | |
| `avatar/base` | `48` | |
| `avatar/lg` | `64` | |
| `avatar/xl` | `96` | |
| `container/xs` | `464` | |
| `container/sm` | `708` | |
| `container/md` | `952` | |
| `container/lg` | `1192` | |
| `container/xl` | `1440` | |

**Estimated count:** ~20 number variables

---

## Total: ~210 variables across 5 collections

This covers the **core foundation tokens**. Component-specific tokens (1500+ CSS vars) are intentionally excluded — those are too granular for Figma and are better handled at the code level.

---

## Implementation Approach

### Option A: Script via `figma-cli eval` (Recommended)

Write a single Node.js script that:
1. Reads the compiled CSS variables from `styles/css/themes/light/variables.css` and `styles/css/core/variables.css` (already resolved, no transform logic needed)
2. Generates a sequence of Figma API calls
3. Executes via `~/figma-cli eval` to create collections and variables

```
Workflow:
  tokens/src/**/*.json
       ↓ (Style Dictionary builds)
  styles/css/**/variables.css  (resolved values)
       ↓ (script parses CSS vars)
  Figma API calls via eval
       ↓
  Figma variable collections
```

**Why this is best:**
- Uses already-resolved values (no need to reimplement color transforms)
- Single source of truth remains the token JSON files
- Reproducible — re-run after any token change
- No manual work in Figma

**Implementation steps:**
1. Create `scripts/figma-sync-tokens.js` in the Paragon repo
2. Parse the two CSS variable files for `--pgn-color-*`, `--pgn-spacing-*`, `--pgn-size-*`, `--pgn-typography-*`
3. Map CSS variable names → Figma collection/group/variable names
4. Generate a single `eval` script that:
   - Creates 5 collections (Primitives, Semantic, Spacing, Typography, Sizing)
   - Creates variables in each collection
   - Sets alias references for Semantic collection
5. Execute via `cd ~/figma-cli && node src/index.js eval "$(cat /tmp/figma-token-script.js)"`

### Option B: Use Tokens Studio Plugin

Export tokens to Tokens Studio format (JSON) and import via the plugin. This is less automatable but more visual.

### Option C: Figma REST API (Variables endpoint)

Use the Figma Variables REST API directly. Requires a Figma API token and the file key. More robust for CI/CD but more setup.

---

## Migration Path for Existing Styles

Once variables are created:

1. **Keep legacy paint/text/effect styles** temporarily — they're used by existing components
2. **Update styles to reference variables** — e.g., the `Primary/500` paint style should use the `Primitives/primary/500` variable as its fill
3. **Gradually migrate components** to use variables directly instead of styles
4. **Retire legacy styles** once all components are migrated

---

## Naming Convention Mapping

| CSS Variable | Figma Variable |
|-------------|----------------|
| `--pgn-color-primary-base` | `Primitives/primary/base` |
| `--pgn-color-gray-700` | `Primitives/gray/700` |
| `--pgn-color-accent-a` | `Primitives/accent/a` |
| `--pgn-color-theme-bg-primary` | `Semantic/theme/bg/primary` |
| `--pgn-color-border` | `Semantic/border` |
| `--pgn-spacing-spacer-3` | `Spacing/spacer/3` |
| `--pgn-typography-font-size-base` | `Typography/font-size/base` |
| `--pgn-size-border-radius-base` | `Sizing/border-radius/base` |

The `--pgn-` prefix is dropped; the category maps to the collection name; slashes become Figma's group separator.

---

## Open Questions

1. **Dark mode**: Should the Semantic collection include a Dark mode now (even if values aren't fully defined), or add it later?
2. **Font family discrepancy**: Figma uses Inter; codebase uses system fonts. Should the Figma file switch to system fonts, or should the codebase adopt Inter?
3. **Light/Dark color mismatch**: The Figma Dark palette is green-tinted (`#273F2F`); the codebase is neutral gray (`#212529`). Which is authoritative?
4. **Accent color mismatch**: Figma Accent A is `#03C7E8` vs code `#00BBF9`. Which should be updated?
5. **Scope**: Should component-level tokens (button colors, form states, etc.) also become variables, or keep those as code-only?
