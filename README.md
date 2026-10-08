# ralflauwers-landing

Ralf Lauwers' personal landing page — **a pure static site with no build step.**

One self-contained page (`index.html` + `assets/`) that Netlify publishes straight
from the repo root. No framework, no bundler, no server-side code.

- **Live:** https://ralflauwers.netlify.app
- **Repo:** https://github.com/RalfLauwers/ralflauwers-landing

---

## File layout

```
ralflauwers-landing/
├─ index.html                     the single page (all sections)
├─ netlify.toml                   publish dir + cache headers (no build command)
├─ package.json                   netlify-cli devDependency + preview scripts
├─ assets/
│  ├─ css/styles.css              brand tokens + all styling (mobile-first)
│  ├─ js/main.js                  mobile-nav toggle + scrollspy (no deps)
│  ├─ cv.pdf                      downloadable CV  (see pending items)
│  ├─ fonts/                      self-hosted brand webfonts + OFL licences
│  │  ├─ SourceSerif4-{Regular,SemiBold,Bold}.ttf
│  │  ├─ Inter-{Regular,SemiBold,Italic}.ttf
│  │  ├─ JetBrainsMono-Regular.ttf
│  │  └─ *-OFL.txt
│  └─ img/
│     ├─ ralf-lauwers-logo-primary.svg     header lockup (on light)
│     ├─ ralf-lauwers-logo-reversed.svg    footer lockup (on ink navy)
│     ├─ ralf-lauwers-favicon.svg          favicon
│     ├─ profile.jpg                       real headshot — hero + og:image
│     ├─ candid-2.png                      about photography ("in the work")
│     └─ candid-1.png                      spare candid (not currently placed)
└─ README.md
```

All internal paths are relative (`assets/…`), so the page works identically at the
site root, under a subpath, or opened over `file://`.

---

## Local preview

Serve the repo root over HTTP — this is the recommended way to preview, because
browsers block local font files over `file://` (origin `null`), which would drop
the self-hosted fonts to the system fallback and log console errors.

```powershell
# Option A — Netlify dev server (uses the netlify-cli devDependency)
npx netlify dev            # or: npm run dev

# Option B — any Python 3, no install needed
python -m http.server 8080 # or: npm run serve
# then open http://localhost:8080/
```

Nothing is fetched from a CDN; all fonts and images are local.

---

## Deploy (Netlify)

The site is connected to Netlify and deploys from this repo.

- **Build command:** *(none — leave empty)*
- **Publish directory:** `.` (the repo root)

`netlify.toml` encodes this: it sets `publish = "."` and defines **no** build
command, so Netlify just uploads the static files. Pushing to the connected
branch triggers a deploy; no build step runs.

Cache headers (also in `netlify.toml`):

- `/assets/fonts/*` → `public, max-age=31536000, immutable` (fixed binaries)
- `/assets/img/*` → `public, max-age=2592000` (30 days — filenames are not
  content-hashed, so a changed image stays recoverable)
- `assets/css/*`, `assets/js/*`, `assets/cv.pdf` are intentionally **not**
  long-cached — they change together with `index.html`.

---

## SEO / Open Graph

`canonical`, `og:url`, and `og:image` point at the live Netlify origin:

- canonical → `https://ralflauwers.netlify.app/`
- og:url → `https://ralflauwers.netlify.app/`
- og:image → `https://ralflauwers.netlify.app/assets/img/profile.jpg`

If a custom domain is added later, update those three values to the new origin.

---

## Pending items

1. **CV is still the pre-repaint one.** `assets/cv.pdf` is the old-brand CV,
   carried over as a placeholder download. It should be regenerated in the
   current brand and dropped in to replace it.
2. **Optional purpose-built OG image.** `og:image` currently uses the headshot
   (`profile.jpg`). A dedicated 1200×630 social card would read better in
   `summary_large_image` previews.

---

## History

This repo previously hosted a build-based static-site project (source files, a
build configuration, and a generated output directory). That build was retired
in favour of the finished plain static page above. The earlier version remains
in git history and in the `MyLife` workspace under `apps/personal-site/`.
