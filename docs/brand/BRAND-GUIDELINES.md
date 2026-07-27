# Malibaan Brand Guidelines (distilled)

Source: `malibaan-brand-book.pdf` in this folder — brand deck by BOLD Creative Studio
("Malibaan Project", 156 pages). This file is a working summary of the parts that
affect the website's design system. Re-check the PDF directly for anything not
covered here (it also has stationery, presentation, signage, and social mockups).

## Logo

- Symbol: a shield/crest with a woman's profile ("نظارت، چهره زنانه‌ی مصمم" — vigilance,
  a determined woman's face) and diagonal stripes ("رشد، نماد نمودار و پیشرفت" — growth).
  Full concept: "سپر فقط ابزار دفاع نیست، بیانیه‌ای‌ست از تعهد" (the shield isn't just a
  defense tool, it's a statement of commitment).
- Wordmark: **Malibaan** (EN) / **مالی‌بان** (FA), tagline "Smart Accounting for Growth" /
  "حسابداری هوشمند برای رشد".
- Provided in 3 tones — `public/brand/svg|png/{brand,black,white}/` — plus `symbol`,
  `en-horizontal`, `en-stacked`, `fa-horizontal`, `fa-stacked` variants of each.
  - `brand` tone (dark green on light bg): default/most contexts.
  - `white` tone: dark or photo backgrounds.
  - `black` tone: single-color print, stamps, fax.
- Favicon set at `public/brand/favicon/`: `favicon.ico`, `apple-touch-icon.png`,
  `icon-192.png`, `icon-512.png`, `maskable-512.png`.

## Color palette (exact, from the brand book's Color Palette page)

Primary green ramp (dark → light):
| Token | Hex | RGB | Use |
|---|---|---|---|
| Primary (darkest) | `#0d4214` | 15,66,20 | Primary brand color — logo, CTAs, dark sections |
| Step 2 | `#50c173` | 80,190,110 | Mid green accent |
| Step 3 | `#96e2a0` | 150,225,160 | Light green accent |
| Step 4 | `#ade9ca` | 173,233,200 | Pale mint tint |
| Step 5 (lightest) | `#e2f9ec` | 226,250,236 | Palest mint tint |

Pairing/neutral tints (from the "Pairing Color" examples page):
| Token | Hex | Use |
|---|---|---|
| Sage tint | `#c3e0c7` | Alternate light section background |
| Cream | `#fdf9f5` | Off-white background/paper tone |
| Pale blue tint | `#e3ecf3` | Alternate light section background |

These map to the site's Tailwind tokens in `src/app/globals.css` as
`--color-brand-green-900` (primary), `--color-brand-mint-500/400/300` (steps 3/4/5),
and `--color-brand-cream-50` (cream). `green-950/800/700/600` and `ink-*`/`line` are
*derived* shades for UI depth (hover states, dark sections) — not literal brand-book
swatches, since the book only specifies the two greens above plus the light ramp.

## Typography

- **Primary (Latin) typeface: SF Pro.** Apple's system font — not licensable for web
  embedding via Google Fonts. The site uses **Inter** (`next/font/google`) as the
  closest open-source substitute; keep this unless a licensed SF Pro web font becomes
  available.
- **Persian typeface: Ravi.** The site already declares `"Ravi"` as a CSS fallback
  in `--font-fa`, with **Vazirmatn** (open-source, `next/font/google`) as the actual
  loaded font since Ravi isn't distributed as a web font. If a licensed Ravi webfont
  is obtained later, add it before Vazirmatn in the stack.
- Weight range shown in the book: Ultralight → Thin → Light → Regular → Medium →
  Semibold → Bold → Heavy → Black, for both typefaces.

## Voice / brand story (for copywriting reference)

Core promise: "عدالت مالی حق هر کسب‌وکار است" (financial justice is every business's
right). Brand pillars called out in the book: **شفافیت** (transparency), **تخصص**
(expertise), **تحول** (transformation) — also used as a tagline set ("Transparency.
Expertise. Transformation." / "Redefining Financial Clarity."). Keep this vocabulary
in headlines and CTAs where it fits naturally.

## Applying this consistently

- Always pull colors from the CSS custom properties / Tailwind `brand-*` classes,
  never hardcode a hex in a component — that's what keeps a single correction here
  flowing everywhere.
- Use the `brand` tone logo/lockup by default; switch to `white` only on dark or
  photographic backgrounds, `black` only for single-color print contexts (not
  relevant on the website, but keep in mind if a printable asset is ever generated).
- The brand-book PDF is large (15MB) — read specific page ranges with the `pages`
  parameter rather than the whole file when consulting it directly.
