"""Validate the hand-authored portfolio and preserved article routes without dependencies."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import subprocess

ROOT = Path(__file__).resolve().parents[1]
class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links, self.ids = [], set()
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'):
            self.ids.add(attrs['id'])
        for key in ('src', 'href'):
            if key in attrs:
                self.links.append((tag, attrs[key]))

for file in (ROOT/'index.html', ROOT/'404.html'):
    parser = Page()
    parser.feed(file.read_text())
    for tag, link in parser.links:
        parts = urlsplit(link)
        assert parts.scheme != 'http', f'HTTP resource: {link}'
        if parts.scheme or parts.netloc:
            continue
        if parts.path:
            target = ROOT/unquote(parts.path.lstrip('/'))
            assert target.is_file() or (target/'index.html').is_file(), link
        elif parts.fragment:
            assert parts.fragment in parser.ids, link
baseline = '355ba93833265dd583ac145b1e876bc805942f02'
old = subprocess.check_output(['git', 'ls-tree', '-rz', '--name-only', baseline], cwd=ROOT, text=True).split('\0')
articles = [p for p in old if p.startswith(('2018/', '2019/', '2020/')) and p.endswith('index.html')]
for name in articles:
    data = subprocess.check_output(['git', 'show', f'{baseline}:{name}'], cwd=ROOT)
    assert (ROOT/name).read_bytes() == data, f'Historical article changed: {name}'
for file in (ROOT/'index.html', ROOT/'studio/site.css', ROOT/'studio/site.js'):
    assert file.stat().st_size < 35000, f'Unexpectedly large file: {file.name}'
print(f'PASS: local links, anchors, HTTPS URLs, size budgets, {len(articles)} unchanged articles')
