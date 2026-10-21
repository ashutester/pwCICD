import { test, expect } from '@playwright/test';

test('This is a valid Playwright example', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});
