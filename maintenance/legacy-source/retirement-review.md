# Legacy deployment and output retirement review

Date: 2026-10-19. Publication baseline:
`254ff6ef1e572df7ae034ef34acb4fb90e51624c`.

Update: on 2026-10-20 the user explicitly approved deletion of the five listed
outputs and publication after validation. All five are removed from `master`
and its package. The pre-removal baseline is
`004d15a79e75d0ebe9ac532168233d6be371b9a8`; original bytes and SHA-256 values
remain recorded in the manifest and recoverable from Git history.

## Completed without deleting source

In historical branch `hexo`, commit
`a08907d33dadbde8a726e1e2b5628a55a6a20532` sets `deploy: false` in
`_config.yml` and `config_copy/_config.yml`. Previously both configured a Git
deployer targeting the live `master` branch. Every other parsed YAML setting is
unchanged. The commit is pinned by annotated tag
`maintenance/hexo-deploy-retirement/v0.1.0`.

The configured Hexo 5.2.0 deploy command returns before generation or deployment
when that configuration is false; see its
[upstream implementation](https://github.com/hexojs/hexo/blob/5.2.0/lib/plugins/console/deploy.js).
Validation here was YAML inspection and upstream code review, not execution of
the legacy command or dependency stack. Custom configuration overrides and
manual Git pushes are outside this safeguard.

`check_legacy_assets.py` verifies the archive tag
`maintenance/hexo-deploy-retirement/v0.1.0` resolves to the reviewed retirement
commit and checks both configurations against their hashes. While `origin/hexo`
exists, its configurations are checked too. The branch is optional, so retiring
it does not break the guard; a missing or moved archive tag still fails. A future
configuration change requires reviewing and updating that policy.

## Exact removed outputs

All five files are absent from `master` and its static package. Their original
sizes and SHA-256 values are fixed in `retirement-review.json`, which records
the explicit approval date and `removed` state. CI verifies their absence and
checks the recorded original bytes against the pre-removal Git commit.

| Removed root-relative file | Original bytes | Original reference evidence (2026-10-19) |
| --- | ---: | --- |
| `main.0cf68a.js` | 70,640 | No active literal resource references found |
| `mobile.992cbe.js` | 106,824 | No active literal resource references found |
| `slider.e37972.js` | 53,386 | No active literal resource references found; internally fetches the old `content.json` |
| `main.0cf68a.css` | 60,610 | No active resource references found |
| `content.json` | 7,355 | Referenced by retained `slider.e37972.js`; not by active publication inputs |

Total removed: 298,815 bytes. These five outputs were the complete approved deletion scope.
Fonts, images, historical pages, the recovered Markdown, analytics, Pagefind,
Astro bundles and PetApp are outside that scope.

The guard checks all remaining tracked publication inputs.
It inspects actual HTML/SVG resource attributes and inline code, CSS resource
URLs, JS literals and JSON string configuration. HTML prose/comments and JS
comments are not treated as runtime references. Eight regression cases cover
normal URLs, encoded names, literal concatenation, CSS imports, inline handlers
and styles, nested JSON, comments and unrelated filenames.

This is a conservative reserved-name guard. It does not fully interpret
arbitrary runtime string construction, eval, remote code, worker targets or
external clients. No absence-of-traffic claim substitutes for those limits.
The original review did not delete or silently omit files from the package.
The later 2026-10-20 removal was separately approved and updates the publication
inventory from 372 to 367 files. All 367 retained publication bytes are unchanged.

## Production request sample

The 2026-10-19 browser run visited the homepage (including language switching),
archives, a historical Git article, the Dart tag list, search and PetApp. It
switched PetApp characters and searched for `Dart`; a separate DOM observation
confirmed 15 results. The export contains 287 unique request records, none
targeting these five files, with no recorded request/operation/console drops.
No failed or HTTP 4xx/5xx request to `tech.wenmq.cn` was found in that sample.

The sanitized summary is in `browser-check-2026-10-19.json`. The raw export is
local-only and is not committed. Capture coverage excludes worker targets and
is limited to the task tab; this sample does not prove absence of every dynamic
or external reference. A `runtime.lastError` connection diagnostic was recorded
on the homepage; the observed navigation, search and character switch succeeded.

## Recovery and remaining source retirement

A local full-history bundle was created and verified before these changes. Git
history still contains all five outputs and all historical source. The original
36-public-post snapshot remains pinned to its original immutable source commit.
Rollback uses a new revert commit and a new deployment tag, never a force push.

At the five-output removal milestone, default branch `hexo`, Pages source
`master` root, repository rules, legacy npm manifests and vendored dependencies
were unchanged. Open dependency alerts were not dismissed or declared fixed.
Removing those outputs did not itself resolve the old manifest findings.
The separately approved governance sequence changes the default branch to
`master` after the archive-based CI guard is published, retaining `hexo` and
the retirement tag. See the source README for that sequence and its limits.
