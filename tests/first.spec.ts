/// <reference types="node" />
import { test, expect } from '../fixtures/auth'
import Dashboard_Page from '../pages/dashboard_page'
import Admin_Page from '../pages/admin_page';

test('This is the first test to check CICD', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});

test('Add, Search and Delete User.', async({page})=>{
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({ timeout: 30000 });
  const dashboard = new Dashboard_Page(page);
  const adminPage = await dashboard.navigateToAdminPage(page);
  const adduserpage = await adminPage.navigateToAddUserPage(page);
  await adduserpage.createUser('ashut', 'c1234567');
  //await adminPage.searchUser('ashut');


})
  