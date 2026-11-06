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
  - `www` is a CNAME to `chriscrutt.github.io`, so GitHub redirects `www.iht.tools` to `iht.tools`
  - the `_github-pages-challenge-chriscrutt` TXT record keeps the domain verified; leave it in place
  - the MX, SPF and DKIM (`google._domainkey`) records are Google Workspace mail, and the two `gv-…googlehosted.com` CNAMEs are Google's own domain verification; leave all of them alone
- The owner looks after DNS, `www`, the custom domain and HTTPS (the certificate and "Enforce HTTPS"). Don't change those or the other Pages settings. If something there looks wrong, mention it and leave it.
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
- Each Wellness Wallet page keeps its layout fixes at the end of its own `<style>` block. Its media queries for phones, tablets and zoomed windows don't match the five desktop window sizes (1280x800, 1366x768, 1440x900, 1536x864, 1920x1080). On the quizzes, though, the `(min-width: 992px)` query and the rules outside any media query do apply on desktop. Leave `wellnesswallet/css/main.css` alone, since all four pages share it.
  - The start page's desktop type is sized in `vh`, so it follows the window's height.
  - On the quizzes, each screen is at least one window tall and grows, so the page scrolls, when its content doesn't fit. Two equal empty flex items, `.testFhir::before` and `::after` (sized by the `--room` variables), leave room for the 92px header and the fixed Go Back button: content clears the header when scrolled to the top, and Go Back when scrolled to the bottom. The end screen has its own spacers. At the desktop sizes, a question or video screen that fits sits exactly where it did before PR #3.
  - Go Back starts hidden and ignores clicks while it's transparent. It's drawn on top of the footer, and the footer on top of the answers.
  - Anything added to a screen can make it scroll, or push Finish toward Go Back, so measure at common phone and laptop sizes, and with a larger default font.

## Test locally
1. From the repo root, run `python3 -m http.server 8000` (`py -m http.server 8000` on Windows). Serving from the root reproduces the paths GitHub Pages uses.
2. Open these pages under http://localhost:8000:
   - `/`, `/team/` and `/demo/`, plus the phone-width menu on `/` and `/team/`
   - `/dashboard/`
   - `/wellnesswallet/` and its `fallPrevention/`, `PHQ9/` and `submitted/` pages
3. For the Wellness Wallet, also try a phone (390x844), 1024x768, a laptop window zoomed to 150%, and a larger browser font size (Chrome's "Very large" is 24px).

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
- The old subdomains were retired the same day. The DNS records for dashboard.iht.tools and wellnesswallet.iht.tools were deleted, Pages was turned off in both old repos, and the repos were made private. Old links to those subdomains no longer work. Both repos were deleted later that day; GitHub can usually restore a deleted repo for 90 days, until about 2027-02-03. Their branches live on here as tags, apart from iht-demo's `main`, which is the same as this repo's `main` (see History).
- PR #2 (branch `fix-old-bugs`) fixed bugs that were already on the original sites:
  - the mobile menu (`plugins/menu/menu.js` had never been committed)
  - dead script tags
  - the Wellness Wallet start page's hapi.fhir.org lookup, which was a script-injection hole
  - small Wellness Wallet and dashboard fixes
  - crisis information on PHQ-9 question 9
  - a double-click on a quiz answer no longer skips the next question
- PR #3 (branch `fix-ww-layout`) made the Wellness Wallet pages fit phones, tablets and zoomed laptop windows. Before, content there was cut off, covered or out of reach. At the five desktop window sizes the pages look as they did, except quiz screens that had something covered or cut off.
  - The five desktop sizes are browser viewports. A real 1366x768 laptop shows a viewport about 1366x657, so it gets the smaller-window quiz layout; that was tested too.

## Open items
1. The quiz answers, Go Back and Finish can't be reached from the keyboard: the answers and Go Back are `div`s, and Finish is an `<a>` with no `href`.
2. Small layout problems left after PR #3:
   - On very large or nearly square landscape windows (2560x1440, 1920x1200, 1100x1000), the start page's "Christopher!" runs under the gift-card picture. At 1200x600 the footer covers the bottom of the picture. Fixing these would change the desktop layout.
   - When a quiz screen taller than the window first appears, Go Back can sit over part of its lowest button until the page is scrolled.
   - At desktop sizes, on the PHQ-9 questions that scroll (6 to 8 at 1280x800, and 8 at 1366x768 and 1440x900), the last answer touches Go Back's border, by under 2px, at the bottom of the scroll.
   - At 280px wide (a folding phone's cover screen), the quiz end screens are about 23px wider than the window, so "Remember:" and the lines under it are cut off by up to 11px at both sides.
   - On phones the quiz questions, answers and end screens are sized by the width, so they hardly grow when the browser's font size is raised. The end-screen cap stops at 767px wide, so at 768x1024 with a 32px default font "Remember:" runs past the right edge, as it does on `master`.
   - The quiz and gift-card headers are a fixed 92px. With a 24px or larger default font, "IHT - Wellness Wallet" wraps and spills below the bar on phones, over the first line of content. At 32px on a 360px phone it covers the 988 link on PHQ-9's crisis end screen.
3. Decided to leave as they are on 2026-11-05:
   - `demo/` still POSTs its quiz answers to the public HAPI test server, under test patient 22, when someone presses Submit.
   - The Wellness Wallet stores nothing: quiz answers only go to the browser console.
   - The start page greets everyone as "Hello Christopher!".
   - `submitted/` ends on prospectmedical.com.
4. Smaller:
   - Unpinned CDN libraries: `chart.js` and `sweetalert2@11` on the dashboard, and `sweetalert` on the Wellness Wallet.
   - Google Analytics is split: the Wellness Wallet start page reports to G-BTYQ6V2CCM and its subpages to G-VMM3KZFGGE.
   - The dashboard's data and its Download button are fake.
   - Rite Aid, one of the gift-card choices, closed in 2025.
   - `css/main.css` has a 991–992px breakpoint gap, so at some zoom levels neither the mobile nor the desktop header applies.
   - PHQ-9's first question is drawn at 2em when the page loads, but at 1.8em when Go Back returns to it, because the static markup lacks the inline size that `renderQuestion()` sets.
