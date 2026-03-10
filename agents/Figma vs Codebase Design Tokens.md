# Figma vs Codebase Design Tokens — Comparison

Generated: 2026-03-09
Figma File: [Paragon Design System v0.1](https://www.figma.com/design/l0kvu7Yu248Vi3X7dDDsO5/)

---

## Colors (64 Figma paint styles)

| Category | Figma | Codebase | Alignment |
|----------|-------|----------|-----------|
| **Primary** | 4 levels (300-700), base `#0A3055` | 9 levels (100-900), base `#0A3055` | Base matches. Figma has fewer scale steps. |
| **Brand** | 2 levels (500/700), base `#9D0054` | 9 levels, base `#9D0054` | Base matches. Figma is sparse. |
| **Gray** | 3 levels (200/500/700) | 10 levels (100-900) | Values match where they overlap (`#707070`, `#454545`, `#CCCCCC`). |
| **Info** | 7 levels (100-900), base `#006DAA` | 9 levels, base `#006DAA` | Strong match. |
| **Success** | 6 levels, base `#178253` | 9 levels, base `#178253` | Strong match. |
| **Danger** | 6 levels, base `#C32D3A` | 9 levels, base `#C32D3A` | Strong match. |
| **Warning** | 6 levels, base `#FFD900` | 9 levels, base `#FFD900` | Strong match. |
| **Light** | 7 levels (200-800) with warm tint (`#E1DDDB`) | 9 levels, different base (`#D4D1CF` area) | Slight discrepancy — Figma Light colors appear warmer/different from codebase. |
| **Dark** | 4 levels, base `#273F2F` (green-tinted) | 9 levels, base uses gray tones (`#212529`) | **Mismatch** — Figma Dark is green-tinted, codebase Dark is neutral gray. |
| **Accent A** | `#03C7E8` (Figma) | `#00BBF9` (code) | **Different** — both cyan but distinct hex values. |
| **Accent B** | `#F0CC00` (Figma) | `#FFEE88` (code) | **Different** — Figma is deeper gold, code is lighter yellow. |

### Additional Figma Color Styles

- **Text on Light**: Gray 700 (`#454545`), Gray 500 (`#707070`), Black, Primary 500, Primary 300, Info 500, Brand 500, Brand 700
- **Text on Dark**: Light 300 (`#F0EEED`), Light 500 (`#E1DDDB`), White, Accent A (`#00BBF9`), Accent B (`#FFEE88`), Brand 500
- **Extras**: Black (`#000000`), White (`#FFFFFF`), Accent A (`#03C7E8`), Accent B (`#F0CC00`)

### Figma Color Hex Values (full list)

| Style Name | Hex |
|------------|-----|
| Primary/700 | `#082644` |
| Primary/500 | `#0A3055` |
| Primary/400 | `#476480` |
| Primary/300 | `#8598AA` |
| Brand/700 | `#7E0043` |
| Brand/500 | `#9D0054` |
| Gray/700 | `#454545` |
| Gray/500 | `#707070` |
| Gray/200 | `#CCCCCC` |
| Light/800 | `#A9A6A4` |
| Light/700 | `#B4B1AF` |
| Light/600 | `#CBC7C5` |
| Light/500 | `#E1DDDB` |
| Light/400 | `#E9E6E4` |
| Light/300 | `#F0EEED` |
| Light/200 | `#F8F7F6` |
| Dark/700 | `#1F3226` |
| Dark/500 | `#273F2F` |
| Dark/400 | `#5D6F63` |
| Dark/300 | `#939F97` |
| Dark/200 | `#C9CFCB` |
| Info/900 | `#004C77` |
| Info/700 | `#005788` |
| Info/500 | `#006DAA` |
| Info/400 | `#4092BF` |
| Info/300 | `#80B6D5` |
| Info/200 | `#BFDBEA` |
| Info/100 | `#F0F6FA` |
| Success/900 | `#105B3A` |
| Success/700 | `#126842` |
| Success/500 | `#178253` |
| Success/300 | `#8BC1A9` |
| Success/200 | `#C5E0D4` |
| Success/100 | `#F1F8F5` |
| Danger/900 | `#892029` |
| Danger/700 | `#9C242E` |
| Danger/500 | `#C32D3A` |
| Danger/300 | `#E1969D` |
| Danger/200 | `#F0CBCE` |
| Danger/100 | `#FBF2F3` |
| Warning/900 | `#B39800` |
| Warning/700 | `#CCAE00` |
| Warning/500 | `#FFD900` |
| Warning/300 | `#FFEC80` |
| Warning/200 | `#FFF6BF` |
| Warning/100 | `#FFFDF0` |

### Codebase Color Hex Values (from tokens)

| Token | Hex |
|-------|-----|
| Primary (base) | `#0A3055` |
| Brand (base) | `#9D0054` |
| Gray-100 | `#EBEBEB` |
| Gray-200 | `#CCCCCC` |
| Gray-300 | `#ADADAD` |
| Gray-400 | `#8F8F8F` |
| Gray-500 | `#707070` |
| Gray-600 | `#5C5C5C` |
| Gray-700 | `#454545` |
| Gray-800 | `#333333` |
| Gray-900 | `#212529` |
| Blue (base) | `#23419F` |
| Red (base) | `#C32D3A` |
| Green (base) | `#178253` |
| Yellow (base) | `#FFD900` |
| Teal (base) | `#006DAA` |
| Accent-A | `#00BBF9` |
| Accent-B | `#FFEE88` |
| Black | `#000000` |
| White | `#FFFFFF` |

---

## Typography (21 Figma text styles)

### Figma Text Styles

| Style | Font | Size | Line Height | Letter Spacing |
|-------|------|------|-------------|----------------|
| Display (mobile) | Inter Bold | 52px | 56px | -2% |
| Display 1 (desktop) | Inter Bold | 60px | 60px | -2% |
| Display 2 (desktop) | Inter Bold | 78px | 78px | -2% |
| Display 3 (desktop) | Inter Bold | 90px | 90px | -2% |
| Display 4 (desktop) | Inter Bold | 120px | 120px | -2% |
| H1 (desktop) | Inter Bold | 40px | 44px | -2% |
| H1 (mobile) | Inter Bold | 36px | 40px | -2% |
| H2 | Inter Bold | 32px | 36px | 0% |
| H3 | Inter Bold | 22px | 28px | 0% |
| H4 | Inter Bold | 18px | 24px | 0% |
| H5 | Inter Bold | 14px | 20px | 0% |
| H6 | Inter Bold | 12px | 20px | 0% |
| Body/Large | Inter Regular | 22px | 36px | 0% |
| Body/Default | Inter Regular | 18px | 28px | 0% |
| Body/Small | Inter Regular | 14px | 24px | 0% |
| Body/Extra Small | Inter Regular | 12px | 20px | 0% |
| Body/Micro | Inter Regular | 11px | 15px | 0% |
| Heading Label/Large | Roboto Mono Regular | 22px | 36px | 0% |
| Heading Label/Default | Roboto Mono Regular | 18px | 28px | 0% |
| Heading Label/Small | Roboto Mono Regular | 14px | 24px | 0% |
| Heading Label/Extra Small | Roboto Mono Regular | 12px | 20px | 0% |

### Codebase Typography Tokens

| Token | Size | Line Height |
|-------|------|-------------|
| Font base | 1.125rem (18px) | 1.5556 (~28px) |
| Font lg | 1.40625rem (~22.5px) | 1.5 |
| Font sm | 87.5% (~15.75px) | 1.5 |
| Font xs | 75% (~13.5px) | — |
| Font micro | 0.688rem (11px) | 0.938rem (~15px) |
| H1 (base) | 2.5rem (40px) | — |
| H1 (mobile) | 2.25rem (36px) | — |
| H2 | 2rem (32px) | — |
| H3 | 1.375rem (22px) | — |
| H4 | 1.125rem (18px) | — |
| H5 | 0.875rem (14px) | — |
| H6 | 0.75rem (12px) | — |
| Display 1 | 3.75rem (60px) | 1 |
| Display 2 | 4.875rem (78px) | 1 |
| Display 3 | 5.625rem (90px) | 1 |
| Display 4 | 7.5rem (120px) | 1 |
| Font family (sans) | -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif | — |
| Font family (mono) | SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace | — |

### Typography Comparison

| Aspect | Figma | Codebase | Alignment |
|--------|-------|----------|-----------|
| Font family (body/headings) | Inter | System font stack | **Mismatch** |
| Font family (mono/labels) | Roboto Mono | System monospace stack | **Mismatch** |
| Body Default | 18px / 28px | 18px / ~28px | Match |
| Body Large | 22px / 36px | ~22.5px | Close but not exact |
| Body Small | 14px / 24px | ~15.75px | **Mismatch** (Figma 14px vs code ~16px) |
| Heading sizes (H1-H6) | 40/32/22/18/14/12px | 40/32/22/18/14/12px | Match |
| Display sizes (1-4) | 60/78/90/120px | 60/78/90/120px | Match |
| Heading Labels | Roboto Mono at body sizes | No equivalent | **Missing in code** |

---

## Elevation & Shadows (25 Figma effect styles)

### Structure

- 5 elevation levels
- Each level has 5 directional variants: Centered, Down, Up, Left, Right
- All shadows use `rgba(0,0,0,0.15)` color

### Figma Shadow Values

| Level | Blur (inner/outer) | Offset Range |
|-------|-------------------|--------------|
| Level 1 | 2px / 4px | 0-1px |
| Level 2 | 4px / 8px | 0-2px |
| Level 3 | 10px / 16px | 0-8px |
| Level 4 | 20px / 20px | 0-10px |
| Level 5 | 40px / 48px | 0-20px |

### Codebase Shadow Tokens

| Level | Blur | Offset |
|-------|------|--------|
| Level 1 | 0.125rem (2px) / 0.25rem (4px) | 0.0625rem (1px) |
| Level 2 | 0.25rem (4px) / 0.5rem (8px) | 0.125rem (2px) |
| Level 3 | 0.625rem (10px) / 1rem (16px) | — |
| Level 4 | 1.25rem (20px) | 0.625rem (10px) |
| Level 5 | 2.5rem (40px) | 1.25rem (20px) |

### Shadow Alignment

Shadows are a **strong match** — same 5-level system, same directional variants, same `rgba(0,0,0,0.15)` color, equivalent blur/offset values (px in Figma, rem in code).

---

## Key Gaps & Divergences

1. **Dark theme colors are green-tinted in Figma** (`#273F2F`) but **neutral gray in code** (`#212529`) — this is the biggest color divergence.
2. **Accent colors differ** between Figma and code (Accent A: `#03C7E8` vs `#00BBF9`; Accent B: `#F0CC00` vs `#FFEE88`).
3. **Figma uses Inter font explicitly**; code falls back to a system font stack with no Inter reference.
4. **Figma's "Heading Label" styles** (Roboto Mono) have no code token equivalent.
5. **Figma color scales are incomplete** — most categories have 3-7 levels vs the code's full 9-level (100-900) scale.
6. **No Figma variables defined** — everything uses legacy paint/text/effect styles (no modern Figma variable collections).
7. **Body Small size mismatch** — Figma uses 14px, codebase computes to ~15.75px.
8. **Light color palette** has a warm tint in Figma that may not match the codebase values exactly.
