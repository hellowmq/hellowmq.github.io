"""Validate the hand-authored portfolio and preserved article routes without dependencies."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import subprocess
import json
import re

ROOT = Path(__file__).resolve().parents[1]
class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links, self.ids = [], set()
        self.keys = set()
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        for key in ('data-i18n', 'data-i18n-aria'):
            if key in attrs: self.keys.add(attrs[key])
        if attrs.get('id'):
            self.ids.add(attrs['id'])
        for key in ('src', 'href'):
            if key in attrs:
                self.links.append((tag, attrs[key]))

locale_source = (ROOT/'studio/i18n.js').read_text()
messages = json.JSONDecoder().raw_decode(locale_source.split('const messages = ', 1)[1])[0]
assert set(messages['en']) == set(messages['zh-CN']), 'Translation key mismatch'
for file in (ROOT/'index.html', ROOT/'404.html'):
    parser = Page()
    parser.feed(file.read_text())
    assert '<html lang="zh-CN">' in file.read_text(), 'Chinese static fallback required'
    assert parser.keys <= set(messages['zh-CN']), parser.keys - set(messages['zh-CN'])
    for key in parser.keys:
        assert messages['en'][key] and messages['zh-CN'][key], key
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
for file in (ROOT/'index.html', ROOT/'studio/site.css', ROOT/'studio/site.js', ROOT/'studio/i18n.js'):
    assert file.stat().st_size < 35000, f'Unexpectedly large file: {file.name}'
print(f'PASS: translation keys, Chinese fallback, local links, anchors, HTTPS URLs, size budgets, {len(articles)} unchanged articles')
