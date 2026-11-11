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
| repo root (`index.html`, `team/`, `demo/`, `css/`, `fonts/`, `image/`, `plugins/`) | https://iht.tools/ | main site; `demo/` only redirects to `/wellnesswallet/` |
| `dashboard/` | https://iht.tools/dashboard/ | clinic-side mock-up; formerly `chriscrutt/iht-dashboard` at dashboard.iht.tools |
| `wellnesswallet/` (landing page, `fallPrevention/`, `PHQ9/`, `submitted/`) | https://iht.tools/wellnesswallet/ | patient demo; formerly `chriscrutt/iht-demo` (branch `noFhir`) at wellnesswallet.iht.tools |

All 7 pages share one stylesheet, `css/theme.css` at the repo root, and the two typefaces it uses, in `fonts/`. (`demo/` was an older copy of the fall quiz; since 2026-11-10 it's a page that sends visitors on to `/wellnesswallet/`.) The dashboard also uses the main site's phone menu, `plugins/menu/menu.js`. Apart from those, each site is self-contained: the main site has its `image/`; `wellnesswallet/` has its own `css/template.css`, `image/`, `video/` and `plugins/sweetalert/`; and `dashboard/` is just `index.html`, `script.js`, `style.css` and its icons (`favicon.ico`, `favicon.svg`, `apple-touch-icon.png`).

The dashboard was rebuilt on 2026-11-10 as a sidebar app. `dashboard/index.html` holds only the shell, and `dashboard/script.js` draws everything from made-up sample data:
- The programs are listed down the left (a picker below 992px), and one view shows at a time, chosen by the address's `#name`: `#overview` (or no `#name`), `#phq-9`, `#breast-cancer-screening` and `#fall-prevention`. The six other programs are listed dimmed. Each view's own `id` is `view-` plus its name, so the browser finds nothing to jump to and the script does the scrolling.
- It's laid out for real numbers, and it shows no patients at all. The owner's point: a real program has around 100,000 patients, so a list of them is no use, even 25 to a page, and neither is a handful ("the 8 highest-scoring of 23,456"). Don't bring back a patient list, long or short, or a patient search. A program's view has:
  - its totals, and its results as bars
  - "By clinic": the Actionable count at each clinic, and its share of that clinic's responses
  - how patients answered each question, as strips
  - "Download responses", across from its title: the only way to the patients themselves
- The sample is 29 made-up patients (the old dashboard's, with its placeholder dashes filled in) and six made-up clinics, and every view says "Sample data". The totals are the old mock-up's figures, not counts of the 29. The 29 appear only in the download: a real CSV file, with the patients who need follow-up first.
- No libraries: the charts are HTML bars and strips with their numbers as text beside them, and nothing in `script.js` is global. `style.css` also has print rules, so a printed view keeps its colours.
- `dashboard-options/` (PR #16) held three working layouts for the owner to choose from. The owner chose the sidebar one. The other two (one scrolling page, and a follow-up worklist) are in git history, in 2dda538.

## Editing rules
- Keep asset paths relative to the page's own folder.
  - Don't use root-absolute paths like `/css/...`.
  - Every page loads the theme by a relative path: `css/theme.css` from the home page, `../css/theme.css` from `team/`, `dashboard/` and `wellnesswallet/`, and `../../css/theme.css` from the Wellness Wallet's subpages. Each preloads the theme's two font files from `fonts/` the same way, and the dashboard also loads `../plugins/menu/menu.js`.
  - Don't load anything else from outside `dashboard/` or `wellnesswallet/`. A `../` into the main site is what broke the Wellness Wallet landing page when it moved (fixed in 4ad7460).
- Link to the sub-sites with a trailing slash: `/wellnesswallet/`, not `/wellnesswallet`.
- Keep changes small and test them locally before pushing to `master`. There's no staging site.
- Keep it light: the patients are older people, often on old phones and slow connections.
  - Nothing loads from another server: no CDN, no font service, no analytics. The owner had Google Analytics removed on 2026-11-11; its script was 177KB, more than the whole home page. Every extra server costs a slow phone a new connection, so keep it that way.
  - The fonts are in `fonts/`: the `latin` and `latin-ext` files that Google Fonts serves for Archivo and Atkinson Hyperlegible Next, with their licences (`OFL-*.txt`). `css/theme.css` has their `@font-face` rules, and every page preloads the two `latin` files, which are all the site's text needs today.
  - The dialogs' library, sweetalert 2.1.2, is in `wellnesswallet/plugins/sweetalert/` with its licence. The quizzes and the gift-card page are the only pages that load a script that isn't the site's own. No page uses jQuery.
  - The quiz videos have `preload="none"`, and the quiz's script sets it to `metadata` once the page has loaded. A video with no `preload` holds up its page's load event, which is what shows the first question. `#video1` has `aspect-ratio: 16 / 9`, so the screen doesn't shift when the video's size arrives.
  - What a first visit downloads, gzipped as GitHub Pages sends it: home 105KB, team 208KB, the dashboard 99KB, the Wellness Wallet's start page 92KB, a quiz 105KB before its video, the gift cards 209KB. Before 2026-11-11 those were 282, 386, 100, 404, 367 and 670KB. Measure before adding to a page.
- The theme applies only where a page opts in with a body class:
  - `<body class="iht">` on the site pages: home, team and the dashboard.
  - `<body class="iht iht--patient">` on the patient pages: the four Wellness Wallet pages.
  - Every rule in `css/theme.css` is scoped to one of those classes or to an `iht-` class. Keep it that way, with no bare `h1`, `.btn` or `*` rules: the patient pages still load what they use of the template's Bootstrap and `main.css` underneath (`wellnesswallet/css/template.css`).
- What goes where:
  - `css/theme.css` holds what pages share: the tokens (colours, fonts, sizes), the header, buttons, footers, and the quiz screens' type, answers, Go Back, Finish and dialogs. Its sections are listed at its top.
  - Page-specific CSS stays in the page: the dashboard's in `dashboard/style.css`, every other page's in its own `<style>` block.
  - `wellnesswallet/css/template.css` is what the four Wellness Wallet pages use of the template's Bootstrap and `main.css`: 13KB, cut from 489KB on 2026-11-11 with PurgeCSS, the rules unchanged and in their original order. Don't edit it. It isn't all of Bootstrap: a class no page used before (another column width, a spacing helper) isn't in it, so write that CSS in the page instead.
- Colours each mean one thing: IHT Blue is the brand and "go on", the red `--iht-followup` means a person needs follow-up, and the green `--iht-reward` means a reward or done.
  - The owner wants the site all light blue: the header and footers are IHT Blue (`#466eb6`), the charts run from pale blue to IHT Blue, and text is the neutral near-black `--iht-ink` (`#1f2328`). Don't bring back navy (the old `#1c2d50`).
  - Archivo (titles and figures) is used at its normal width. The owner found the Expanded and Semi-expanded cuts too stretched, so the theme no longer loads them.
- Pictures must need no credit. The illustrations are from unDraw (https://undraw.co/license: free, no attribution), with their accent recoloured to IHT Blue; each SVG says so in a comment at its top, along with any other change.
  - The site is for older patients, so the people who stand for patients are drawn older: the home banner's walker and the start page's gift-card woman have grey or white hair and round glasses. unDraw has almost no older people, so a new picture of a patient needs the same change. The nurses and the "Request a Demo" picture show staff and clinics, and are unchanged. The old Freepik art, which needed a credit, was removed on 2026-11-10. The team photos are the team's own.
- Icons and link previews:
  - The favicon is "IHT" in white bars on a rounded IHT blue square. `image/favicon.svg` is its source, drawn on a 64 grid so its edges fall on whole pixels at 32px.
  - `favicon.ico` holds 16, 32 and 48px renders of it. `apple-touch-icon.png` (180px, full-bleed, since iOS rounds the corners) comes from `_design/apple-touch-icon.svg`.
  - Each site keeps its own copies: `image/`, `dashboard/` and `wellnesswallet/image/`. There are also copies of the ICO and the touch icon at the root, where browsers and apps look by default. Change one, change them all.
  - Every page has Open Graph tags (`og:title`, `og:description`, `og:url`, `og:image`) and `twitter:card`, which give a shared link its preview card in texts and chats. `og:image` and `og:url` must be absolute `https://iht.tools/...` URLs, the one exception to relative paths.
  - Home, team and the dashboard use `image/og-image.png`; the Wellness Wallet pages use `wellnesswallet/image/og-image.png`.
  - Both images are 1200x630, rendered in Chromium from `_design/og-image.html` and `_design/og-wellnesswallet.html` once the fonts have loaded. Jekyll doesn't publish `_design/`, because its name starts with `_`.
  - Messaging apps cache previews, so a changed image can take days to show. Renaming the file makes it show sooner.
- The home page's figures ("Why check in early" and "Rewards get people to show up") each link to their source, and the wording follows the source: CDC's falls facts, WHO's fact sheet on older adults' mental health, Health Affairs 2018 (Borsky and others, 2015 data) and PLOS ONE 2014 (Giles and others, relative risk 1.92 for vaccination or screening). Don't add a figure without a source, and don't round past what the source says. The team page's intro uses only what the bios say.
- Accessibility: the site was brought to WCAG 2.2 AA on 2026-11-10 (axe-core finds nothing, and every flow works from the keyboard). Keep it there:
  - Controls are real `<button>`s and links with an `href`, never `div`s with `onclick`. Inside a quiz's `<form>`, every button that isn't Continue needs `type="button"`, or it submits the form.
  - Don't give an element an `id` that an inline `onclick` calls by the same name inside a form: there `prevAnswer()` meant Go Back's button (`id="prevAnswer"`), not the function. Go Back's click is wired in the script for that reason.
  - Each new quiz screen takes focus (`focusOn()`): the question (`#question`), the video's heading, then "Remember:" or PHQ-9's `#crisisHelp`. Elements focused that way have `tabindex="-1"` and no ring (theme.css).
  - After every `swal()` call, call the page's `nameDialog()`: it names the dialog and moves focus into it. theme.css hides a closed sweetalert dialog, so Tab and screen readers can't reach it.
  - The gift cards have `aria-label`s and `aria-pressed`.
  - On the dashboard, the sidebar link of the view that's showing carries `aria-current="page"`, and a newly chosen view starts at its top with focus on its title. The bars and strips are `aria-hidden`: their numbers are text beside them (hidden text where a strip's shares are written inside it). The bars grow in once as they come into view, only when the device allows motion.
  - It was checked again on 2026-11-11, with checks axe can't make. At 320px wide nothing scrolls sideways (reflow, 1.4.10). Every control Tab reaches shows a ring and isn't hidden behind the header (2.4.7, 2.4.11). With a reader's own wider text spacing forced on, nothing is cut off (1.4.12), but for the quiz footer on very narrow windows (see Open items). That pass led to three rules:
    - Text that can't wrap is sized to fit, and must break rather than be cut off if a reader's letter spacing makes it wider than its room all the same: "Remember:" (its box and `overflow-wrap` in `theme.css`), the start page's greeting (`overflow-wrap` in the stacked layout) and its slogan (each phrase an `inline-block`, not `nowrap`). Don't put `white-space: nowrap` on text without a fallback like these.
    - On the pages with the sticky header, every control has a `scroll-margin-top` of the header's height (`theme.css`: links, buttons, `select`, fields, anything with a `tabindex`), so Tab and Shift+Tab never leave the focused one under the bar. A new kind of control goes in that list.
    - In Windows' high-contrast mode the dashboard's bars, strips and keys keep their colours (`forced-color-adjust: none`), since they're nothing but background colour.
  - The home page's motion is started by its inline script, only when the device allows motion.
    - The phone preview loops for 14 seconds: text message, two questions, thank-you. The matching "How it works" step lights up as it plays. It has a Pause button (WCAG 2.2.2 requires one for motion over 5 seconds), and it holds still while off screen. Its play state is on the `.iht-how` section.
    - Once each, as they come into view: the figures count up, and the lines above them draw in. (A bar chart of the 1.9× finding was tried and dropped: the owner found it overkill for two numbers.)
    - The large numbers are `aria-hidden`; the sentences carry the numbers for screen readers.
    - Hover feedback (buttons lift, feature rows deepen) is for a mouse only.
  - Home alternates full-width bands (`.iht-band--mist`, `.iht-band--blue`) so neighbouring sections read as separate, and section headings are IHT blue.
  - Every page has a `<main>` and its own `<title>`. The quiz videos have English captions (`wellnesswallet/video/*.vtt`, on by default), made with Whisper on this machine and checked by reading; if a video changes, its captions must change with it.
- The header's height is the token `--iht-header-h`: 72px on desktop and 64px below 992px at the default font. It grows with a larger font, but only up to a cap. Anything that must clear the header reads the token, so don't write a header height into a page.
  - The site pages' header is sticky. Its phone layout starts below 992px (`max-width: 991.98px`), and `plugins/menu/menu.js` uses the same query, so change both together. The page layouts switch at `em` widths instead, so a larger default font gets the one-column layout sooner.
  - The patient header is laid over the page: `position: absolute` below 992px, `fixed` from 992px. The start page's stacked layout (below 992px, or a portrait window) puts it back in the flow with `position: relative`.
- Each Wellness Wallet page keeps its layout fixes at the end of its own `<style>` block. Its media queries for phones, tablets and zoomed windows don't match the five desktop window sizes (1280x800, 1366x768, 1440x900, 1536x864, 1920x1080). On every page, though, the rules outside any media query apply on desktop, and so do the quizzes' `(min-width: 992px)` query and the start page's wide-window queries: `(min-width: 1200px)`, the slogan's `(min-width: 64em)` and `min-aspect-ratio`.
  - The start page's desktop type is sized in `vh`, so it follows the window's height.
  - On the quizzes, each screen is at least one window tall and grows, so the page scrolls, when its content doesn't fit. Two equal empty flex items, `.testFhir::before` and `::after`, leave room for the header and Go Back. They're sized by the `--room` variables, which read `--iht-header-h` and Go Back's height. Content clears the header when scrolled to the top, and Go Back when scrolled to the bottom. The end screen has its own spacers.
  - Go Back and the quiz footer sit at the foot of the quiz (`.testFhir`), not fixed to the window. When a screen fits, that's the bottom of the window. When it's taller, they wait below its last button, so they never cover it.
  - Go Back starts hidden and ignores clicks while it's transparent. It's drawn on top of the footer, and the footer on top of the answers.
  - Continue on the video screen asks "Resume Video?" until 90% of the video has been seen (`WATCHED_ENOUGH`, a little slack the owner asked for). `watchedFraction()` counts the parts actually played (the video's `played` ranges), and once the video has reached its end it counts as finished for good. Watching to the end and starting again used to bring the prompt back, because the old check only looked at where the video was at that moment.
  - Anything added to a screen can make it scroll, or push Finish toward Go Back, so measure at the sizes and fonts listed under "Test locally".

## Test locally
1. From the repo root, run `python3 -m http.server 8000` (`py -m http.server 8000` on Windows). Serving from the root reproduces the paths GitHub Pages uses.
2. Open these pages under http://localhost:8000:
   - `/`, `/team/` and `/dashboard/` (its overview and each program's view: `#phq-9`, `#breast-cancer-screening`, `#fall-prevention`), plus the phone-width menu on `/`, `/team/` and `/dashboard/` (and `/demo/`, which should land on `/wellnesswallet/`)
   - `/wellnesswallet/` and its `fallPrevention/`, `PHQ9/` and `submitted/` pages
3. Try them at these window sizes:
   - laptops and desktops: 1280x800, 1366x768, 1440x900, 1536x864 and 1920x1080, plus the windows real laptops show, such as 1366x657, 1440x789 and 1920x969
   - phones: 360x740, 375x667, 390x844, 412x915 and 430x932, and a phone on its side (844x390)
   - tablets: 768x1024 and 1024x768
   - 1280x800 and 1366x768 zoomed to 125% and 150%
4. Also try a larger default font of 20, 24 and 32px, and reduced motion. Chrome's "Large" font size is 20px and "Very large" is 24px; Firefox's font settings go higher.
5. Check that nothing scrolls sideways, no text is cut off or under the header, Go Back never covers an answer, Continue or Finish, and the dialogs fit the window.
6. Check accessibility: run axe-core (its WCAG 2.0–2.2 A and AA rules) on each page and on the in-between states (the video and end screens, each dialog, PHQ-9's question 9, and each dashboard view), and go through every flow with the keyboard alone: Tab, Enter, Space and Escape. Then the checks axe can't make: at 320px wide nothing scrolls sideways; with WCAG's text spacing forced on (line height 1.5, letter spacing 0.12em, word spacing 0.16em, paragraph spacing 2em) nothing is cut off; and nothing with focus is hidden behind the header, tabbing forwards and backwards.

Nothing loads from another server, so the pages work offline.

On Windows, several `http.server` processes can listen on the same port at once, and a test can then get another copy's files. Give each test server its own port.

Don't confirm the "Submitted!" box on `wellnesswallet/submitted/`: it leaves for prospectmedical.com.

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
- PR #4 (branch `refresh-look`) gave all 8 pages one look from a shared stylesheet, `css/theme.css`: a blue IHT header, Archivo for titles, Atkinson Hyperlegible Next for reading, and a few colours that each mean one thing. The patient pages keep their large print and now also fit larger default fonts and short windows: the header no longer spills, Go Back no longer covers a button, and the dialogs fit. The dashboard got a phone layout, and the wording changed in only a few places: a team bio and heading, the dashboard's colons, image descriptions, illustration credits and a skip link.
- PR #5 (branch `ada-pass`, 2026-11-10) followed the owner's feedback on PR #4 and asked for the site to be ADA compliant:
  - Archivo at its normal width (the wide cuts looked stretched), and an all light-blue palette: blue footers, a pale-to-IHT-blue chart ramp, neutral text, no navy.
  - unDraw illustrations that need no credit in place of the Freepik ones, so the footers lost the credit.
  - `demo/` redirects to `/wellnesswallet/`. It was a rough copy of the fall quiz, and it started its Vimeo video as soon as the page loaded, before its video screen.
  - A WCAG 2.2 AA pass: real buttons and links in the quizzes, gift cards and Patient List; focus moved to each new quiz screen; named dialogs; captions for both quiz videos; chart descriptions; page titles; `<main>` landmarks.
- PRs #16 and #17 (2026-11-10) rebuilt the dashboard. The owner didn't like its layout (main tabs, sub-tabs, donut charts, and a pop-up before each Patient List) and asked for a drastic change, so #16 put three working layouts at `/dashboard-options/` to choose from. The owner chose the sidebar one, and pointed out that a real patient list would be around 100,000 people. #17 made it `/dashboard/` and removed the options. Its first draft kept a table of the 8 patients to follow up first, with a patient search; the owner saw no point in showing any patients, so it shows none, and "By clinic" and the answers are where the list was (see Layout).
- PR #18 (2026-11-11) made the site lighter and re-checked its accessibility, at the owner's request ("so it can load up on these old people's computers/phones quickly").
  - Removed: Google Analytics (177KB on every page but the dashboard), jQuery, the template's script bundle (436KB, on the start page), its AOS plugin, and every template file and picture no page used.
  - Now served from the site: the two typefaces (`fonts/`) and sweetalert 2.1.2. No page asks another server for anything.
  - The template's CSS on the patient pages went from 489KB to 13KB (`wellnesswallet/css/template.css`). The quiz videos no longer load before their page. The Walgreens and Target logos were re-saved at 67KB and 27KB (from 193KB and 106KB).
  - Checked by comparing the old site and the new one: 248 screenshots (every page and in-between state at eleven window, font and screen settings) were identical pixel for pixel, the logos aside, and so was every element's computed style, but for the changes meant.
  - The accessibility pass found and fixed text that was cut off under a reader's wider text spacing ("Remember:", the start page's greeting and slogan) and the dashboard's picker ending up under the header on a 400% zoom. See the accessibility rules above.

## Open items
1. Accessibility beyond what the checks cover:
   - No one has tried the site with a real screen reader (NVDA, JAWS or VoiceOver) yet. axe-core and the keyboard checks pass; a screen-reader pass is the next step for a formal audit.
   - The captions were made by machine (Whisper) and checked by reading, not by watching with the sound on. Someone should watch both videos once with captions on. Neither video has audio description, and neither seems to need it: in frames taken every 6 to 8 seconds (2026-11-11), everything written on screen (the six steps, "every 13 seconds", the parts of the brain) is also said, and the pictures only illustrate the words.
   - With a reader's own wider text spacing forced on (WCAG 1.4.12), the quizzes' footer, the company's name on one line, is cut off at the right in a window under about 345px wide, or under about 430px with a default font of 20px or more. Letting it wrap would put it under Go Back, which sits just above it, so fixing it means rebuilding the foot of the quiz. Nothing else is cut off.
   - Both quiz videos carry another organisation's mark (the National Council on Aging's; NBC's). Whether the site may host copies of them is the owner's to confirm.
2. Small layout problems:
   - Go Back sits at the foot of the quiz, so on a screen taller than the window it can be below the fold, or cut off by the window's bottom edge, when the screen first appears. Examples are PHQ-9's question 8 at 1280x800 and most screens at the 125% and 150% zooms. It covers nothing, and scrolling brings it into view.
   - At 280px wide (a folding phone's cover screen), the quiz end screens used to be about 34px wider than the window. "Remember:" is now capped by the window's width, and with a 32px font the start page's "$10 gift card" wraps inside its box, but neither has been re-measured at 280px.
   - On phones the quiz end screens are sized by the width, so apart from Finish they don't grow when the browser's font size is raised. The questions and answers do.
3. Decided to leave as they are on 2026-11-05:
   - The Wellness Wallet stores nothing: quiz answers only go to the browser console.
   - The start page greets everyone as "Hello Christopher!".
   - `submitted/` ends on prospectmedical.com.
4. Smaller:
   - Check the home page's figures once a year (next: November 2027). CDC updates its falls pages; the Health Affairs figure is from 2015 data, so a newer study may replace it.
   - The dashboard's numbers are made up, and its totals aren't counts of its 29 sample patients. The same 29 are in all three programs' downloads, so the breast cancer screening file includes men and people under 40.
   - Rite Aid, one of the gift-card choices, closed in 2025.
   - PHQ-9's first question is drawn at 2em when the page loads, but at 1.8em when Go Back returns to it, because the static markup lacks the inline size that `renderQuestion()` sets.
   - Older browsers get a plainer version of a few details:
     - Without `:has()` (Firefox before 121, Safari before 15.4), Go Back stays centred on the end screen instead of lining up under Finish, and Request a Demo jumps instead of scrolling smoothly.
     - Without container queries (Chrome before 105, Safari before 16, Firefox before 110), the dashboard's bars don't restack on a narrow phone set to a large font, and the home page's title isn't capped by its column.
     - Without `zoom` (Firefox before 126), the dialogs' icon doesn't shrink on short windows.
   - Playwright's WebKit on Windows doesn't apply variable-font axes, so there Archivo and Atkinson Hyperlegible Next show at their regular weight. Judge type in Chromium or Firefox, or in real Safari. On the quiz pages it also reports a `Temporal.Duration` error from its own video controls, and leaves the captions off; neither comes from the site.
   - The quizzes carried a 2023 to-do list in an HTML comment, taken out on 2026-11-11. Its one idea never built was a progress bar.
5. Left from the last review of PR #4, all minor:
   - Look: "Resume Video?" takes two lines from 1440x900 up, as on master. The site buttons' base size (17px, 48px tall) isn't the 18px and 52px the pages use. On desktop the quiz end screen's column doesn't line up with the header, as on master.
   - Large fonts: the patient footers stop at 20px. At 32px the menu's × is clipped at 280 and 320px wide, the dashboard's skip link runs below the bar, and "Resume Video?" is taller than a 280 or 320px window (as on master).
   - Code: three pages repeat the sticky-footer body rule.
