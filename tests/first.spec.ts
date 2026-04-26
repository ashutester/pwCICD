import { test, expect } from '@playwright/test';

test('This is the first test to check CICD', async ({ page }) => {
  const username = process.env.APP_USERNAME!;
  const password = process.env.APP_PASSWORD!;
  page.goto(
    'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
  );
  await page.getByRole('textbox', { name: 'Username' }).fill(username);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
