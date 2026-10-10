# DaftKen — personal portfolio

Live site: https://tech.wenmq.cn/

The homepage is hand-authored HTML, CSS and JavaScript. Its interactive Canvas particle field has three selectable modes, an explicit pause control, reduced-motion support, and suspends animation when hidden or off screen. The current DisplayDJ case study is hand-authored at `notes/displaydj/index.html` and linked from the homepage, RSS and sitemap. Its versioned sources distinguish implementation from recorded hardware evidence.

The historical blog is statically generated from 36 original Markdown posts using an adaptation of [AstroPaper](https://github.com/satnaing/astro-paper); its MIT notice is in [ASTROPAPER-LICENSE](ASTROPAPER-LICENSE). New blog pages cover the original article, archive, tag and pagination URLs. No Node runtime is needed to serve the published files.

## Develop and validate

```sh
python3 -m http.server 8765 --bind 127.0.0.1
python3 scripts/validate-site.py
```

Open http://127.0.0.1:8765. Check desktop and mobile layouts, all three particle modes, pause/resume, keyboard focus, the archive and a few article pages. The validator checks local links, anchor targets, HTTPS URLs, size budgets, sharing assets and coverage of the historical routes. The October 2026 portfolio changes intentionally update the homepage; the validator keeps the published historical article/list and PetApp files byte-identical to `d1aab1c` after removing only the exact shared analytics script tag. Some older articles still contain third-party image URLs; their availability can change independently of this site.

## Publish

GitHub Pages serves the root of `master`. Commit focused changes, push normally, then verify the Pages build commit and the actual public site. `CNAME` remains `tech.wenmq.cn`. Do not run the legacy Hexo deployer over this branch.

## Legacy boundary

The `hexo` branch preserves the original blog source and dependencies. Its existing Dependabot findings are **not resolved by this static-site release**. The homepage does not load those scripts. The historical blog pages are now AstroPaper-generated static HTML with the original publication dates and URLs; the default/source branch and its old dependencies remain a separate maintenance task.

No historic files were removed in this release. The immediately preceding Pages state is commit `719adbc134d5ef5ec696f586460f9a3181e1d499`; use a new revert commit for rollback rather than rewriting history. The original Markdown remains available in the `hexo` branch.

## Languages

The homepage and custom 404 default to Simplified Chinese, including their static HTML fallback. The language button switches to English and remembers an explicit choice in localStorage. Storage is optional: blocked storage must not prevent switching. Language changes update document language, title, description, visible copy and accessible labels without resetting the particle mode or pause state.

Translations live in `studio/i18n.js`; `data-i18n` and `data-i18n-aria` identify translated homepage content. Translation HTML is developer-authored only; never insert user content into this dictionary. The blog is Chinese-first and retains the dates and titles of the original posts.

## Visit statistics

All 98 static HTML pages load `/studio/analytics.js?v=1`. GA4 uses measurement ID `G-NK7HHE8WXB` on top-level `tech.wenmq.cn` pages only; local previews and embedded PetApp frames do not collect. The matching stream has enhanced measurement disabled. Normal page loads and Astro article route changes count once; hash/query-only changes do not. Page and referrer addresses exclude queries and fragments. No tool input is sent. Removing queries also means UTM campaign parameters are not collected by this setup. Google signals and ad personalization are disabled for this stream's site configuration. The public notice is on `/about/#analytics`.

The shared runtime is generated from private `tool-sites/src/analytics.mjs`, which also injects the calculator deployment. Keep both copies aligned. The calculator is published separately by tool-sites and shares this tech stream. Blogger retains its existing stream and settings in the same GA4 property; compare sites by hostname and stream, rather than interpreting separate stream sessions as one uninterrupted cross-site journey.

Release this change from an annotated `deploy/tech-analytics/v0.1.0` tag with a normal, atomic push of that tag and its commit to `master`. Future updates use new tags; do not move existing tags or run Hexo over the published branch.
