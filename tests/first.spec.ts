/// <reference types="node" />
import { test, expect } from '../fixtures/auth'
import Dashboard_Page from '../pages/dashboard_page'
import Admin_Page from '../pages/admin_page';


test('This is the first test to check CICD', async ({ authenticatedPage  }) => {

  await expect(authenticatedPage.getByRole('heading', { name: 'Dashboard' })).toBeVisible();


});

test('Add, Search and Delete User.', async({authenticatedPage})=>{
  await expect(authenticatedPage.getByRole('heading', { name: 'Dashboard' })).toBeVisible({ timeout: 30000 });
  const dashboard = new Dashboard_Page(authenticatedPage);
  const adminPage = await dashboard.navigateToAdminPage(authenticatedPage);
  const adduserpage = await adminPage.navigateToAddUserPage(authenticatedPage);
  await adduserpage.createUser('ashu', '12345');

})
  