"""Shared, explicit publication inventory for packaging and maintenance checks."""

from pathlib import Path
import subprocess


ROOT = Path(__file__).resolve().parents[1]
PUBLISHED_DIRECTORIES = {
    "2018", "2019", "2020", "_astro", "about", "archives", "fonts", "img",
    "notes", "page", "pagefind", "petapp", "posts", "search", "studio", "tags",
}
PUBLISHED_ROOT_FILES = {
    ".nojekyll", "404.html", "ASTROPAPER-LICENSE", "CNAME", "ads.txt",
    "favicon.svg", "index.html", "robots.txt", "rss.xml",
    "sitemap-0.xml", "sitemap-index.xml",
}
MAINTENANCE_DIRECTORIES = {".github", "maintenance", "scripts"}
MAINTENANCE_ROOT_FILES = {"README.md", ".gitattributes", ".gitignore"}


def publication_paths():
    entries = subprocess.check_output(["git", "ls-files", "--stage", "-z"], cwd=ROOT).decode().split("\0")
    names = set()
    for entry in filter(None, entries):
        metadata, name = entry.split("\t", 1)
        mode, _, stage = metadata.split()
        if name in MAINTENANCE_ROOT_FILES or Path(name).parts[0] in MAINTENANCE_DIRECTORIES:
            continue
        if name not in PUBLISHED_ROOT_FILES and Path(name).parts[0] not in PUBLISHED_DIRECTORIES:
            raise ValueError(f"Classify this tracked path before packaging: {name}")
        if stage != "0" or mode != "100644" or (ROOT / name).is_symlink():
            raise ValueError(f"Unsupported publication entry: {name}")
        names.add(name)
    if not PUBLISHED_ROOT_FILES <= names:
        raise ValueError("Required publication root files are missing from the Git index")
    return sorted(names)
