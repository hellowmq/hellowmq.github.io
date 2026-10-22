# DaftKen — personal portfolio

Live site: https://tech.wenmq.cn/

The homepage is hand-authored HTML, CSS and JavaScript. The current local redesign leads with the real DisplayDJ window, followed by PetApp, MCR scoring and FocusTrace. It links to the personal Blogger site for non-technical writing. The screenshot opens in a native dialog with Escape, backdrop dismissal and focus restoration; the former decorative particle field has been removed. Engineering notes reuse the hand-authored DisplayDJ reading template and shared `studio/note.css`. The index is at `notes/index.html`; DisplayDJ and the PetApp CSP/cross-device debugging case study have their own `notes/<slug>/index.html`, homepage links, RSS items and sitemap entries. Article HTML is the editable publication source; this change does not rerun or overwrite the historical AstroPaper build. Its versioned sources distinguish implementation from recorded hardware evidence.

The historical blog is statically generated from 36 original Markdown posts using an adaptation of [AstroPaper](https://github.com/satnaing/astro-paper); its MIT notice is in [ASTROPAPER-LICENSE](ASTROPAPER-LICENSE). New blog pages cover the original article, archive, tag and pagination URLs. No Node runtime is needed to serve the published files.

The published historical HTML is currently frozen. The 36 public Markdown
originals and their path/hash manifest are preserved in
[`maintenance/legacy-source`](maintenance/legacy-source/README.md). Current
checks and static packaging do not execute the legacy Hexo stack.

Both historical Hexo deployment configurations now set `deploy: false`.
The [retirement review](maintenance/legacy-source/retirement-review.md) records
the five removed legacy output files and the current source-branch safeguard.

## Develop and validate

```sh
python3 -m http.server 8765 --bind 127.0.0.1
python3 scripts/validate-site.py
```

Open http://127.0.0.1:8765. Check desktop and mobile layouts, Chinese/English switching and persistence, screenshot preview and focus restoration, keyboard focus, the archive and a few article pages. The validator checks local links, anchor targets, HTTPS URLs, size budgets, sharing assets and coverage of the historical routes. The October 2026 portfolio changes intentionally update the homepage; the validator keeps the published historical article/list and PetApp files byte-identical to `d1aab1c` after removing only the exact shared analytics script tag. Some older articles still contain third-party image URLs; their availability can change independently of this site.

### Automatic checks

The `Site checks` workflow runs on pushes to `master` and pull requests targeting
`master`. It runs the existing Python validator, verifies the recovered public
Markdown, compares two static package manifests, and checks the syntax of the
hand-authored `studio/*.js` files using Python 3.12 and Node 24. No npm packages,
Hexo commands, secrets, or write permissions are needed. A full-history checkout
is required because preservation checks read historical Git commits.

These are static content checks, not browser, hardware, or external-service
acceptance tests. Pages deployment remains separate: a check failure reports a
failure but does not block a direct push or the existing Pages deployment.
Repository rules and Pages settings are not changed by this workflow. Propose
site changes in a PR targeting `master` to see the result before publishing.

The legacy-isolation step scans active HTML/SVG references, JavaScript string
literals (including simple concatenation and encoded markers), CSS resource
URLs and JSON configuration for the five reserved legacy asset names. It also
checks the pinned `maintenance/hexo-deploy-retirement/v0.1.0` archive tag and its
two disabled deployment configurations. If `origin/hexo` exists, its configurations
must still match the reviewed hashes; the branch itself is optional. A missing or
moved archive tag fails validation. This bounded static guard does not prove arbitrary computed code
cannot reach an old URL. The five approved legacy files were removed on
2026-10-20; the check rejects their reintroduction as well as references to them.

### Offline static packaging

```sh
build_root="$(mktemp -d)"
python3 scripts/build-site.py --output "$build_root/site" --manifest "$build_root/site.json"
```

The command copies validated, tracked publication files to a new directory
outside the checkout. Add new site files to the Git index before packaging;
classify new top-level routes in the script before including them. Tooling,
maintenance snapshots and CI files are excluded from the artifact. The command
does not deploy or regenerate historical HTML from Markdown. See the recovered
source README for the remaining source-retirement steps.

## Publish

GitHub Pages serves the root of `master`. Commit focused changes, push normally, then verify the Pages build commit and the actual public site. `CNAME` remains `tech.wenmq.cn`. Do not run the legacy Hexo deployer over this branch.

## Legacy boundary

The `hexo` branch preserves the original blog source and dependencies. Its old dependency versions are **not fixed by this static-site release**. The homepage does not load those scripts. The historical blog pages are now AstroPaper-generated static HTML with the original publication dates and URLs. The approved 2026-10-20 governance sequence publishes the archive-based CI guard first, then changes the default branch to `master` while preserving `hexo` and its retirement tag. Pages continues to serve `master` root; the final Dependabot state must be verified after GitHub recalculates it.

The 2026-10-20 cleanup removed only the five approved legacy outputs listed in
the retirement review. Historical article/list pages, recovered Markdown, and
the active site assets are preserved. Its preceding Pages state is commit
`004d15a79e75d0ebe9ac532168233d6be371b9a8`; use a new revert commit and a new
deployment tag for rollback rather than rewriting history. The original
Markdown remains available in the `hexo` branch and the recovery snapshot.

## Languages

The homepage defaults to Simplified Chinese, including its static HTML fallback. The language button switches to English and remembers an explicit choice in localStorage. Storage is optional: blocked storage must not prevent switching. Language changes update document language, title, description, visible copy and accessible labels without changing the current page position or open image dialog. The about and 404 pages are Chinese-first and use the same shared style. The public analytics notice remains at `/about/#analytics`.

Translations live in `studio/i18n.js`; `data-i18n` and `data-i18n-aria` identify translated homepage content. Translation HTML is developer-authored only; never insert user content into this dictionary. The blog is Chinese-first and retains the dates and titles of the original posts.

## Visit statistics

All 101 static HTML pages load `/studio/analytics.js?v=1`. GA4 uses measurement ID `G-NK7HHE8WXB` on top-level `tech.wenmq.cn` pages only; local previews and embedded PetApp frames do not collect. The matching stream has enhanced measurement disabled. Normal page loads and Astro article route changes count once; hash/query-only changes do not. Page and referrer addresses exclude queries and fragments. No tool input is sent. Removing queries also means UTM campaign parameters are not collected by this setup. Google signals and ad personalization are disabled for this stream's site configuration. The public notice is on `/about/#analytics`.

The shared runtime is generated from private `tool-sites/src/analytics.mjs`, which also injects the calculator deployment. Keep both copies aligned. The calculator is published separately by tool-sites and shares this tech stream. Blogger retains its existing stream and settings in the same GA4 property; compare sites by hostname and stream, rather than interpreting separate stream sessions as one uninterrupted cross-site journey.

Release this change from an annotated `deploy/tech-analytics/v0.1.0` tag with a normal, atomic push of that tag and its commit to `master`. Future updates use new tags; do not move existing tags or run Hexo over the published branch.

## PetApp incident note (2026-10-17)

`notes/petapp-csp-cross-device/index.html` records the host CSP diagnosis, the self-contained bookmark trade-offs, independent Windows/Linux checks, production bookmark readback and the author’s separate-device confirmation. Its two screenshots come from the fresh, logged-out production verification run [38942221891](https://github.com/hellowmq/pet-apps/actions/runs/38942221891). The X response was HTTP 403 in that run; it is not presented as a logged-in X acceptance test. The underlying pet source is pinned to `6d4b3403f3b63da871c66f46282c6dc18de7442c`.

Keep the topic brief and Markdown authoring copy in the existing editorial workspace; the published canonical belongs to this TECH site. For subsequent notes, reuse the note shell/styles, add the entry to `/notes/`, the homepage (including translations), RSS and sitemap, then run the validator and check desktop/mobile rendering before publishing. Preserve the historical archive and generated tag routes.
