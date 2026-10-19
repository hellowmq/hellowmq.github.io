# Legacy Hexo source recovery

Date: 2026-10-18. This snapshot preserves the 36 **already published** Markdown
articles byte-for-byte from `7fdc838a0d09c23cec232ad6af76494731466eb8`.
`manifest.json` records each original path, date, title, historical public URL,
file size and SHA-256. The route set matches the 36 articles at publication
baseline `d1aab1c9c1a4672690f6c8dc3176b016405a0a75`.
The scoped `.gitattributes` rule preserves original line endings and whitespace;
do not format these recovery copies or strip historical Markdown line breaks.

Only public article Markdown was recovered. Drafts, old configuration, tokens,
`node_modules`, and third-party tooling were not copied. Recovery does not grant
new licenses to article content or externally linked assets.

## Current maintenance model

- The homepage, engineering notes, and their shared assets are maintained as
  HTML/CSS/JavaScript in `master`.
- Historical article/list HTML and Astro assets remain frozen publication
  inputs. Original Markdown is preserved here for recovery and future editing.
- `scripts/build-site.py` validates and copies the tracked static publication
  inputs into a new directory. Two builds must produce identical path/hash
  manifests. No Hexo, npm installation, or generator execution is involved.
- This is reproducible **static packaging**, not regeneration of historical
  Astro output from Markdown. The older local Astro adaptation still needs
  source cleanup, a verified dependency lock, route/output comparison and
  acceptance before it can become a Markdown regeneration pipeline.

Run from a full-history clone of this repository:

```sh
python3 scripts/verify-legacy-source.py
build_root="$(mktemp -d)"
python3 scripts/build-site.py --output "$build_root/site" --manifest "$build_root/site.json"
```

New publication inputs must be added to the Git index before packaging.
Maintenance files, CI files, and scripts are excluded from that artifact.
The output is a local artifact; this command does not upload or deploy it.
The manifest is stored beside the output, and existing destinations are refused.
Current branch-based Pages hosting still serves `master` directly.

## Dependency inventory and limits

`dependency-inventory-2026-10-18.json` pins the inspected Git commits and records
the legacy manifests, the alerts open on that date and direct HTML script references.

- At that inventory date, default/source branch `hexo` had **60 open alerts**: 4 critical,
  32 high, 19 medium, 5 low. They affect `package-lock.json` (57),
  `package.json` (1), and `themes/landscape/package.json` (2).
- That immutable legacy tree tracks 3,437 files under root `node_modules/`.
  None are needed or executed by the new checks or static packaging.
- Current HTML directly names seven local scripts. Root scripts
  `main.0cf68a.js`, `mobile.992cbe.js` and `slider.e37972.js` are not named by
  any tracked HTML `script src`. They remained in that dated inventory; the
  separately approved 2026-10-20 cleanup removes them and the other two reviewed
  outputs. The isolation guard continues to check active references.
- No direct external `script src` was found. This does **not** imply no external
  runtime requests: for example, the preserved analytics runtime loads GA4.

This is an inventory, not a complete browser bundle vulnerability/reachability
audit. Manifest advisory counts are not production exploit counts. No old
dependencies were executed, upgraded, dismissed or declared fixed.

## Remaining retirement gate

2026-10-20 follow-up: the user approved removal of the five reviewed legacy
output files. They are now absent from `master` and its package, and CI rejects
their reintroduction and active references. Both historical deployment
configurations remain disabled. Details and the original 2026-10-19 reference
sample are recorded in [`retirement-review.md`](retirement-review.md).

The source recovery and the independent static packaging path are in place.
The guard now pins the existing `maintenance/hexo-deploy-retirement/v0.1.0`
archive tag to commit `a08907d33dadbde8a726e1e2b5628a55a6a20532`. It validates
the disabled deployment configurations in that snapshot and, while present,
`origin/hexo`. A full-history clone with the archive tag no longer requires
the legacy branch. The guard itself changes no repository settings or branches.

The user separately approved the 2026-10-20 governance sequence: publish this
guard, change the default branch from `hexo` to `master`, close the three obsolete
Hexo dependency PRs (#23, #24, #25), and re-read Dependabot. Keep the `hexo`
branch and its retirement tag. Pages continues to publish `master` root.
Do not describe alert removal after a dependency-graph change as patched legacy
code, or assert a final alert count before checking GitHub.

The following are separate repository maintenance decisions:

1. Confirm the frozen historical HTML maintenance model before retiring the
   original generator, or complete the Astro regeneration pipeline above.
2. Prepare an exact file inventory before any legacy file deletion. Keep the
   original branch history and recovery manifest; do not rewrite Git history.
3. Keep default-branch governance separate from Pages source or repository rules.
   The approved transition above does not change Pages source or repository rules.
4. Re-read Dependabot after the approved retirement changes. Do not dismiss
   alerts merely to reduce the count.

The 2026-10-18 recovery phase removed no files or settings. The later approved
cleanup removed only five legacy output files; original source, manifests,
branches and tags remain preserved. The default-branch transition is separately
authorized as described above.
