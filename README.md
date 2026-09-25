# Pon Sanmuga Vishal G — Portfolio

Personal portfolio built with **Next.js 16**, **Tailwind CSS 4** and **Motion** (Framer Motion), made to deploy on **Vercel**.

**Live:** https://ponsanmugavishal.vercel.app

## What's inside

| Feature | How it works |
| --- | --- |
| Animated hero | Cut-out photo with mouse parallax, rotating text ring, floating skill chips, scroll effects |
| Projects | Stacking cards on scroll, 3D tilt, animated illustrations for each project |
| Live GitHub repos | Fetched on the server from the GitHub API, refreshed every hour automatically |
| Contact form | `POST /api/contact` → sends the message to your Gmail through **Resend**; *Reply* goes straight to the sender |
| Spam protection | Hidden honeypot field, minimum fill time, 5 messages / 10 min per IP, input validation |
| Resume download | `public/resume/Pon_Sanmuga_Vishal_G_Resume.pdf` |
| Visitor stats | **Vercel Web Analytics** (see visits, countries, devices in your Vercel dashboard) |
| Link previews | Auto-generated preview image when the link is shared on WhatsApp / LinkedIn |
| SEO | Page metadata, `sitemap.xml`, `robots.txt`, structured data |

## Edit your content

Everything personal is in **`lib/site.js`** — name, links, projects, education, skills, hobbies.

- Add LinkedIn: set the `url` of the LinkedIn entry in `socials` (it's hidden while empty).
- New resume: replace `public/resume/Pon_Sanmuga_Vishal_G_Resume.pdf` (keep the same file name).
- New photo: replace `public/images/vishal-cutout.webp` (transparent background works best).

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
  layout.js             fonts, SEO metadata, analytics
  api/contact/route.js  contact-form backend (Resend)
  opengraph-image.js    link-preview image
components/             Hero, About, Skills, Projects, GitHubRepos, Education, Contact, Footer
components/visuals/     animated project illustrations (SVG)
lib/site.js             ← all your content
lib/github.js           GitHub API fetch (hourly refresh)
public/                 photo + resume PDF
```
