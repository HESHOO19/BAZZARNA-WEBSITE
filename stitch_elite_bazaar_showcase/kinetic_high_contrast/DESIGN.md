---
name: Kinetic High-Contrast
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#bec9be'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#889489'
  outline-variant: '#3f4941'
  surface-tint: '#7ed9a0'
  primary: '#7ed9a0'
  on-primary: '#00391e'
  primary-container: '#007041'
  on-primary-container: '#95f0b5'
  inverse-primary: '#006d3f'
  secondary: '#fff0c9'
  on-secondary: '#3c2f00'
  secondary-container: '#fed000'
  on-secondary-container: '#6f5900'
  tertiary: '#c6c6c7'
  on-tertiary: '#2f3131'
  tertiary-container: '#606161'
  on-tertiary-container: '#dcdddd'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#9af6ba'
  primary-fixed-dim: '#7ed9a0'
  on-primary-fixed: '#00210f'
  on-primary-fixed-variant: '#00522e'
  secondary-fixed: '#ffe07f'
  secondary-fixed-dim: '#edc200'
  on-secondary-fixed: '#231b00'
  on-secondary-fixed-variant: '#564500'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-xl:
    fontFamily: Epilogue
    fontSize: 80px
    fontWeight: '800'
    lineHeight: 90%
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Epilogue
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 110%
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Epilogue
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 120%
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 160%
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 150%
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 100%
    letterSpacing: 0.1em
spacing:
  unit: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  section-gap: 120px
---

## Brand & Style
The design system is rooted in a **High-Contrast / Modern** aesthetic that balances the raw energy of a pop-up event with the prestige of a top-tier society. It utilizes a bold, architectural approach to layout, where heavy blocks of color and sharp typography create a sense of urgency and exclusivity. 

The visual language is "hyper-dynamic," meaning it prioritizes motion-ready compositions—asymmetric grids, overlapping elements, and large-scale photography. The goal is to evoke the feeling of a curated, high-end marketplace that is constantly evolving and "alive."

## Colors
The palette is centered around **Rich Black** and **Deep Emerald Green**, providing a sophisticated foundation that allows the **Vibrant Yellow** to function as a high-visibility accent. 

- **Primary (Emerald):** Used for heritage elements and premium call-outs.
- **Secondary (Electric Yellow):** Reserved for interactive triggers, "Pop-Up" alerts, and critical UI pathing.
- **Neutral (Rich Black/Bone):** The dark mode default ensures that event photography and vibrant brand assets pop with maximum luminosity.
- **Accent (White):** High-end typography and hairline separators for clarity.

## Typography
This design system employs a tiered typographic strategy to mirror the "Society" aspect of the brand. **Epilogue** is used for headlines to provide a geometric, editorial feel that is both contemporary and authoritative. 

For functional UI and long-form content, **Inter** provides maximum readability. **Space Grotesk** is introduced for utility labels and navigation markers, adding a subtle "technical" or "event-pass" vibe to the interface. All headlines should prioritize tight leading and negative letter-spacing for a high-fashion, high-impact appearance.

## Layout & Spacing
The layout follows a **Fixed 12-Column Grid** for desktop, but encourages "breaking the box." This design system utilizes generous section gaps to create a sense of premium "breathing room" between dense content modules.

Margins are wide to focus the eye inward, while horizontal lines (hairline weight) are used to rhythmically divide information. Spacing follows a strict 8px base unit, ensuring that even the most dynamic, asymmetric layouts feel mathematically grounded and intentional.

## Elevation & Depth
Depth in this design system is achieved through **Tonal Layers** and **Hard Overlaps** rather than traditional shadows. This maintains a clean, modern look.

- **Level 0 (Base):** Rich Black (#111111).
- **Level 1 (Cards):** Deep Emerald or Dark Grey (#1A1A1A).
- **Interactive Layers:** Vibrant Yellow elements should feel "flush" but appear visually elevated through color contrast alone.
- **Glassmorphism:** Use subtle 20% opacity white blurs for navigation bars to maintain context of the vibrant event imagery underneath.

## Shapes
The shape language is strictly **Sharp (0px)**. This design system avoids rounded corners to project a sense of architectural structure and "A-Class" sophistication. 

Buttons, image containers, and cards are all defined by 90-degree angles. To prevent the UI from feeling "cold," circles are used exclusively as a secondary graphic motif (for badges or profile photos), creating a sharp contrast against the rigid rectangular grid of the layout.

## Components
- **Buttons:** Rectangular with no radius. Primary buttons are Vibrant Yellow with Black text. Secondary buttons are Ghost-style with a 1px White or Emerald border.
- **Chips/Badges:** Small, all-caps labels using Space Grotesk. Use Emerald backgrounds for "Verified" or "Premium" status.
- **Cards:** Heavy use of image-to-edge ratios. Text overlays should use a gradient scrim (Black at 60% opacity) to ensure legibility over busy event photography.
- **Input Fields:** Bottom-border only (1px White) with labels set in Space Grotesk. Focus state shifts the border to Vibrant Yellow.
- **Interactive Elements:** Hover states should involve a "fill" animation or a sharp color inversion to reinforce the "dynamic" brand pillar.