---
title: Frontend
weight: 3
prev: /docs/backend
next: /docs/reference
---

The frontend is a **React 19 + TypeScript** single-page app built with Vite and
styled with the [Nebari design system](https://github.com/nebari-dev/nebari-design)
— the same design system that themes this documentation site.

| Item | Value |
|------|-------|
| Framework | React 19 |
| Language | TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui via the `@nebari` registry |
| Data fetching | TanStack Query |
| State | Jotai |
| Dev port | 5173 |

## Design system

Components come from the Nebari shadcn registry:

```bash
npx shadcn add @nebari/<component>
```

Design tokens live as CSS custom properties in `src/index.css` (OKLCH colors,
light + dark) with fonts **Geist Variable** and **IBM Plex Mono**. These are the
exact tokens this docs theme reuses.

## Project structure

```
frontend/
├── src/
│   ├── index.css            # Tailwind v4 + Nebari tokens (@theme, :root, .dark)
│   ├── components/          # UI + feature components
│   ├── hooks/
│   ├── lib/                 # utils (cn(), api client)
│   └── ...
├── components.json          # shadcn config (@nebari registry)
├── vite.config.ts
└── package.json
```

## Commands

```bash
npm run dev        # start dev server (http://localhost:5173)
npm run build      # production build
npm run lint       # Biome
```
