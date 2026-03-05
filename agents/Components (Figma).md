# Paragon Components (Figma)

> Source: [GENAI-TEST-COPY-Paragon-2026-Feb-26](https://www.figma.com/design/dCaenojxlccN46EWoBqun4/GENAI-TEST-COPY-Paragon-2026-Feb-26)
> Enumerated: 2026-03-05

---

## Alert · Annotation · Avatar · AvatarButton

| Component | Variants | Notes |
|-----------|----------|-------|
| **Alert** | 8 | Success/Danger/Warning/Info × Stacked=true/false |
| **Annotation** | 20 | 5 colors × 4 positions (Above/Below/Left/Right) |
| **Avatar** | 7 | 6 sizes + Doggo image variant |
| **AvatarButton** | 4 | AvatarOnly × Size (Default/Small) |

---

## Badge · Breadcrumbs · Bubble · Button · ButtonGroup

| Component | Variants | Notes |
|-----------|----------|-------|
| **Badge** | 8 | Primary/Secondary/Success/Danger/Warning/Info/Light/Dark |
| **Breadcrumbs** | 5 | `.breadcrumb-separator-default/dark` are sub-components |
| **Bubble** | 2 | Light/Dark |
| **Button** | 12 | Color + Variant prefixes, Default + Small sizes |
| **ButtonGroup** | 10 | Style × Size × Layout (Horizontal/Vertical) |

---

## Card · Chip · Collapsible · ContentBlockEmpty · ContentBlockError

| Component | Variants | Notes |
|-----------|----------|-------|
| **Card** | Multiple | Vertical/Horizontal/Side Image/Multiple Sections + logo + stacked + status + loading states |
| **Chip** | 40 | 20 dismissable + 20 removable (icon × state combinations) |
| **Collapsible** | 10 | Palette × Style (Card/Basic) × Open/Closed × Button |
| **ContentBlockEmpty** | 4 | orientation × illustration |
| **ContentBlockError** | 4 | orientation × illustration; `Illustration-Error` is a sub-component |

---

## Carousel _(🚧 In Progress)_

No components defined yet.

---

## Color Picker _(🚧 In Progress)_

No components defined yet.

---

## DataTable

| Component | Variants | Notes |
|-----------|----------|-------|
| **DataTable** | 4 | noFilter/withFilter × loaded/loading |

Sub-components (internal): `Cell Content`, `Cell`, `Action`, `Sticky Shadow`, `Background`, `Table Body`, `Title Cell Content`, `Table`, `Bulk Actions`, `Display Status`, `Table Footer`, `Selection`, `Sort`, `withSort`, `Selection status`, `Filter status`, `withFilters`

---

## Dropdown

| Component | Variants | Notes |
|-----------|----------|-------|
| **Dropdown** | 1 | `Dropdown menu lockup` |

---

## Dropzone

| Component | Variants | Notes |
|-----------|----------|-------|
| **Dropzone** | 6 | Default / Hover+Focus / Spinner / Loader / DragError / Alert states |

---

## Form — Autosuggest · Checkbox · Control.Feedback · Input · Input.Inline · Radio · Switch

| Component | Variants | Notes |
|-----------|----------|-------|
| **Autosuggest** | 8 | ChevronClicked/Disabled/Hover/Focus/Typing/Loading/Error/Inactive |
| **Checkbox** | 3 | Checked/Indeterminate/Unchecked |
| **Form.Control.Feedback** | 4 | Default/Disabled/Error/Success (appears twice — light + dark) |
| **Input** | 6 | Inactive/Hover/Focus/Activated/Error/Disabled; sub-components: `Text Field`, `Form.HelpText`, `Form.HelpSet` |
| **Input.Inline** | 5 | Filled palette: Inactive/Hover/Focus/Activated/Disabled |
| **Radio** | 6 | Checked × Invalid/Valid combinations |
| **Switch** | 8 | Default/Disabled/Error/Success × Text Alignment Left/Right |

---

## Hyperlink

| Component | Variants | Notes |
|-----------|----------|-------|
| **Hyperlink** | 24 | Style × Icon × Standalone × Size (Default/Small/Large) |

---

## IconButton · IconButton.Toggle

| Component | Variants | Notes |
|-----------|----------|-------|
| **IconButton** | 4 | Medium/Small/Inline/xsmall |
| **IconButton.Toggle** | 6 | 4 sizes + grid_view/list_view |

---

## MailtoLink

| Component | Variants | Notes |
|-----------|----------|-------|
| **MailtoLink** | 12 | Style (Default/Muted/Brand) × Icon × Standalone |

---

## MenuItem

| Component | Variants | Notes |
|-----------|----------|-------|
| **MenuItem** | 4 | isSelected × state (Default/Hover) |

---

## Modal _(🚧 In Progress)_

| Component | Variants | Notes |
|-----------|----------|-------|
| **Modal** | Multiple | Standard/Large × Scrollable × Mobile |
| **Modal (Stepper)** | 4 | Mobile/Desktop × Stepper=true/false |
| **Modal (Fullscreen)** | 2 | Responsive=Desktop/Mobile |

Sub-components (internal): `Header without/with close button`, `Alert modal container`, `Basic Text`, `Scrim`, `Mobile Modal Container`, `Scrollable modal container`, `Fullscreen Modal Header`, `Fullscreen sticky footer`, `Layout=Side by side/Block`

---

## Multiselect _(🚧 In Progress)_

| Component | Variants | Notes |
|-----------|----------|-------|
| **Multiselect** | 11 | `Form-Field-Multiselect-Input`: 6 light states + 5 dark states |

Sub-component: `Multiselect Badge` (4 variants — Type=Light/Dark × State=Default/Hover; internal chip used inside the input field)

---

## NavBar _(🚧 In Progress)_

| Component | Variants | Notes |
|-----------|----------|-------|
| **NavBar** | 18 | Scheme=LMS/Dark × 6 breakpoints (xxl/xl/lg/md/sm/xs) + 6 loading skeletons |

Sub-components (internal): `Logged In`, `Logged Out`, `Right Controls`, Theme variants

---

## PageBanner

| Component | Variants | Notes |
|-----------|----------|-------|
| **PageBanner** | 6 | Primary/Light Variant/Dark Variant × desktop/mobile |

---

## Pagination

| Component | Variants | Notes |
|-----------|----------|-------|
| **Pagination** | 8 | Variant=Default/Reduced/Minimal × Size=Default/Small |

---

## Popover

| Component | Variants | Notes |
|-----------|----------|-------|
| **Popover** | 16 | Carat position (Bottom/Top/Left/Right) × State (Default/Success/Danger/Warning) |

---

## ProductTour

| Component | Variants | Notes |
|-----------|----------|-------|
| **ProductTour** | 3 | Default / One off / Mobile |

---

## ProgressBar

| Component | Variants | Notes |
|-----------|----------|-------|
| **ProgressBar** | 16 | Variant (Primary/Brand/Success/Warning) × Palette (Default/Dark) × Labeled (true/false) |

---

## SearchField

| Component | Variants | Notes |
|-----------|----------|-------|
| **SearchField** | 20 | Palette (Light/Dark) × Button (true/false) × State (Inactive/Hover/Focus/Activated/Disabled) |

---

## SelectMenu

| Component | Variants | Notes |
|-----------|----------|-------|
| **SelectMenu** | 1 | Single component |

---

## SelectableBox

| Component | Variants | Notes |
|-----------|----------|-------|
| **SelectableBox** | 17 | type=box/radio/checkbox × state (inactive/focus/selected/error/indeterminate) |

Note: `Selectable Box/checkbox/false`, `Selectable Box/radio/false`, `Selectable Box v2/box/indeterminate` appear to be legacy/v2 naming. `.example-content` and `.placeholder-content` are doc-only sub-components.

---

## Sheet

| Component | Variants | Notes |
|-----------|----------|-------|
| **Sheet** | 4 | Layout=Bottom/Top/Left/Right (defined twice — likely light + dark) |

---

## Skeleton _(🚧 In Progress)_

| Component | Variants | Notes |
|-----------|----------|-------|
| **Skeleton** | 6 | Shape=rounded/square/circle × Animation=static/animated (defined twice) |

Sub-component: `Table Header Skeleton Row`

---

## Spinner

| Component | Variants | Notes |
|-----------|----------|-------|
| **Spinner** | 2 | Default / Inverted |

---

## Stateful Button _(🚧 In Progress)_

No components defined yet.

---

## Stepper

| Component | Variants | Notes |
|-----------|----------|-------|
| **Stepper** | 4 | Type=Header/Footer × Size=Desktop/Mobile |

Sub-components: individual step indicators (Active/Complete/Error/Inactive states)

---

## Tabs _(🚧 In Progress)_

| Component | Variants | Notes |
|-----------|----------|-------|
| **Tabs** | 8 | Variant=Underline/Pills × Size=Default/Small (defined twice) |

Sub-component: `Tab` (individual tab item — Current × Variant × Size, 8 variants × 2)

---

## Toast · Tooltip

| Component | Variants | Notes |
|-----------|----------|-------|
| **Toast** | 4 | withAction (true/false) × Width (Default/Max Width) |
| **Tooltip** | 8 | Palette (Light/Dark) × Position (Bottom/Top/Left/Right) |

---

## Summary

**47 full Paragon components** across 31 pages:

`Alert`, `Annotation`, `Autosuggest`, `Avatar`, `AvatarButton`, `Badge`, `Breadcrumbs`, `Bubble`, `Button`, `ButtonGroup`, `Card`, `Checkbox`, `Chip`, `Collapsible`, `ContentBlockEmpty`, `ContentBlockError`, `DataTable`, `Dropdown`, `Dropzone`, `Form.Control.Feedback`, `Hyperlink`, `IconButton`, `IconButton.Toggle`, `Input`, `Input.Inline`, `MailtoLink`, `MenuItem`, `Modal`, `Multiselect`, `NavBar`, `PageBanner`, `Pagination`, `Popover`, `ProductTour`, `ProgressBar`, `Radio`, `SearchField`, `SelectMenu`, `SelectableBox`, `Sheet`, `Skeleton`, `Spinner`, `Stepper`, `Switch`, `Tabs`, `Toast`, `Tooltip`

**In progress with no components yet:** `Carousel`, `Color Picker`, `Stateful Button`
