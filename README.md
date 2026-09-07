# DaftKen — personal portfolio

Live site: https://tech.wenmq.cn/

The portfolio is hand-authored HTML, CSS and JavaScript. Its interactive Canvas particle field has three selectable modes, an explicit pause control, reduced-motion support, and suspends animation when hidden or off screen. No generated images, external runtime libraries, build tooling or npm installation are required for the new homepage.

## Develop and validate

```sh
python3 -m http.server 8765 --bind 127.0.0.1
python3 scripts/validate-site.py
```

Open http://127.0.0.1:8765. Check desktop and mobile layouts, all three particle modes, pause/resume, keyboard focus and the archive link. The validator checks local links, anchor targets, HTTPS URLs, size budgets and byte-for-byte preservation of 36 historic article pages.

## Publish

GitHub Pages serves the root of `master`. Commit focused changes, push normally, then verify the Pages build commit and the actual public site. `CNAME` remains `tech.wenmq.cn`. Do not run the legacy Hexo deployer over this branch.

## Legacy boundary

The `hexo` branch preserves the original blog source and dependencies. Its existing Dependabot findings are **not resolved by this homepage release**. Historical article, archive and pagination pages retain the original theme and scripts. They need a separate migration and runtime dependency review; the new homepage does not load those scripts.

No historic files were removed in this release. The pre-redesign deployment is commit `355ba93833265dd583ac145b1e876bc805942f02`. Revert the redesign commit with a new commit if rollback is needed; do not rewrite history. Source/default-branch reconciliation and historic article modernization remain follow-up work.
