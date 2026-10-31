# Deploying this site to GitHub Pages

This folder (`index.html`, `styles.css`, `script.js`) is already GitHub-Pages-ready as plain static files — no build step.

`master-cv.md` lists the GitHub username `arhamj951` — confirm this is still the account you want the site on before using it below.

## Option A — root user site (arhamj951.github.io)

This becomes your main URL with no sub-path: `https://arhamj951.github.io`

1. Create a new **empty** repo on GitHub named exactly `arhamj951.github.io` (replace with your real username if different).
2. From this folder:
   ```bash
   cd /Users/arhamjamshaid/Desktop/portfolio-site
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/arhamj951/arhamj951.github.io.git
   git push -u origin main
   ```
   When prompted for a password, paste your personal access token (PAT) — GitHub no longer accepts your account password over HTTPS git.
3. GitHub auto-publishes repos named `<username>.github.io` — no further settings needed. Give it 1-2 minutes, then visit `https://arhamj951.github.io`.

## Option B — project repo (e.g. github.com/arhamj951/portfolio)

URL becomes `https://arhamj951.github.io/portfolio`.

1. Create a new repo on GitHub, e.g. named `portfolio`.
2. Same push steps as above, but:
   ```bash
   git remote add origin https://github.com/arhamj951/portfolio.git
   git push -u origin main
   ```
3. On GitHub: repo → **Settings → Pages** → Source: `Deploy from a branch` → Branch: `main`, folder `/ (root)` → Save.
4. Wait 1-2 minutes, then visit the URL GitHub shows on that same Settings → Pages screen.

## Personal access token (PAT) scope

Create the token at **GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens**:
- Repository access: only the one repo you're pushing to (not "all repositories").
- Permissions needed: **Contents: Read and write**. Nothing else is required for a static Pages push.
- Set an expiration date — don't use "no expiration."

Use the token as the password when `git push` prompts for credentials (username = your GitHub username, password = the token).

## After it's live

- Update the `href="mailto:..."` and social links in `index.html` if any contact details change.
- Replace every `[NEED QUOTE]` placeholder in `index.html` (3 testimonial cards + 4 case-study quotes) with real client quotes once you have them — don't leave the bracketed text live on the public site.
- To push an update later: `git add -A && git commit -m "update" && git push`.
