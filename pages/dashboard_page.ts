
import { Page, Locator,expect} from '@playwright/test';
import Admin_Page from './admin_page'
class Dashboard_Page {
    readonly page: Page;
    readonly adminLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.adminLink = page.getByRole('link', { name: 'Admin' }).first();
    }

    async navigateToAdminPage(page: Page) {
        await this.adminLink.click();
        const adminPage = new Admin_Page(this.page)
        await expect(adminPage.adminHeader).toBeVisible();
        return adminPage;
    }
}

export default Dashboard_Page;