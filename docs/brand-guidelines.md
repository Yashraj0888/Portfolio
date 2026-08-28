# Brand Guidelines — Yashraj Singh

> Last updated: 2026-08-29
> Status: Active

## Quick Reference

| Element | Value |
|---------|-------|
| Primary Color | #0A0A0A (Ink) |
| Surface Color | #FAFAF8 |
| Accent Color | #10B981 (Available) |
| Display Font | Syne |
| Body Font | DM Sans |
| Voice | Confident, Clear, Craft-focused |

---

## 1. Color Palette

### Primary Colors

| Name | Hex | Usage |
|------|-----|-------|
| Ink | #0A0A0A | Headlines, primary buttons, logo |
| Surface | #FAFAF8 | Page backgrounds |
| Muted | #6B6B6B | Body secondary text |
| Line | #E8E8E4 | Borders, dividers |

### Accent

| Name | Hex | Usage |
|------|-----|-------|
| Available | #10B981 | Status badge, success states |

### Dark Section

| Name | Hex | Usage |
|------|-----|-------|
| Dark | #111111 | Experience section background |
| Dark Muted | #888888 | Text on dark backgrounds |

---

## 2. Typography

```css
--font-display: 'Syne', system-ui, sans-serif;
--font-body: 'DM Sans', system-ui, sans-serif;
```

| Element | Desktop | Weight |
|---------|---------|--------|
| Hero watermark | clamp(4rem, 18vw, 14rem) | 700 |
| H1 Section | 3rem–5rem | 700 |
| H2 | 1.5rem–2rem | 700 |
| Body | 1rem | 400 |
| Caption | 0.875rem | 500 |

---

## 3. Logo

| Variant | File | Use Case |
|---------|------|----------|
| Icon | logo-icon.svg | Nav, favicon, footer avatar |
| Full | logo-full.svg | Documents, headers |

**Style:** Minimalist lettermark — interlocking "Y" and "S" monogram, black on white.

---

## 4. Voice & Tone

| Trait | We Are | We Are Not |
|-------|--------|------------|
| Confident | Assured, capable | Arrogant |
| Clear | Direct, precise | Vague, buzzword-heavy |
| Craft-focused | Detail-oriented | Generic template-like |

---

## 5. Imagery

- High-contrast photography with natural tones
- Rounded corners (1rem–1.5rem) on images
- Soft card shadows: `0 4px 40px rgba(0,0,0,0.04)`

---

## AI Image Generation

Base prompt template:

```
Minimalist monochrome portfolio aesthetic, warm off-white #FAFAF8 background,
soft diffused shadows, clean sans-serif typography, high contrast black #0A0A0A,
professional developer portfolio, no text, no letters
```
