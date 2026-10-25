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

test('key pages render without horizontal overflow', async ({ page }) => {
  for (const route of ['/', '/notes/', '/about/', '/search/', '/404.html']) {
    await page.goto(route);
    await expect(page.locator('main')).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const size = await page.evaluate(() => ({ content: document.documentElement.scrollWidth, viewport: window.innerWidth }));
    expect(size.content, `${route} horizontal overflow`).toBeLessThanOrEqual(size.viewport);
  }
});
