# iht.tools

A static site for IHT plus two demo apps, all served by GitHub Pages from this repo (`chriscrutt/iht`).

## How it's served
- GitHub Pages uses "Deploy from a branch" with `master` at the repo root. There's no build step, no Actions workflow and no `_config.yml`.
- Pushing to `master` deploys. The Pages build takes a minute or two.
- Pages runs Jekyll with default settings, so files and folders starting with `.` or `_` aren't published, and that includes this file. No page has front matter, so everything else is copied as-is.
- The root `CNAME` sets the domain (`iht.tools`). GitHub Pages ignores CNAME files in subfolders.
- The repo must stay public, because GitHub Free can't serve Pages from a private repo.

## Layout
| Folder | Live at | Notes |
| --- | --- | --- |
| repo root (`index.html`, `team/`, `demo/`, `css/`, `js/`, `image/`, `plugins/`) | https://iht.tools/ | main site |
| `dashboard/` | https://iht.tools/dashboard/ | formerly `chriscrutt/iht-dashboard` at dashboard.iht.tools |
| `wellnesswallet/` (landing page, `fallPrevention/`, `PHQ9/`, `submitted/`) | https://iht.tools/wellnesswallet/ | formerly `chriscrutt/iht-demo` (branch `noFhir`) at wellnesswallet.iht.tools |

Each folder is a self-contained site with its own `css/`, `js/`, `image/` and `plugins/`.

## Editing rules
- Keep asset paths relative to the page's own site folder.
  - Don't use root-absolute paths like `/css/...`.
  - Don't use a `../` that climbs out of `dashboard/` or `wellnesswallet/` into the main site. That's what broke the Wellness Wallet landing page when it moved (fixed in 4ad7460).
- Link to the sub-sites with a trailing slash: `/wellnesswallet/`, not `/wellnesswallet`.
- Keep changes small and test them locally before pushing to `master`. There's no staging site.

## Test locally
1. From the repo root, run `python3 -m http.server 8000`. Serving from the root reproduces the paths GitHub Pages uses.
2. Open these pages under http://localhost:8000:
   - `/`, `/team/` and `/demo/`
   - `/dashboard/`
   - `/wellnesswallet/` and its `fallPrevention/`, `PHQ9/` and `submitted/` pages

Some libraries load from public CDNs, so you need to be online.

## Background (November 2026)
- The dashboard and Wellness Wallet used to be separate repos on their own subdomains. They were merged here on branch `combine-sites` with full history.
  - Each repo was rewritten into its folder with `git filter-repo`, then merged with `--allow-unrelated-histories`.
  - `git log -- dashboard/` and `git log -- wellnesswallet/` show their old commits.
- The goal was one repo while staying on GitHub Pages. A Pages site can only have one custom domain, so the subdomains became paths.
- A Claude Code agent tested all 8 pages and the main flows against the original sites with Playwright.
  - It found one break caused by the move and fixed it (4ad7460).
  - It also fixed two favicon paths that were already broken (c883074, 5971473).
  - The full test report is in PR #1: https://github.com/chriscrutt/iht/pull/1
- The old repos `chriscrutt/iht-dashboard` and `chriscrutt/iht-demo` were left untouched. They keep serving the old subdomains until they're retired.

## Open items
1. Merge PR #1 into `master`, then check https://iht.tools/dashboard/ and https://iht.tools/wellnesswallet/.
2. Retire the old subdomains. GitHub Pages can't redirect one domain to another.
   - If links to dashboard.iht.tools or wellnesswallet.iht.tools are still in use, keep the old repos up as small redirect pages. Each page should forward to the new path and keep the query string. That includes patient links with an ID in the query string.
   - Otherwise, remove the DNS records for those two subdomains first. Only after that, make the old repos private or delete them.
3. Verify `iht.tools` under GitHub Settings → Pages → Verified domains.
4. Fix the old bugs that were already on the original sites:
   - `plugins/menu/menu.js` is referenced but was never committed. Because of that, the mobile menu button does nothing on the main site and the Wellness Wallet, and "Our Team" can't be reached on phones.
   - `js/vendor.min.js` and `js/custom.js` return 404 on `demo/` and the three Wellness Wallet subpages. There are two ways to fix it:
     - Point the links at the real files. This worked in testing, and it swaps jQuery 3.6.0 for 3.5.1 on those pages.
     - Delete the links.
   - The Wellness Wallet demo stores nothing. The greeting looks the patient up on the public HAPI FHIR test server (hapi.fhir.org), and quiz answers only go to the browser console.
