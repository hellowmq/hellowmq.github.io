# hellowmq.github.io

Source history and published assets for [tech.wenmq.cn](https://tech.wenmq.cn/).

## Current maintenance path (2026-10-18)

This `hexo` branch is historical source, not the current site build pipeline.
For normal site updates, use the [maintained static site on `master`](https://github.com/hellowmq/hellowmq.github.io/tree/master)
and its [development, checks and packaging instructions](https://github.com/hellowmq/hellowmq.github.io/blob/master/README.md).
Do not run the old Hexo installer or deployer as part of that workflow.

The 36 public Markdown originals have a byte-preserving
[recovery snapshot and route/hash manifest](https://github.com/hellowmq/hellowmq.github.io/tree/master/maintenance/legacy-source).
The `Site checks` workflow verifies that snapshot, the historical published
pages and reproducible static packaging without installing Hexo dependencies.
Static packaging preserves the generated historical HTML; it does not regenerate
those pages from Markdown.

Old dependency advisories remain open until the legacy manifests are explicitly
retired or maintained. This notice does not resolve them or authorize deleting
source files. Branch history, the default branch and the Pages source are unchanged.

## Branches

- `master` contains the static site currently configured for GitHub Pages.
- `hexo` is the default branch and retains the earlier Hexo source, posts, configuration, and vendored themes.

The Hexo branch uses an older dependency stack and is kept as site history. It has not been refreshed as a general-purpose starter. Before rebuilding it, review dependency advisories, theme attribution, and deployment settings rather than copying the repository as-is.

## Rights and reuse

Posts, site-specific images, configuration, and third-party themes may have different rights. Theme directories retain their own upstream notices where present. This repository does not currently provide a single license covering all content.
