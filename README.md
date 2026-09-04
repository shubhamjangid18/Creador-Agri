# AgriPack Studio — Landing Page

A single-page portfolio/landing site for an agriculture packaging & branding studio.
Built with Vite + React (JSX) + plain CSS — one CSS file per component.

## Run it

```bash
npm install
npm run dev
```

Open the printed localhost URL. For a production build:

```bash
npm run build
npm run preview
```

## Structure

```
src/
  App.css              -> global only: design tokens, reset, .btn / .section-title utilities
  App.jsx              -> assembles the page, handles "category -> scroll to form"
  components/
    Navbar.jsx / .css    -> sticky nav: logo, section links, phone, Contact Now CTA,
                            transparent-over-hero -> solid on scroll, mobile hamburger
    Hero.jsx / .css      -> headline, subheadline, 4-image collage, Contact Now CTA
    Breather.jsx / .css  -> single-line breathing section between hero and categories
    Categories.jsx / .css -> 5 clickable category cards (Fertilizers, Seeds, Pesticides,
                            Biostimulants, Fungicides) with premium hover reveal
    Marquee.jsx / .css   -> two-row autoscrolling ticker of your 3 portfolio sites
                            (Nutrify, Acasia Techno, Nutricrop) — pauses on hover
    ContactForm.jsx / .css -> lead form (Name, Company, Category, Phone, Message)
    Footer.jsx / .css    -> contact info, quick links, socials
```

Every component imports its own stylesheet directly, e.g.:

```js
import './Hero.css'
```

`App.css` only holds things truly shared across the whole page — CSS variables
(colors, fonts, spacing tokens), the base reset, and the `.btn` / `.section-title`
/ `.section-sub` utility classes reused by more than one component.

## Swap in real assets

Every image on the page is currently pulled live from `loremflickr.com` using
topic keywords (fertilizer, seeds, pesticide bottle, etc.) so the page looks
fully populated out of the box. Replace these with the client's real photography
whenever it's ready:

- `src/components/Hero.jsx` — 4 hero images
- `src/components/Categories.jsx` — 5 category card images
- `src/components/Marquee.jsx` — 3 site preview screenshots (currently themed
  stock photos standing in for real screenshots of Nutrify, Acasia Techno and
  Nutricrop — swap for actual screenshots of those sites)

Update the phone number, email and address in `Navbar.jsx`, `ContactForm.jsx`
and `Footer.jsx` before launch. The form currently just shows a success
message on submit — wire `handleSubmit` in `ContactForm.jsx` to your form
endpoint, email service, or CRM.

## Notes

- Colors, type (Fraunces + Work Sans) and layout tokens live at the top of
  `src/App.css` if you want to adjust the palette globally.
- The category cards scroll the page down to the contact form and
  pre-select that category in the dropdown.
- Reduced-motion users get the marquee animation turned off automatically.
