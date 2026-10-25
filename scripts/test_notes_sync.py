import copy
from html import escape
import json
from pathlib import Path
import re
import shutil
import tempfile
import unittest
import xml.etree.ElementTree as ET

from site_files import ROOT
from sync_notes import BASE, render


class NotesSyncTests(unittest.TestCase):
    def setUp(self):
        self.root = Path(tempfile.mkdtemp(prefix="tech-notes-fixture-"))
        paths = ["maintenance/notes.json", "index.html", "studio/i18n.js", "rss.xml", "sitemap-0.xml"]
        paths += [str(p.relative_to(ROOT)) for p in (ROOT / "notes").rglob("index.html")]
        for name in paths:
            target = self.root / name
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(ROOT / name, target)
        self.metadata = self.root / "maintenance/notes.json"
        self.data = json.loads(self.metadata.read_text())

    def save(self):
        self.metadata.write_text(json.dumps(self.data, ensure_ascii=False))

    def test_current_outputs_are_reproducible(self):
        outputs = render(self.root)
        for name, text in outputs.items():
            self.assertEqual(text, (self.root / name).read_text(), name)

    def test_utc_feed_time_uses_site_date_in_the_index(self):
        self.data["entries"][0]["publishedAt"] = "2026-10-16T18:06:18+00:00"
        self.save()
        outputs = render(self.root)
        self.assertIn("2026-10-17 · 浏览器", outputs["notes/index.html"])
        self.assertIn("Fri, 16 Oct 2026 18:06:18 GMT", outputs["rss.xml"])

    def test_new_featured_note_updates_all_entry_points_and_preserves_history(self):
        entry = copy.deepcopy(self.data["entries"][0])
        entry.update(slug="fixture-note", title="新文章 & <示例>", publishedAt="2026-10-25T12:00:00+08:00", feedTitle="新文章 & <示例>")
        entry["lastModified"] = "2026-10-25"
        entry["home"]["zh-CN"]["title"] = entry["title"]
        entry["home"]["en"]["title"] = "A new note"
        self.data["entries"].append(entry)
        self.data["featured"] = entry["slug"]
        article = self.root / "notes/fixture-note/index.html"
        article.parent.mkdir()
        article.write_text(f'<link rel="canonical" href="{BASE}/notes/fixture-note/"><main><h1>{escape(entry["title"])}</h1></main>')
        self.save()
        outputs = render(self.root)
        for name in ("index.html", "notes/index.html", "rss.xml", "sitemap-0.xml"):
            self.assertIn("/notes/fixture-note/", outputs[name], name)
        self.assertIn("新文章 &amp; &lt;示例&gt;", outputs["index.html"])
        self.assertIn('"petNoteTitle": "A new note"', outputs["studio/i18n.js"])
        self.assertEqual(ET.fromstring(outputs["rss.xml"]).findtext("./channel/item/title"), entry["title"])
        def historical_items(text):
            return [item for item in re.findall(r"<item>.*?</item>", text, re.S) if "/notes/" not in ET.fromstring(item).findtext("link", "")]
        self.assertEqual(historical_items(outputs["rss.xml"]), historical_items((self.root / "rss.xml").read_text()))
        self.assertEqual(len(historical_items(outputs["rss.xml"])), 36)
        for name, text in outputs.items():
            (self.root / name).write_text(text)
        self.assertEqual(render(self.root), outputs)

    def test_duplicate_slug_is_rejected(self):
        self.data["entries"].append(copy.deepcopy(self.data["entries"][0]))
        self.save()
        with self.assertRaisesRegex(ValueError, "duplicate"):
            render(self.root)

    def test_path_traversal_is_rejected(self):
        self.data["entries"][0]["slug"] = "../other"
        self.save()
        with self.assertRaisesRegex(ValueError, "Invalid"):
            render(self.root)

    def test_unlisted_article_is_rejected(self):
        article = self.root / "notes/unlisted/index.html"
        article.parent.mkdir()
        article.write_text("<main>Not reviewed in metadata</main>")
        with self.assertRaisesRegex(ValueError, "Every published note needs metadata"):
            render(self.root)

    def test_incomplete_home_translation_is_rejected(self):
        self.data["entries"][0]["home"]["en"]["title"] = ""
        self.save()
        with self.assertRaisesRegex(ValueError, "complete"):
            render(self.root)

    def test_missing_timezone_is_rejected(self):
        self.data["entries"][0]["publishedAt"] = "2026-10-25T12:00:00"
        self.save()
        with self.assertRaisesRegex(ValueError, "timezone"):
            render(self.root)


if __name__ == "__main__":
    unittest.main()
