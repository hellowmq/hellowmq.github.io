const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page, baseURL }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('response', response => {
    if (new URL(response.url()).origin === baseURL && response.status() >= 400) {
      errors.push(`${response.status()} ${response.url()}`);
    }
  });
  page.on('requestfailed', request => {
    if (new URL(request.url()).origin === baseURL && request.failure()?.errorText !== 'net::ERR_ABORTED') {
      errors.push(`${request.failure()?.errorText} ${request.url()}`);
    }
  });
  page.siteErrors = errors;
});

test.afterEach(async ({ page }) => {
  expect(page.siteErrors, 'No application errors or missing local resources').toEqual([]);
});

test('language updates content and metadata, persists, and switches back', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('main')).toBeVisible();
  await expect(page).toHaveTitle('文茂权 DaftKen — 独立工具创作者');
  await page.getByRole('button', { name: 'Switch to English', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('#hero-title')).not.toContainText('把日常的麻烦');
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', await page.title());
  await expect(page.getByRole('button', { name: 'Enlarge the actual DisplayDJ window' })).toBeVisible();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.getByRole('button', { name: '切换为简体中文', exact: true }).click();
  await expect(page.locator('#hero-title')).toContainText('把日常的麻烦');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
});

test('language switching works when storage is unavailable', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new DOMException('Storage disabled', 'SecurityError'); };
    Storage.prototype.setItem = () => { throw new DOMException('Storage disabled', 'SecurityError'); };
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Switch to English', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.getByRole('button', { name: '切换为简体中文', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
});

test('image dialog supports keyboard, close button, backdrop, and focus restoration', async ({ page }) => {
  await page.goto('/');
  const opener = page.getByRole('button', { name: '放大查看 DisplayDJ 真实窗口' });
  const dialog = page.getByRole('dialog');
  await opener.focus();
  await page.keyboard.press('Enter');
  await expect(dialog).toBeVisible();
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  await opener.click();
  await page.getByRole('button', { name: '关闭图片预览' }).click();
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
  await opener.click();
  await page.mouse.click(1, 1);
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
});

test('historical search returns real results and handles an empty result', async ({ page }) => {
  await page.goto('/search/');
  const search = page.getByRole('textbox', { name: '搜索', exact: true });
  await search.fill('Dart');
  await expect(page.locator('.pagefind-ui__message')).toContainText('15');
  await expect(page.getByRole('link', { name: 'Dart-类型', exact: true })).toBeVisible();
  await search.fill('zz-no-matching-note-20261025');
  await expect(page.locator('.pagefind-ui__message')).toContainText(/没有|未找到|0/);
  await expect(page.locator('.pagefind-ui__result')).toHaveCount(0);
});

test('DisplayDJ previews and current downloads, and Tact Taste links work in both languages', async ({ page }) => {
  await page.goto('/');
  const dialog = page.getByRole('dialog');
  for (const language of ['zh-CN', 'en']) {
    if (language === 'en') await page.getByRole('button', { name: 'Switch to English', exact: true }).click();
    for (const product of [
      { button: language === 'en' ? 'Enlarge the actual DisplayDJ window' : '放大查看 DisplayDJ 真实窗口', image: '/studio/displaydj-full-1.0.2-2026-10-25.jpg', title: 'Full 1.0.2' },
      { button: language === 'en' ? 'Enlarge the actual DisplayDJ Lite window' : '放大查看 DisplayDJ Lite 真实窗口', image: '/studio/displaydj-lite-0.1.0-2026-10-25.jpg', title: 'Lite 0.1.0' }
    ]) {
      const opener = page.getByRole('button', { name: product.button, exact: true });
      await opener.click();
      await expect(dialog).toBeVisible();
      await expect(dialog.locator('#preview-title')).toContainText(product.title);
      await expect(dialog.locator('img')).toHaveAttribute('src', new URL(product.image, page.url()).href);
      await expect(dialog.locator('.image-preview-original')).toHaveAttribute('href', new URL(product.image, page.url()).href);
      await expect.poll(() => dialog.locator('img').evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);
      await expect(dialog.locator('img')).toHaveAttribute('alt', /2026-10-25/);
      await page.keyboard.press('Escape');
      await expect(dialog).not.toBeVisible();
      await expect(opener).toBeFocused();
    }
    const links = page.locator('.hero-actions');
    await expect(links.getByRole('link', { name: language === 'en' ? 'Download Full stable ↗' : '下载 Full 稳定版 ↗' })).toHaveAttribute('href', 'https://github.com/hellowmq/displaydj/releases/latest');
    await expect(links.getByRole('link', { name: language === 'en' ? 'Download Lite 0.3.0 prerelease ↗' : '下载 Lite 0.3.0 预发布版 ↗' })).toHaveAttribute('href', 'https://github.com/hellowmq/displaydj/releases/tag/lite-v0.3.0');
    await expect(page.locator('#displaydj .product-label')).toHaveText(language === 'en'
      ? ['Full 1.2.0 · stable', 'Lite 0.3.0 · prerelease']
      : ['Full 1.2.0 · 稳定版', 'Lite 0.3.0 · 预发布']);
    await expect(page.locator('#displaydj .caption')).toContainText(/FULL 1\.0\.2 \/ LITE 0\.1\.0/i);
    const tact = page.locator('.more-grid article').filter({ has: page.getByRole('heading', { name: 'Tact Taste', exact: true }) });
    await expect(tact.getByRole('link', { name: language === 'en' ? 'Try the examples ↗' : '在线体验 ↗' })).toHaveAttribute('href', 'https://tech.wenmq.cn/tact-taste/');
    await expect(tact.getByRole('link', { name: language === 'en' ? 'Watch the showreel ↗' : '看演示短片 ↗' })).toHaveAttribute('href', 'https://tech.wenmq.cn/tact-taste/showreel.html');
    const size = await page.evaluate(() => ({ content: document.documentElement.scrollWidth, viewport: window.innerWidth }));
    expect(size.content, `${language} homepage overflow`).toBeLessThanOrEqual(size.viewport);
  }
});

test('key pages render without horizontal overflow', async ({ page }) => {
  for (const route of ['/', '/notes/', '/about/', '/search/', '/404.html']) {
    await page.goto(route);
    await expect(page.locator('main')).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const size = await page.evaluate(() => ({ content: document.documentElement.scrollWidth, viewport: window.innerWidth }));
    expect(size.content, `${route} horizontal overflow`).toBeLessThanOrEqual(size.viewport);
  }
});
