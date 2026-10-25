"""Loopback-only test server with room for parallel browser resource requests."""

from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import os
from pathlib import Path
import sys


class TestServer(ThreadingHTTPServer):
    request_queue_size = 128
    daemon_threads = True


root = Path(os.environ["SITE_ROOT"]).resolve(strict=True)
handler = partial(SimpleHTTPRequestHandler, directory=str(root))
with TestServer(("127.0.0.1", int(sys.argv[1])), handler) as server:
    server.serve_forever()
