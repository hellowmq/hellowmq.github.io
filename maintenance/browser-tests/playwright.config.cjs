const { defineConfig } = require('@playwright/test');
const path = require('node:path');
const os = require('node:os');
const fs = require('node:fs');

if (!process.env.SITE_ROOT) throw new Error('Set SITE_ROOT to the verified static package directory.');
const port = Number(process.env.SITE_TEST_PORT || 18765);
if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error('Invalid SITE_TEST_PORT');
const baseURL = `http://127.0.0.1:${port}`;

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  globalTimeout: 180000,
  expect: { timeout: 10000 },
  workers: 2,
  retries: 0,
  reporter: 'list',
  outputDir: process.env.PLAYWRIGHT_OUTPUT_DIR || fs.mkdtempSync(path.join(os.tmpdir(), 'tech-browser-results-')),
  use: {
    baseURL,
    browserName: 'chromium',
    channel: 'chromium',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    reducedMotion: 'reduce'
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'mobile-390', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
    { name: 'mobile-320', use: { viewport: { width: 320, height: 720 }, isMobile: true, hasTouch: true } }
  ],
  webServer: {
    command: `python3 serve.py ${port}`,
    cwd: __dirname,
    env: { SITE_ROOT: path.resolve(process.env.SITE_ROOT) },
    url: baseURL,
    reuseExistingServer: false,
    stdout: 'ignore',
    stderr: 'ignore'
  }
});
