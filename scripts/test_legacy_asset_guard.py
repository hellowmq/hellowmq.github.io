import unittest

from check_legacy_assets import markers


ASSETS = {"main.0cf68a.js", "mobile.992cbe.js", "slider.e37972.js", "main.0cf68a.css", "content.json"}


class LegacyReferenceTests(unittest.TestCase):
    def test_html_resource_urls_with_queries_and_entities(self):
        self.assertEqual(markers("index.html", '<script src="/main.0cf68a.js?v=1&amp;x=2"></script>', ASSETS), ["main.0cf68a.js"])

    def test_inline_script_and_literal_concatenation(self):
        html = '<script>import("/main." + /* split */ "0cf68a.js")</script>'
        self.assertEqual(markers("index.html", html, ASSETS), ["main.0cf68a.js"])

    def test_encoded_javascript_and_urls(self):
        script = r'fetch("/con\u0074ent%2Ejson?q=1"); import("/mobile.992cbe\x2ejs")'
        self.assertEqual(markers("runtime.js", script, ASSETS), ["content.json", "mobile.992cbe.js"])

    def test_css_import_and_url(self):
        css = '@import "/main.0cf68a.css"; a{background:url(/content.json)}'
        self.assertEqual(markers("site.css", css, ASSETS), ["content.json", "main.0cf68a.css"])

    def test_inline_styles_and_handlers(self):
        html = '<div style="background:url(/content.json)" onclick="import(\'slider.e37972.js\')"></div>'
        self.assertEqual(markers("index.html", html, ASSETS), ["content.json", "slider.e37972.js"])

    def test_json_nested_configuration(self):
        self.assertEqual(markers("assets.json", '{"nested":[{"url":"/content.json"}]}', ASSETS), ["content.json"])

    def test_comments_and_article_prose_are_not_resource_references(self):
        self.assertEqual(markers("article.html", '<p>Historical file: main.0cf68a.js</p><!-- src="content.json" -->', ASSETS), [])
        self.assertEqual(markers("runtime.js", '// "main.0cf68a.js"\n/* "content.json" */', ASSETS), [])

    def test_current_resources_and_longer_filenames(self):
        self.assertEqual(markers("runtime.js", 'import("/studio/site.js"); const map="main.0cf68a.js.map";', ASSETS), [])


if __name__ == "__main__":
    unittest.main()
