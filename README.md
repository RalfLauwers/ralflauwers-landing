# ralflauwers-landing

Ralf Lauwers' personal landing page — **a pure static site with no build step.**

One self-contained page (`public/index.html` + `public/assets/`) that Netlify
publishes from the `public/` folder. No framework, no bundler, no server-side code.

- **Live:** https://ralflauwers.netlify.app
- **Repo:** https://github.com/RalfLauwers/ralflauwers-landing

---

## File layout

```
ralflauwers-landing/
├─ netlify.toml                   publish dir + cache headers (no build command)
├─ package.json                   netlify-cli devDependency + preview scripts (not published)
├─ public/                        ← the published site root
│  ├─ index.html                  the single page (all sections)
│  └─ assets/
│     ├─ css/styles.css           brand tokens + all styling (mobile-first)
│     ├─ js/main.js               mobile-nav toggle + scrollspy (no deps)
│     ├─ cv.pdf                   downloadable CV
│     ├─ fonts/                   self-hosted brand webfonts + OFL licences
│     │  ├─ SourceSerif4-{Regular,SemiBold,Bold}.ttf
│     │  ├─ Inter-{Regular,SemiBold,Italic}.ttf
│     │  ├─ JetBrainsMono-Regular.ttf
│     │  └─ *-OFL.txt
│     └─ img/
│        ├─ ralf-lauwers-logo-primary.svg     header lockup (on light)
│        ├─ ralf-lauwers-logo-reversed.svg    footer lockup (on ink navy)
│        ├─ ralf-lauwers-favicon.svg          favicon
│        ├─ profile.jpg                       real headshot — hero + og:image
│        ├─ candid-2.png                      about photography ("in the work")
│        └─ candid-1.png                      spare candid (not currently placed)
└─ README.md
```

Only `public/` is published — `netlify.toml`, `package.json` and this README stay
out of the live site.

All page paths are relative (`assets/…`), so the page works identically at the
site root, under a subpath, or opened over `file://`.

---

## Local preview

Serve `public/` over HTTP — the recommended way, because browsers block local font
files over `file://` (origin `null`), which would drop the self-hosted fonts to the
system fallback and log console errors.

```powershell
# Option A — any Python 3, no install needed
python -m http.server 8080 --directory public   # then open http://localhost:8080/

# Option B — Netlify dev server (uses the netlify-cli devDependency)
npx netlify dev                                 # or: npm run dev
```

Nothing is fetched from a CDN; all fonts and images are local.

---

## Deploy (Netlify)

The site is connected to Netlify (branch `main`) and deploys from this repo.

- **Build command:** *(none — leave empty)*
- **Publish directory:** `public`

`netlify.toml` encodes this: it sets `publish = "public"` and defines **no** build
command, so Netlify just uploads the static files. Pushing to `main` triggers a
deploy; no build step runs.

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

## Pending item

- **Optional purpose-built OG image.** `og:image` currently uses the headshot
  (`profile.jpg`). A dedicated 1200×630 social card would read better in
  `summary_large_image` previews.

---

## History

This repo previously hosted an Astro build-based project; it was retired in favour
of the plain static page in `public/`. The earlier version remains in git history.
