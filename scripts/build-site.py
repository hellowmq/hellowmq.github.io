"""Package the validated static publication tree without running a generator.

The editable HTML and the frozen historical output are the build inputs. This
does not claim to regenerate the historical Astro pages from Markdown.
"""

import argparse
import hashlib
import json
from pathlib import Path
import subprocess
import sys


ROOT = Path(__file__).resolve().parents[1]
PUBLISHED_DIRECTORIES = {
    "2018", "2019", "2020", "_astro", "about", "archives", "fonts", "img",
    "notes", "page", "pagefind", "petapp", "posts", "search", "studio", "tags",
}
PUBLISHED_ROOT_FILES = {
    ".nojekyll", "404.html", "ASTROPAPER-LICENSE", "CNAME", "ads.txt",
    "content.json", "favicon.svg", "index.html", "main.0cf68a.css",
    "main.0cf68a.js", "mobile.992cbe.js", "robots.txt", "rss.xml",
    "sitemap-0.xml", "sitemap-index.xml", "slider.e37972.js",
}
MAINTENANCE_DIRECTORIES = {".github", "maintenance", "scripts"}
MAINTENANCE_ROOT_FILES = {"README.md", ".gitattributes"}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, required=True, help="New directory outside this checkout")
    parser.add_argument("--manifest", type=Path, required=True, help="New JSON manifest outside the build output")
    args = parser.parse_args()
    output, manifest_path = args.output.resolve(), args.manifest.resolve()
    for destination in (output, manifest_path):
        if destination == ROOT or ROOT in destination.parents:
            parser.error("Build destinations must be outside the checkout")
        if destination.exists():
            parser.error(f"Refusing to overwrite existing destination: {destination}")
    if output == manifest_path or output in manifest_path.parents or manifest_path in output.parents:
        parser.error("Output directory and manifest must be separate")

    for script in ("validate-site.py", "verify-legacy-source.py"):
        subprocess.run([sys.executable, str(ROOT / "scripts" / script)], cwd=ROOT, check=True)

    entries = subprocess.check_output(["git", "ls-files", "--stage", "-z"], cwd=ROOT).decode().split("\0")
    files = {}
    for entry in sorted(filter(None, entries)):
        metadata, name = entry.split("\t", 1)
        mode, _, stage = metadata.split()
        path = Path(name)
        if name in MAINTENANCE_ROOT_FILES or path.parts[0] in MAINTENANCE_DIRECTORIES:
            continue
        if name not in PUBLISHED_ROOT_FILES and path.parts[0] not in PUBLISHED_DIRECTORIES:
            raise ValueError(f"Classify this tracked path before packaging: {name}")
        if stage != "0" or mode != "100644" or (ROOT / name).is_symlink():
            raise ValueError(f"Unsupported publication entry: {name}")
        raw = (ROOT / name).read_bytes()
        files[name] = {"sha256": hashlib.sha256(raw).hexdigest(), "bytes": len(raw)}

    if not PUBLISHED_ROOT_FILES <= files.keys():
        raise ValueError("Required publication root files are missing from the Git index")
    output.mkdir(parents=True, exist_ok=False)
    for name, details in files.items():
        target = output / name
        target.parent.mkdir(parents=True, exist_ok=True)
        raw = (ROOT / name).read_bytes()
        if hashlib.sha256(raw).hexdigest() != details["sha256"]:
            raise ValueError(f"Source changed while packaging: {name}")
        target.write_bytes(raw)
    manifest_path.parent.mkdir(parents=True, exist_ok=True)
    with manifest_path.open("x") as stream:
        json.dump({"schemaVersion": 1, "files": files}, stream, ensure_ascii=False, sort_keys=True, indent=2)
        stream.write("\n")
    print(f"PASS: packaged {len(files)} tracked static files; maintenance sources and tooling excluded")


if __name__ == "__main__":
    main()
