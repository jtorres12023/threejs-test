# Florify Three.js microsite

An interactive Florify Daily Probiotic product page built with vanilla JavaScript, Three.js, and Vite. Includes a photo-based vector label, a custom kitchen background, and gentle bottle motion that stops when the visitor interacts.

## Development

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

Vite writes the production site to `dist/`.

## Project files

- `src/main.js`: page content, bottle geometry, lighting, and drag controls.
- `src/style.css`: responsive product page styling.
- `public/artwork/florify-label.svg`: reconstructed label.
- `public/artwork/SOURCES.md`: artwork references and reconstruction limits.
- `public/backgrounds/`: generated kitchen artwork and generation prompt.
- `work/create-florify-label.py`: script for rebuilding the vector label.

The original bottle reference photographs are retained in `public/artwork/`. Files in `public/` are included in the production build.

The label is a visual reconstruction, not verified production packaging. Florify and related brand names belong to their respective owners. Product information links to Melaleuca's official product page.
