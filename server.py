import http.server
import socketserver
import urllib.parse
import posixpath
import os
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 3456

class RobustHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        # Strip query parameters and fragments cleanly
        parsed = urllib.parse.urlparse(path)
        clean_path = parsed.path
        return super().translate_path(clean_path)

    def guess_type(self, path):
        # Strip query parameters before guessing MIME type
        clean_path = urllib.parse.urlparse(path).path
        base, ext = posixpath.splitext(clean_path)
        ext = ext.lower()
        if ext in ('.js', '.mjs'):
            return 'text/javascript'
        if ext == '.json':
            return 'application/json'
        if ext == '.css':
            return 'text/css'
        if ext in ('.html', '.htm'):
            return 'text/html'
        if ext == '.svg':
            return 'image/svg+xml'
        return super().guess_type(clean_path)

    def end_headers(self):
        # Prevent any caching issues
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

if __name__ == '__main__':
    web_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(web_dir)
    socketserver.TCPServer.allow_reuse_address = True
    try:
        with socketserver.TCPServer(("", PORT), RobustHTTPHandler) as httpd:
            print(f"BioApex Robust Server listening on http://localhost:{PORT}")
            httpd.serve_forever()
    except Exception as e:
        print(f"Failed to start on port {PORT}: {e}")
        sys.exit(1)
