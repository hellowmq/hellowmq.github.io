"""Keep retained legacy assets out of active references; verify deploy retirement.

This is a static reference guard, not a full JavaScript reachability analysis.
It does not execute legacy bundles, alter repository settings or delete files.
"""

import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import subprocess
from urllib.parse import unquote

from site_files import ROOT, publication_paths


JS_TOKENS = re.compile(r'''//[^\n]*|/\*[\s\S]*?\*/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`''')
COMMENTS = re.compile(r"/\*[\s\S]*?\*/|//[^\n]*")


def decode_marker(text):
    for _ in range(2):
        text = unquote(text)
        text = re.sub(r"\\u([0-9a-fA-F]{4})|\\x([0-9a-fA-F]{2})", lambda m: chr(int(m[1] or m[2], 16)), text)
        text = text.replace(r"\/", "/")
    return text


def script_literals(text):
    literals, previous_end = [], None
    for token in JS_TOKENS.finditer(text):
        if token[0].startswith(("//", "/*")):
            continue
        value = decode_marker(token[0][1:-1])
        gap = COMMENTS.sub("", text[previous_end:token.start()]) if previous_end is not None else ""
        if literals and gap.strip() == "+":
            literals[-1] += value
        else:
            literals.append(value)
        previous_end = token.end()
    return literals


def css_literals(text):
    text = re.sub(r"/\*[\s\S]*?\*/", "", text)
    return re.findall(r'''url\(\s*["']?([^\s"')]+)|@import\s+["']([^"']+)''', text, re.I)


class ResourceReferences(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.values, self.block, self.chunks = [], None, []

    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if value is None:
                continue
            if key in {"src", "href", "srcset", "poster", "data"}:
                self.values.append(value)
            elif key == "style":
                self.values.extend(x for pair in css_literals(value) for x in pair if x)
            elif key.startswith("on"):
                self.values.extend(script_literals(value))
        if tag in {"script", "style"}:
            self.block, self.chunks = tag, []

    def handle_data(self, data):
        if self.block:
            self.chunks.append(data)

    def handle_endtag(self, tag):
        if tag != self.block:
            return
        text = "".join(self.chunks)
        if tag == "script":
            self.values.extend(script_literals(text))
        else:
            self.values.extend(x for pair in css_literals(text) for x in pair if x)
        self.block, self.chunks = None, []


def resource_literals(name, text):
    suffix = Path(name).suffix
    if suffix in {".html", ".svg"}:
        parser = ResourceReferences()
        parser.feed(text)
        return parser.values
    if suffix == ".js":
        return script_literals(text)
    if suffix == ".css":
        return [x for pair in css_literals(text) for x in pair if x]
    if suffix in {".json", ".webmanifest"}:
        def strings(value):
            if isinstance(value, str):
                yield value
            elif isinstance(value, list):
                for child in value:
                    yield from strings(child)
            elif isinstance(value, dict):
                for key, child in value.items():
                    yield key
                    yield from strings(child)
        return list(strings(json.loads(text)))
    return []


def markers(name, text, assets):
    found = set()
    for value in resource_literals(name, text):
        value = decode_marker(value)
        for asset in assets:
            if re.search(r"(?<![\w.-])" + re.escape(asset) + r"(?![\w.-])", value):
                found.add(asset)
    return sorted(found)


def main():
    policy = json.loads((ROOT / "maintenance/legacy-source/retirement-review.json").read_text())
    assert policy["schemaVersion"] == 1
    assert policy["deletionApproved"] is False
    assets = {entry["path"] for entry in policy["assets"]}
    assert len(assets) == len(policy["assets"]) == 5
    for entry in policy["assets"]:
        assert entry["path"] == Path(entry["path"]).name
        raw = (ROOT / entry["path"]).read_bytes()
        assert len(raw) == entry["bytes"] and hashlib.sha256(raw).hexdigest() == entry["sha256"], entry["path"]

    violations = {}
    for name in publication_paths():
        if name in assets or Path(name).suffix not in {".html", ".svg", ".js", ".css", ".json", ".webmanifest"}:
            continue
        found = markers(name, (ROOT / name).read_text(), assets)
        if found:
            violations[name] = found
    assert not violations, f"Retired asset referenced by active publication input: {violations}"

    # Read the current remote-tracking source branch. Never execute its tooling.
    deployment = policy["legacyDeployment"]
    for entry in deployment["configFiles"]:
        raw = subprocess.check_output(["git", "show", f'refs/remotes/origin/hexo:{entry["path"]}'], cwd=ROOT)
        assert hashlib.sha256(raw).hexdigest() == entry["sha256"], entry["path"]
        values = re.findall(r"(?m)^deploy:([^\r\n]*)$", raw.decode())
        assert len(values) == 1 and values[0].split("#", 1)[0].strip() == "false", entry["path"]
    print("PASS: five retained legacy assets have no active literal references; both historical deploy targets remain disabled")


if __name__ == "__main__":
    main()
