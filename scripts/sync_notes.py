"""Synchronize reviewed engineering-note metadata without rebuilding old articles."""

import argparse
from datetime import date, datetime, timedelta, timezone
from email.utils import format_datetime
from hashlib import sha256
from html import escape
import json
from pathlib import Path
import re
import xml.etree.ElementTree as ET

from site_files import ROOT


BASE = "https://tech.wenmq.cn"
SITE_TIMEZONE = timezone(timedelta(hours=8))


def publication_date(entry):
    return datetime.fromisoformat(entry["publishedAt"]).astimezone(SITE_TIMEZONE).date().isoformat()


def block(text, name, content):
    start, end = f"<!-- notes:{name}:start -->", f"<!-- notes:{name}:end -->"
    if text.count(start) != 1 or text.count(end) != 1:
        raise ValueError(f"Expected one generated {name} block")
    before, rest = text.split(start)
    _, after = rest.split(end)
    return before + start + "\n" + content + "\n" + end + after


def render(root=ROOT):
    data = json.loads((root / "maintenance/notes.json").read_text())
    if data["schemaVersion"] != 1 or not data["entries"]:
        raise ValueError("Expected reviewed note metadata")
    entries, slugs = data["entries"], set()
    for entry in entries:
        slug = entry["slug"]
        if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", slug) or slug in slugs:
            raise ValueError(f"Invalid or duplicate note slug: {slug}")
        slugs.add(slug)
        for field in ("title", "summary", "feedTitle", "feedSummary"):
            if not isinstance(entry[field], str) or not entry[field].strip():
                raise ValueError(f"Missing {field}: {slug}")
        published = datetime.fromisoformat(entry["publishedAt"])
        if published.tzinfo is None:
            raise ValueError(f"Publication timezone required: {slug}")
        if entry.get("lastModified"):
            date.fromisoformat(entry["lastModified"])
        article = root / "notes" / slug / "index.html"
        if article.is_symlink() or not article.is_file():
            raise ValueError(f"Missing article: {slug}")
        if f'<link rel="canonical" href="{BASE}/notes/{slug}/">' not in article.read_text():
            raise ValueError(f"Article canonical does not match metadata: {slug}")
        for field in ("topics", "feedCategories"):
            if not isinstance(entry[field], list) or not all(isinstance(x, str) and x.strip() for x in entry[field]):
                raise ValueError(f"Invalid {field}: {slug}")
    actual = {str(p.parent.relative_to(root / "notes")) for p in (root / "notes").rglob("index.html") if p.parent != root / "notes"}
    if actual != slugs:
        raise ValueError("Every published note needs metadata; keep drafts outside the publication tree")
    featured = next((e for e in entries if e["slug"] == data["featured"]), None)
    if featured is None or set(featured.get("home", {})) != {"zh-CN", "en"}:
        raise ValueError("Featured note needs Chinese and English homepage copy")
    for copy in featured["home"].values():
        if any(not isinstance(copy.get(k), str) or not copy[k].strip() for k in ("tag", "title", "summary")):
            raise ValueError("Featured homepage copy must be complete")
    ordered = sorted(entries, key=lambda e: datetime.fromisoformat(e["publishedAt"]), reverse=True)
    outputs = {}

    js = (root / "studio/i18n.js").read_text()
    begin = js.index("const messages = ") + len("const messages = ")
    messages, size = json.JSONDecoder().raw_decode(js[begin:])
    for locale, copy in featured["home"].items():
        for key, field in (("petNoteTag", "tag"), ("petNoteTitle", "title"), ("petNoteDesc", "summary")):
            messages[locale][key] = copy[field]
    outputs["studio/i18n.js"] = js[:begin] + json.dumps(messages, ensure_ascii=False, indent=2) + js[begin + size:]

    home_copy = featured["home"]["zh-CN"]
    card = ('<article class="writing-entry">'
            f'<p data-i18n="petNoteTag" class="eyebrow">{escape(home_copy["tag"])}</p>'
            f'<h3 data-i18n="petNoteTitle">{escape(home_copy["title"])}</h3>'
            f'<p data-i18n="petNoteDesc">{escape(home_copy["summary"])}</p>'
            f'<a data-i18n="noteLink" href="/notes/{featured["slug"]}/" class="inline-link">阅读案例（中文） ↗</a></article>')
    home = block((root / "index.html").read_text(), "featured", card)
    version = sha256(outputs["studio/i18n.js"].encode()).hexdigest()[:12]
    home, count = re.subn(r'/studio/i18n\.js\?v=[^"\s]+', f"/studio/i18n.js?v={version}", home)
    if count != 1:
        raise ValueError("Expected one versioned homepage translation script")
    outputs["index.html"] = home

    cards = []
    for entry in ordered:
        meta = " · ".join([publication_date(entry), *entry["topics"]])
        cards.append(f'<article class="note-entry"><p class="note-meta">{escape(meta)}</p><h2><a href="/notes/{entry["slug"]}/">{escape(entry["title"])}</a></h2><p>{escape(entry["summary"])}</p></article>')
    outputs["notes/index.html"] = block((root / "notes/index.html").read_text(), "index", "\n".join(cards))

    rss = (root / "rss.xml").read_text()
    rss = re.sub(r"<item>.*?</item>", lambda m: "" if (ET.fromstring(m[0]).findtext("link") or "").startswith(BASE + "/notes/") else m[0], rss, flags=re.S)
    items = []
    for entry in ordered:
        url = BASE + f'/notes/{entry["slug"]}/'
        published = datetime.fromisoformat(entry["publishedAt"])
        stamp = format_datetime(published, usegmt=published.utcoffset().total_seconds() == 0)
        categories = "".join(f"<category>{escape(x)}</category>" for x in entry["feedCategories"])
        items.append(f'<item><title>{escape(entry["feedTitle"])}</title><link>{url}</link><guid isPermaLink="true">{url}</guid><description>{escape(entry["feedSummary"])}</description><pubDate>{stamp}</pubDate>{categories}</item>')
    at = rss.index("<item>") if "<item>" in rss else rss.index("</channel>")
    outputs["rss.xml"] = rss[:at] + "".join(items) + rss[at:]
    ET.fromstring(outputs["rss.xml"])

    sitemap = (root / "sitemap-0.xml").read_text()
    def keep_url(match):
        fragment = ET.fromstring(match[0])
        return "" if (fragment.findtext("loc") or "").startswith(BASE + "/notes/") else match[0]
    sitemap = re.sub(r"<url>.*?</url>", keep_url, sitemap, flags=re.S)
    urls = []
    for entry in sorted(entries, key=lambda e: e["slug"]):
        modified = f'<lastmod>{entry["lastModified"]}</lastmod>' if entry.get("lastModified") else ""
        urls.append(f'<url><loc>{BASE}/notes/{entry["slug"]}/</loc>{modified}</url>')
    latest = max(e.get("lastModified", publication_date(e)) for e in entries)
    urls.append(f"<url><loc>{BASE}/notes/</loc><lastmod>{latest}</lastmod></url>")
    outputs["sitemap-0.xml"] = sitemap.replace("</urlset>", "".join(urls) + "</urlset>")
    ET.fromstring(outputs["sitemap-0.xml"])
    return outputs


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Fail on stale generated outputs without writing")
    args = parser.parse_args()
    outputs = render()
    changed = [name for name, text in outputs.items() if (ROOT / name).read_text() != text]
    if args.check and changed:
        parser.exit(1, "Stale note outputs; run python3 scripts/sync_notes.py: " + ", ".join(changed) + "\n")
    if not args.check:
        for name in changed:
            (ROOT / name).write_text(outputs[name])
    print(f"PASS: reviewed note metadata synchronized across {len(outputs)} outputs ({len(changed)} changed)")


if __name__ == "__main__":
    main()
