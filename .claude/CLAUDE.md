# iht.tools

A static site for IHT plus two demo apps, all served by GitHub Pages from this repo (`chriscrutt/iht`).

## How it's served
- GitHub Pages uses "Deploy from a branch" with `master` at the repo root. There's no build step, no Actions workflow and no `_config.yml`.
- Pushing to `master` deploys. The Pages build takes a minute or two.
- Pages runs Jekyll with default settings, so files and folders starting with `.` or `_` aren't published, and that includes this file. No page has front matter, so everything else is copied as-is.
- The root `CNAME` sets the domain (`iht.tools`). GitHub Pages ignores CNAME files in subfolders.
- `iht.tools` is verified for the `chriscrutt` account (GitHub Settings → Pages → Verified domains), so no other account can claim it or its immediate subdomains (`www`, `dashboard`, …) on GitHub Pages.
- DNS is at Squarespace Domains (formerly Google Domains):
  - four `@` A records point at GitHub Pages
  - `www` is a CNAME to `chriscrutt.github.io`, so GitHub redirects `www.iht.tools` to `iht.tools` (over HTTPS too, once its certificate covers `www`; see Open items)
  - the `_github-pages-challenge-chriscrutt` TXT record keeps the domain verified; leave it in place
  - the MX, SPF and DKIM (`google._domainkey`) records are Google Workspace mail, and the two `gv-…googlehosted.com` CNAMEs are Google's own domain verification; leave all of them alone
- The repo must stay public, because GitHub Free can't serve Pages from a private repo.

## Layout
| Folder | Live at | Notes |
| --- | --- | --- |
| repo root (`index.html`, `team/`, `demo/`, `css/`, `js/`, `image/`, `plugins/`) | https://iht.tools/ | main site |
| `dashboard/` | https://iht.tools/dashboard/ | clinic-side mock-up; formerly `chriscrutt/iht-dashboard` at dashboard.iht.tools |
| `wellnesswallet/` (landing page, `fallPrevention/`, `PHQ9/`, `submitted/`) | https://iht.tools/wellnesswallet/ | patient demo; formerly `chriscrutt/iht-demo` (branch `noFhir`) at wellnesswallet.iht.tools |

Each site is self-contained. The main site and `wellnesswallet/` each have their own `css/`, `js/`, `image/` and `plugins/`. `dashboard/` is just four files: `index.html`, `script.js`, `style.css` and `favicon.png`.

## Editing rules
- Keep asset paths relative to the page's own site folder.
  - Don't use root-absolute paths like `/css/...`.
  - Don't use a `../` that climbs out of `dashboard/` or `wellnesswallet/` into the main site. That's what broke the Wellness Wallet landing page when it moved (fixed in 4ad7460).
- Link to the sub-sites with a trailing slash: `/wellnesswallet/`, not `/wellnesswallet`.
- Keep changes small and test them locally before pushing to `master`. There's no staging site.
- The Wellness Wallet question and end screens are exactly one window tall and can't scroll. Anything added to them can push answers or the Finish button off screen or under the fixed Go Back button, so measure at common laptop sizes.

## Test locally
1. From the repo root, run `python3 -m http.server 8000` (`py -m http.server 8000` on Windows). Serving from the root reproduces the paths GitHub Pages uses.
2. Open these pages under http://localhost:8000:
   - `/`, `/team/` and `/demo/`, plus the phone-width menu on `/` and `/team/`
   - `/dashboard/`
   - `/wellnesswallet/` and its `fallPrevention/`, `PHQ9/` and `submitted/` pages

Some libraries load from public CDNs, so you need to be online.

On Windows, several `http.server` processes can listen on the same port at once, and a test can then get another copy's files. Give each test server its own port.

Don't press Submit on `demo/`: it sends the answers to the public HAPI test server. Don't confirm the "Submitted!" box on `wellnesswallet/submitted/`: it leaves for prospectmedical.com.

## History
- iht started on 2023-04-12 as the company site, built from a website template.
- `chriscrutt/iht-demo` began as a copy of this repo. It shares the first 34 commits, up to 7174f45 "ajax" (2023-04-20), and then became the Wellness Wallet. Its branches:
  - `master` is the version that saved answers to the public HAPI FHIR test server. Tag `wellnesswallet-fhir`.
  - `noFhir` is what served wellnesswallet.iht.tools. Tag `wellnesswallet-nofhir`.
  - `main` is the same 2-commit placeholder as this repo's `main`.
