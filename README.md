# Drishti Rana — Portfolio Website

A personal resume/portfolio website built with vanilla HTML5, CSS, and JavaScript. No frameworks, no dependencies beyond Font Awesome and Google Fonts.

**Live site:** https://drish08.github.io/Portfolio

---

## Features

- **Particle network canvas** — animated neural-network background that reacts to mouse movement
- **Dark / Light theme** — toggle with system preference detection, persisted via `localStorage`
- **Custom cursor** — dot + lagging ring with magnetic hover effect
- **Typewriter effect** — name and subtitle animate in on load
- **3D card tilt** — cards rotate on mouse movement with a per-card spotlight
- **Animated SVG rings** — progress rings draw in with a count-up when scrolled into view
- **Scroll reveal** — staggered fade-up animations on all sections
- **Magnetic buttons** — hero and nav buttons drift toward the cursor
- **Fully responsive** — mobile-friendly layout, cursor and tilt disabled on touch devices

## Stack

| Layer | Tech |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, backdrop-filter, SVG) |
| Interactivity | Vanilla JavaScript (Canvas API, IntersectionObserver) |
| Icons | Font Awesome 6 |
| Fonts | Space Grotesk + Space Mono (Google Fonts) |
| Hosting | GitHub Pages |

## Structure

```
Portfolio/
├── index.html   # All content and markup
├── styles.css   # Design system, theming, animations
└── script.js    # Canvas, cursor, typewriter, tilt, rings
```

## Sections

1. Hero — name, role, contact links
2. Academic Qualifications
3. Work Experience & Internships
4. Key Projects
5. Technical Skills
6. Courses & Certificates
7. Positions of Responsibility
8. Extra-Curricular Activities

## Local Development

No build step needed — just open `index.html` in a browser.

```bash
git clone https://github.com/drish08/Portfolio.git
cd Portfolio
open index.html
```

---

© 2025 Drishti Rana
