# Pon Sanmuga Vishal G — Portfolio

Personal portfolio built with **Next.js 16**, **Tailwind CSS 4** and **Motion** (Framer Motion), made to deploy on **Vercel**.
The design is a light-first **"liquid glass"** look (frosted glass cards on a soft blue-violet aurora), with an optional dark theme.

**Live:** https://ponsanmugavishal.vercel.app

## What's inside

| Feature | How it works |
| --- | --- |
| Liquid glass design | Frosted glass cards with a light rim and a shine that follows the mouse; extra "refraction" in Chrome/Edge |
| Light & dark theme | Opens in light. The sun/moon button (navbar, mobile menu, footer) switches theme; the choice is remembered |
| Aurora background | Slowly drifting blue / violet / cyan light behind the whole site |
| Smooth scrolling | **Lenis**; menu links glide to each section and stop just below the navbar |
| Animated hero | Cut-out photo in a glass orb (head pops out of the top), mouse parallax, floating chips, rotating words, stats strip |
| Projects | Stacking cards on desktop, 3D tilt, animated illustrations for each project (colours follow the theme) |
| Live GitHub repos | Fetched on the server from the GitHub API, refreshed every hour automatically |
| Contact form | `POST /api/contact` → sends the message to your Gmail through **Resend**; *Reply* goes straight to the sender |
| Spam protection | Hidden honeypot field, minimum fill time, 5 messages / 10 min per IP, input validation |
| Quick menu | Press **Ctrl + K** (**⌘ + K** on Mac) or the search button in the navbar: jump to a section, copy email, get the resume, switch theme |
| Resume download | `public/resume/Pon_Sanmuga_Vishal_G_Resume.pdf` |
| Visitor stats | **Vercel Web Analytics** (see visits, countries, devices in your Vercel dashboard) |
| Link previews | Auto-generated preview image when the link is shared on WhatsApp / LinkedIn |
| SEO | Page metadata, `sitemap.xml`, `robots.txt`, structured data |
| Accessibility | Keyboard friendly, skip link, visible focus rings, WCAG AA contrast in both themes; respects "reduce motion" and "reduce transparency" settings |

## Edit your content

Everything personal is in **`lib/site.js`** — name, links, projects, education, skills, hobbies.

- Add LinkedIn: set the `url` of the LinkedIn entry in `socials` (it's hidden while empty).
- New resume: replace `public/resume/Pon_Sanmuga_Vishal_G_Resume.pdf` (keep the same file name).
- New photo: replace `public/images/vishal-cutout.webp` (transparent background works best).
- Hero words, intro sentence and the floating chips: `heroWords`, `heroIntro`, `heroChips` in `site`.
- The stats strip under the hero is built automatically from your facts (number of projects, degree, languages).

## Change the colours

All colours live at the top of **`app/globals.css`**:

- `:root, [data-theme="light"] { … }` — the light theme (the default)
- `[data-theme="dark"] { … }` — the dark theme

The most useful ones:

| Variable | What it colours |
| --- | --- |
| `--page` | page background |
| `--fg`, `--muted` | main text, secondary text |
| `--accent`, `--accent-2` | links, icons, highlights |
| `--btn-from`, `--btn-to` | the blue → violet gradient on the main buttons |
| `--glass-top`, `--glass-bottom` | how see-through the glass cards are |
| `--aurora-1/2/3` | the three background glow colours |
| `--viz-*` | colours inside the project illustrations |

If you change `--page`, also update the same colour in `lib/theme.js` (used for the phone's address-bar colour).
Motion timings (easing, durations, hover lift) are in `lib/motion.js`.

## Deploy (replace the current site)

### 1. Put the code in your GitHub repo

Your current site is the repo `ponsanmugavishal/portfolio`. Replace its files with this project:

```bash
git clone https://github.com/ponsanmugavishal/portfolio.git
cd portfolio
git rm -r -q .                 # remove the old site files (they stay in git history)
# copy everything from this folder into here (NOT node_modules or .next)
git add .
git commit -m "New Next.js portfolio"
git push
```

No Git on your computer? Open the repo on github.com → **Add file → Upload files**, and drag in the contents of this folder.

### 2. Get a Resend API key (for the contact form)

1. Sign up at **https://resend.com** using **ponsanmugavishalgowri@gmail.com** (must be the same email that receives messages).
2. Go to **API Keys → Create API key** (permission: *Sending access*) and copy it.

### 3. Set up Vercel

In https://vercel.com → your **portfolio** project:

1. **Settings → Environment Variables**, add:
   - `RESEND_API_KEY` = the key from Resend
   - `CONTACT_TO_EMAIL` = `ponsanmugavishalgowri@gmail.com`
   - *(optional)* `GITHUB_TOKEN` = a GitHub token with no scopes (only needed if the repos section stops loading)
2. **Settings → Build and Deployment → Framework Preset**: make sure it says **Next.js**, and turn off any *Override* for Build Command / Output Directory left from the old site.
3. **Analytics tab → Enable** Web Analytics.
4. **Deployments → ⋯ → Redeploy** (needed once so the new environment variables are used).

Every `git push` after this deploys automatically.

## Run it on your computer (optional)

Needs Node.js 20+.

```bash
npm install
cp .env.example .env.local   # then paste your Resend key into .env.local
npm run dev                  # open http://localhost:3000
```

## Project structure

```
app/
  page.js               the page (sections + live GitHub data)
  layout.js             fonts, SEO metadata, analytics, aurora, skip link
  globals.css           colours for both themes, glass styles, animations
  api/contact/route.js  contact-form backend (Resend)
  opengraph-image.js    link-preview image
components/
  Hero, About, Skills, Projects, GitHubRepos, Education, Contact, Footer
  Navbar                floating glass navbar + mobile menu
  Glass                 reusable glass surface
  ThemeToggle           sun/moon button
  CommandPalette        Ctrl/⌘ + K quick menu
  SmoothScroll          Lenis smooth scrolling + section links
  Aurora                background glow
  visuals/              animated project illustrations (SVG)
lib/
  site.js               ← all your content
  github.js             GitHub API fetch (hourly refresh)
  motion.js             shared animation settings
  theme.js              address-bar colour per theme
public/                 photo + resume PDF
```