- `chriscrutt/iht-dashboard` (July 2023) was separate. Its `main` is tag `dashboard-original`.
- The experiment files listed in `.gitignore` and `wellnesswallet/.gitignore` are from April 2023:
  - The first FHIR attempt used Azure API for FHIR (a server named `ogfiretest`). `server.js` got access tokens for it with an Entra ID client secret, and `testAzure.html` and `chatGPT.html` were its test pages. They were committed on 2023-04-17 and deleted the next day, when the work moved to the public hapi.fhir.org test server, which needs no login.
  - `server.js` (c465f12, 2d9a32f) and `testAzure.html` (c465f12) still hold that secret in the public history, along with their copies under `wellnesswallet/`. It's dead: on 2026-11-05 Microsoft reported the tenant (185231c3-f035-41fb-bbec-bfc5ae2df5c0) as not found, and `ogfiretest.azurehealthcareapis.com` no longer resolves. Rewriting history wouldn't add anything.
  - `test.html`, a quiz test, was committed for six minutes on 2023-04-20.
  - `test.http`, `test.zip` and `fallPrevention/indexFhir.html` never reached git.
  - Everything that was committed in either old repo is in this repo.

## Background (November 2026)
- On 2026-11-05 the dashboard and Wellness Wallet were merged in with full history. PR #1 (merge commit 38509c5) did this.
  - Each repo was rewritten into its folder with `git filter-repo`, then merged with `--allow-unrelated-histories`.
  - `git log -- dashboard/` and `git log -- wellnesswallet/` show their old commits.
  - A Claude Code agent compared all 8 pages against the original sites with Playwright. It fixed one break caused by the move (4ad7460) and two favicon paths that were already broken (c883074, 5971473). The live pages then matched the old subdomains.
- The goal was one repo while staying on GitHub Pages. A Pages site can only have one custom domain, so the subdomains became paths.
- The old subdomains were retired the same day. The DNS records for dashboard.iht.tools and wellnesswallet.iht.tools were deleted, Pages was turned off in both old repos, and the repos were made private. Old links to those subdomains no longer work.
- PR #2 (branch `fix-old-bugs`) fixed bugs that were already on the original sites:
  - the mobile menu (`plugins/menu/menu.js` had never been committed)
  - dead script tags
  - the Wellness Wallet start page's hapi.fhir.org lookup, which was a script-injection hole
  - small Wellness Wallet and dashboard fixes
  - crisis information on PHQ-9 question 9
  - a double-click on a quiz answer no longer skips the next question

## Open items
1. Delete `chriscrutt/iht-demo` and `chriscrutt/iht-dashboard`. They're private, and everything in them is in this repo and its tags. A deleted repo can be restored for 90 days.
2. Check that GitHub's certificate covers `www.iht.tools` (Settings → Pages), then that `https://www.iht.tools/` redirects to `https://iht.tools/`. On 2026-11-05 GitHub was still issuing it. If it stays stuck, remove `iht.tools` as the custom domain and add it back, which briefly interrupts HTTPS.
3. Fix the Wellness Wallet layout bugs, which were already on the old site:
   - On most phones the start page's "Get Started" sits below the screen, and the page can't scroll.
   - `submitted/` scrolls sideways on phones.
   - The quiz screens don't fit on phones or at 1024×768, or when zoomed. On those sizes Finish can sit below a window that can't scroll.
   - The fixed Go Back button covers some answers. It covers PHQ-9's 911 link at 360px wide, and "Finish" on the fall quiz at laptop sizes.
   - The quiz answers and Go Back are `div`s, so they can't be reached from the keyboard.
4. Decided to leave as they are on 2026-11-05:
   - `demo/` still POSTs its quiz answers to the public HAPI test server, under test patient 22, when someone presses Submit.
   - The Wellness Wallet stores nothing: quiz answers only go to the browser console.
   - The start page greets everyone as "Hello Christopher!".
   - `submitted/` ends on prospectmedical.com.
5. Smaller:
   - Unpinned CDN libraries: `chart.js` and `sweetalert2@11` on the dashboard, and `sweetalert` on the Wellness Wallet.
   - Google Analytics is split: the Wellness Wallet start page reports to G-BTYQ6V2CCM and its subpages to G-VMM3KZFGGE.
   - The dashboard's data and its Download button are fake.
   - Rite Aid, one of the gift-card choices, closed in 2025.
   - `css/main.css` has a 991–992px breakpoint gap, so at some zoom levels neither the mobile nor the desktop header applies.
