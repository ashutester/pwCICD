
import { test as base, expect, type Page } from '@playwright/test';

import dotenv from 'dotenv';
dotenv.config();

type MyFixtures = {
  authenticatedPage: Page; // or use Page type from '@playwright/test'
};
const test = base.extend<MyFixtures>({

  authenticatedPage: async ({ page }, use) => {

    const username = process.env.APP_USERNAME!;
    const password = process.env.APP_PASSWORD!;
    await page.goto(
      'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    );
    await page.getByRole('textbox', { name: 'Username' }).fill(username);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    await use(page);
  }
})

export { expect, test }