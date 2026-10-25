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

from site_files import ROOT, publication_paths



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

    subprocess.run([sys.executable, str(ROOT / "scripts/sync_notes.py"), "--check"], cwd=ROOT, check=True)
    for script in ("validate-site.py", "verify-legacy-source.py"):
        subprocess.run([sys.executable, str(ROOT / "scripts" / script)], cwd=ROOT, check=True)

    files = {}
    for name in publication_paths():
        raw = (ROOT / name).read_bytes()
        files[name] = {"sha256": hashlib.sha256(raw).hexdigest(), "bytes": len(raw)}

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
