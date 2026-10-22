
import { Page, Locator, expect } from '@playwright/test';
import Add_User_Page from '../pages/add_user_page'

class Admin_Page {
    readonly page: Page;
    readonly adminHeader: Locator;
    readonly btnAdd : Locator;
    readonly btnSearch : Locator;
    readonly selectUserRole : Locator;
    readonly adminOption : Locator;
    readonly txtBxHints : Locator;
    readonly selectStatus: Locator;

    constructor(page: Page) {
        this.page = page;
        this.adminHeader = page.getByRole('heading', { name: 'Admin' })
        this.btnAdd = page.getByRole('button', { name: 'Add' })
        this.btnSearch =  page.getByRole('button', { name: 'Search' })
        this.selectUserRole  = page.locator(".oxd-select-text-input").first();
        this.adminOption =  page.locator("//span[contains(text(),'Admin')]")
        this.txtBxHints =  page.getByPlaceholder('Type for hints...')
        this.selectStatus = page.locator(".oxd-select-text-input").last();
    }

    async navigateToAddUserPage(page: Page){
            await this.btnAdd.click();
            const addUserPage = new Add_User_Page(this.page)
            await expect(addUserPage.txtBxHints).toBeVisible();
            return addUserPage;
        }
}

export default Admin_Page;