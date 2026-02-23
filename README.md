# Mon Ami Macarons — Web Client

A luxury storefront website for **Mon Ami**, a Lviv-based patisserie specialising in French macarons. Built with React 19 and Vite 7, featuring GSAP-powered scroll animations, 3D mouse parallax, and a refined gold-and-cream design system.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 7 | Build tool & dev server |
| GSAP + ScrollTrigger | 3.14 | Scroll-pinned animations, parallax, timelines |
| Lucide React | 0.574 | Icon set |
| Cormorant / Tenor Sans / Montserrat | — | Typography via Google Fonts |

---

## Project Structure

```
src/
├── app/
│   ├── App.tsx              # Root component — composes pages
│   ├── router.tsx           # Placeholder — routing not yet implemented
│   └── store.tsx            # Placeholder — global state not yet implemented
├── pages/
│   ├── HomePage.tsx         # Hero section with floating macarons & scroll exit
│   ├── StoryPage.tsx        # "Our Story" section with chef photo & stats
│   ├── MenuPage.tsx         # ⚠️  Not implemented
│   ├── OrderPage.tsx        # ⚠️  Not implemented
│   ├── ProfilePage.tsx      # ⚠️  Not implemented
│   └── NotFound.tsx         # ⚠️  Not implemented
├── shared/
│   └── layout/
│       ├── MainLayout.tsx   # Shell: Header + <main> + Footer
│       ├── Header.tsx       # Sticky header, mobile burger menu
│       └── Footer.tsx       # Footer with marquee band & payment badges
├── styles/
│   ├── global.css           # Design tokens, base typography, SVG background pattern
│   ├── homepage.css         # Hero section styles
│   ├── storypage.css        # Story section styles
│   ├── header.css           # Header styles
│   └── footer.css           # Footer styles
├── assets/
│   ├── images/macaron/      # Macaron product photos (PNG) — 18 flavours
│   ├── images/denis/        # Chef portrait
│   └── icons/footer/        # Payment provider logos (Apple Pay, Visa, etc.)
└── types/
    └── assets.d.ts          # Module declarations for static asset imports
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:5173)
npm run dev

# Production build
npm run build

# Preview the production build locally
npm run preview
```

---

## Design System

All colour, spacing and font decisions are driven by CSS custom properties defined in `src/styles/global.css`.

```css
:root {
  /* Palette */
  --cream:      #faf9f6;
  --cream-dark: #f2ede4;
  --gold:       #b8986a;
  --gold-dark:  #7a6840;
  --text-dark:  #2c2416;
  --text-muted: #8a7d68;

  /* Font roles */
  --font-header:  'Cormorant', serif;        /* logo, header links */
  --font-heading: 'Tenor Sans', serif;       /* page section headings */
  --font-body:    'Montserrat', sans-serif;  /* body copy, labels, UI */
}
```

All font sizes use `clamp()` to scale fluidly between viewport breakpoints — no hardcoded `px` values in typographic rules.

---

## Animations

All animations are implemented with GSAP. `ScrollTrigger` is registered once per component via `gsap.context()`, which is cleaned up on unmount via `ctx.revert()`.

### Hero (`HomePage.tsx`)

| Animation | Trigger | Implementation |
|---|---|---|
| Page load sequence | On mount | Single `gsap.timeline` — orb → hero image → eyebrow label → headline chars (staggered) → subtitle → CTA → floating macarons → scroll arrow |
| Headline character reveal | Part of load timeline | `innerText` split into `<span class="hero-char">` elements, then `fromTo` with `rotateY` stagger |
| Idle float | Continuous after load | Per-element `gsap.to` with `repeat: -1`, `yoyo: true`, unique duration and Y offset |
| Hero image bob | Continuous after load | Gentle `y` + `rotateZ` loop |
| 3D mouse parallax | `mousemove` on `window` | `gsap.to` with `overwrite: 'auto'`; each floating macaron shifted by a `depth` factor; hero image and orb move at lower intensity in the opposite direction |
| Scroll exit | `ScrollTrigger` pinned (`+=120%`, `scrub: 0.7`) | Text exits upward → hero image flies left → orb expands → floaters scatter with depth-scaled offsets |

### Story (`StoryPage.tsx`)

| Animation | Trigger |
|---|---|
| Photo column slide-in from left | `ScrollTrigger` scrub, `start: 'top 78%'` |
| Eyebrow label fade + letter-spacing collapse | `toggleActions: 'play none none none'` |
| Content children stagger | `ScrollTrigger` scrub |
| Stats row scale + fade in | `toggleActions`, `back.out(1.4)` ease |

---

## Code Quality

```bash
npm run lint        # ESLint (flat config, eslint.config.js)
npm run lint:fix    # ESLint with --fix
npm run format      # Prettier
```

ESLint is configured with `eslint-plugin-react`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`. A legacy `.eslintrc.json` is present in the root but superseded by the flat `eslint.config.js`.

---

## What Is Not Yet Implemented

The following items exist as empty files or stubs and require implementation before the site is feature-complete.

### Pages

- **`MenuPage.tsx`** — Full product catalogue. Intended to display all macaron flavours with filtering by category, a detail modal or page per flavour, and "add to cart" / "add to favourites" actions.
- **`OrderPage.tsx`** — Order flow. Intended to include a cart summary, customer details form, delivery method selection, and payment integration (LiqPay).
- **`ProfilePage.tsx`** — Customer account. Order history, saved addresses, favourites list.
- **`NotFound.tsx`** — 404 fallback for unmatched routes.

### Infrastructure

- **`src/app/router.tsx`** — Client-side routing is completely absent. All pages are currently rendered unconditionally in `App.tsx`. A router (React Router v7 or TanStack Router) needs to be introduced along with layout-level route nesting.
- **`src/app/store.tsx`** — No global state management exists. Cart contents, wishlist, and authentication state will need a dedicated solution — Zustand, Jotai, or React Context depending on scope.

### Features

- **Cart & wishlist** — The header cart and heart icons are rendered but entirely non-functional. No state, no side drawer, no persistence.
- **Navigation links** — Every `<a href="#">` in the header and footer is a placeholder. Real routes must be wired up once the router is in place.
- **Mobile Hero layout** — The floating macaron grid overlaps on small viewports. Only a basic breakpoint rule is applied; a proper responsive layout pass is needed.
- **Image optimisation** — All macaron images are imported as raw PNGs with no lazy-loading, no `srcset`, and no WebP conversion in the build pipeline.
- **SEO** — No `<meta>` description, Open Graph tags, canonical URLs, or structured data beyond the default Vite `index.html`.
- **Accessibility** — Focus management, ARIA live regions for dynamic content, and keyboard navigation for the mobile burger menu are not yet addressed.

---

## License

Private project. All rights reserved © 2024–2025 Mon Ami Macarons.
