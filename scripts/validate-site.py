"""Validate the static homepage and historical blog routes without dependencies."""

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import json
import subprocess
import xml.etree.ElementTree as ET


ROOT = Path(__file__).resolve().parents[1]
BASELINE = "719adbc134d5ef5ec696f586460f9a3181e1d499"


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.ids = set()
        self.keys = set()

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        for key in ("data-i18n", "data-i18n-aria"):
            if key in attrs:
                self.keys.add(attrs[key])
        if attrs.get("id"):
            self.ids.add(attrs["id"])
        for key in ("src", "href"):
            if key in attrs:
                self.links.append(attrs[key])


def parse(file):
    page = Page()
    page.feed(file.read_text(errors="replace"))
    return page


def local_target(source, url):
    parts = urlsplit(url)
    if parts.scheme or parts.netloc or not parts.path:
        return None
    path = unquote(parts.path)
    return (ROOT / path.lstrip("/")) if path.startswith("/") else (source.parent / path)


locale_source = (ROOT / "studio/i18n.js").read_text()
messages = json.JSONDecoder().raw_decode(locale_source.split("const messages = ", 1)[1])[0]
assert set(messages["en"]) == set(messages["zh-CN"]), "Translation key mismatch"

home = ROOT / "index.html"
home_page = parse(home)
assert '<html lang="zh-CN">' in home.read_text(), "Chinese homepage fallback required"
assert home_page.keys <= set(messages["zh-CN"]), home_page.keys - set(messages["zh-CN"])
for key in home_page.keys:
    assert messages["en"][key] and messages["zh-CN"][key], key
for link in home_page.links:
    parts = urlsplit(link)
    assert parts.scheme != "http", f"HTTP homepage resource: {link}"
    if not parts.path and parts.fragment:
        assert parts.fragment in home_page.ids, link
for file in (home, ROOT / "studio/site.css", ROOT / "studio/site.js", ROOT / "studio/i18n.js"):
    assert file.stat().st_size < 35000, f"Unexpectedly large homepage file: {file.name}"
assert home.read_bytes() == subprocess.check_output(["git", "show", f"{BASELINE}:index.html"], cwd=ROOT), "Homepage changed"

assert (ROOT / ".nojekyll").is_file(), "GitHub Pages must serve _astro assets"
assert (ROOT / "CNAME").read_text().strip() == "tech.wenmq.cn"
assert (ROOT / "petapp/index.html").is_file()

old = subprocess.check_output(
    ["git", "-c", "core.quotePath=false", "ls-tree", "-rz", "--name-only", BASELINE],
    cwd=ROOT,
).decode().split("\0")
articles = [p for p in old if p.startswith(("2018/", "2019/", "2020/")) and p.endswith("/index.html")]
lists = [p for p in old if p.startswith(("archives/", "tags/", "page/")) and p.endswith("/index.html")]
assert len(articles) == 36 and len(lists) == 37, (len(articles), len(lists))

for name in articles + lists:
    file = ROOT / name
    assert file.is_file(), f"Missing historical route: {name}"
    text = file.read_text()
    assert 'meta name="generator" content="Hexo' not in text, f"Old theme remains: {name}"
    assert 'lang="zh-CN"' in text, f"Missing language: {name}"
    assert 'property="og:image"' not in text, f"Unusable OG image: {name}"

for file in ROOT.rglob("*.html"):
    if ".git" in file.parts:
        continue
    for link in parse(file).links:
        target = local_target(file, link)
        if target is not None:
            assert target.is_file() or (target / "index.html").is_file(), f"Broken local link in {file}: {link}"

ET.parse(ROOT / "rss.xml")
sitemap = ET.parse(ROOT / "sitemap-0.xml")
locations = {unquote(x.text or "") for x in sitemap.iter() if x.tag.endswith("}loc")}
for name in articles + lists:
    url = "https://tech.wenmq.cn/" + name.removesuffix("index.html")
    assert url in locations, f"Missing sitemap route: {url}"

print(f"PASS: homepage preserved, local links, RSS, sitemap, {len(articles)} articles, {len(lists)} legacy lists")
