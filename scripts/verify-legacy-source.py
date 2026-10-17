"""Verify the public Markdown recovery snapshot without executing Hexo."""

import hashlib
import json
from pathlib import Path
import subprocess


ROOT = Path(__file__).resolve().parents[1]
SNAPSHOT = ROOT / "maintenance/legacy-source"
manifest = json.loads((SNAPSHOT / "manifest.json").read_text())
assert manifest["schemaVersion"] == 1
assert manifest["articleCount"] == 36 and manifest["draftsIncluded"] is False
assert len(manifest["articles"]) == manifest["articleCount"]

published_paths = subprocess.check_output(
    ["git", "ls-tree", "-rz", "--name-only", manifest["publishedBaseline"]],
    cwd=ROOT,
).decode().split("\0")
expected_routes = {
    "/" + name.removesuffix("index.html")
    for name in published_paths
    if name.startswith(("2018/", "2019/", "2020/")) and name.endswith("/index.html")
}
routes, sources, copies = set(), set(), set()
for article in manifest["articles"]:
    source = article["sourcePath"]
    local = article["markdownPath"]
    route = article["legacyPath"]
    assert source.startswith("source/_posts/") and source.endswith(".md"), source
    assert not Path(source).is_absolute() and ".." not in Path(source).parts, source
    assert local == "posts/" + Path(source).name, local
    assert route not in routes and source not in sources and local not in copies
    routes.add(route)
    sources.add(source)
    copies.add(local)
    path = SNAPSHOT / local
    assert not path.is_symlink(), local
    raw = path.read_bytes()
    assert len(raw) == article["bytes"], local
    assert hashlib.sha256(raw).hexdigest() == article["sha256"], local
    original = subprocess.check_output(
        ["git", "show", f'{manifest["sourceCommit"]}:{source}'], cwd=ROOT
    )
    assert raw == original, f"Recovered Markdown differs from original: {source}"

assert routes == expected_routes, "Historical article route coverage changed"
assert copies == {str(p.relative_to(SNAPSHOT)) for p in (SNAPSHOT / "posts").rglob("*") if p.is_file()}
print("PASS: 36 public Markdown originals, hashes and historical routes; no drafts")
