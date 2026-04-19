# Design System Strategy: The Cognitive Gallery

## 1. Overview & Creative North Star
The "Cognitive Gallery" is the creative North Star of this design system. It moves away from the "toy-like" aesthetic of traditional language apps and positions Russian language learning as an elite, curated experience. This system treats every lesson, word, and grammar rule as a piece of art within a modern exhibition space.

To break the "template" look, we employ **Intentional Asymmetry**. While the system is grid-based, we use negative space to "pull" the eye. Typography is never just centered; it is placed with editorial intent, often utilizing large, high-contrast scales to create a sense of authority and prestige. We replace rigid structural boxes with soft, layered transitions, making the interface feel organic rather than mechanical.

---

## 2. Colors & Materiality
The palette is anchored by a sophisticated Indigo (`primary`) and a progressive Teal (`secondary`). These colors represent the bridge between the intellectual rigor of German grammar and the deep cultural history of the Russian language.

### The "No-Line" Rule
Designers are strictly prohibited from using 1px solid borders to define sections. All containment must be achieved through:
- **Background Color Shifts:** Use `surface-container-low` sections placed against a `surface` background.
- **Tonal Transitions:** A card should be defined by its shift from `surface` to `surface-container-lowest`, not by a stroke.

### Surface Hierarchy & Nesting
Think of the UI as a physical desk with stacked sheets of fine paper.
- **Level 0 (Base):** `surface` (#f8f9fa) — The foundation.
- **Level 1 (Sections):** `surface-container-low` (#f3f4f5) — Large content blocks.
- **Level 2 (Interactive Elements):** `surface-container-lowest` (#ffffff) — Cards and actionable items.

### The "Glass & Gradient" Rule
To add "soul" to the digital environment:
- **Signature Gradients:** For primary CTAs and high-level progress indicators, use a subtle linear gradient transitioning from `primary` (#394baf) to `primary_container` (#5365c9).
- **Glassmorphism:** For floating headers or mobile navigation bars, use `surface` with 80% opacity and a `24px` backdrop-blur. This ensures the content "lives" within the space rather than sitting on top of it.

---

## 3. Typography
We use a dual-font approach to balance modernity with readability.

- **Display & Headlines (Manrope):** Chosen for its geometric precision and modern "tech-editorial" feel. Large scales (`display-lg` at 3.5rem) should be used to anchor landing states and lesson milestones.
- **Body & Labels (Inter):** The industry standard for legibility. This handles the heavy lifting of Russian Cyrillic characters and German translations.

**The Hierarchy Rule:** Always maintain a minimum 2-step jump in the scale between a headline and its sub-text to ensure a high-contrast, premium editorial look.

---

## 4. Elevation & Depth
Depth in this design system is environmental, not artificial.

- **The Layering Principle:** Avoid shadows where background color shifts can do the work. A `surface-container-lowest` card on a `surface-container-low` background creates a "natural" lift.
- **Ambient Shadows:** Shadows are reserved for elements that physically "float" (modals, dropdowns). They must be ultra-diffused: `X: 0, Y: 8, Blur: 32, Color: on-surface @ 6%`. Never use pure black shadows; always tint them with the `on-surface` color.
- **The "Ghost Border" Fallback:** If accessibility requires a border (e.g., in high-glare environments), use the `outline-variant` (#c4c5d9) at **20% opacity**. It should be felt, not seen.

---

## 5. Components

### Buttons
- **Primary:** Linear gradient (`primary` to `primary_container`), `xl` roundedness (1.5rem). No shadow.
- **Secondary:** No fill. `outline-variant` Ghost Border (20% opacity) with `on-surface` text.
- **Tertiary:** Text-only with `primary` color, medium weight.

### Cards & Lists
- **The Forbidden Divider:** Never use horizontal lines to separate list items. Use vertical whitespace (16px or 24px) or alternating `surface-container` shifts.
- **Language Pair Cards:** Use `surface-container-lowest` for the card body. Display the Russian word in `headline-md` (Manrope) and the German translation in `body-md` (Inter, `on-surface-variant`).

### Input Fields
- **State:** Resting inputs use `surface-container-low` with no border. On focus, transition to `surface-container-lowest` with a 1px `primary` ghost border (40% opacity).
- **Russian Input:** Provide extra vertical padding for Cyrillic descenders.

### Gamification Elements (Sophisticated)
- **Progress Bars:** Use a thin 4px track (`surface-variant`) with a `secondary` (Teal) fill. Avoid chunky bars.
- **Chips:** For grammar categories (e.g., "Dative Case"), use `secondary-container` with `on-secondary-container` text. `full` roundedness.

---

## 6. Do's and Don'ts

### Do
- **Embrace White Space:** Allow at least 48px of padding between major content blocks. 
- **Type as Hero:** Let the Cyrillic characters be the visual focus. Use `display-sm` for individual Russian words to celebrate their form.
- **Subtle Motion:** Use ease-in-out transitions (300ms) for surface color shifts on hover.

### Don't
- **No Heavy Borders:** Never use 100% opaque `outline` tokens for structural containers.
- **No Pure Black:** Ensure all "dark" text uses `on-surface` (#191c1d), which is a deep charcoal, softer on the eyes than #000.
- **Avoid Clutter:** If a screen feels "busy," remove an element rather than adding a divider. Use the grid to align, not to box in.
- **No Default Shadows:** Never use the standard CSS `box-shadow: 0 2px 4px rgba(0,0,0,0.5)`. It destroys the premium aesthetic.