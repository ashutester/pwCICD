
import { Page, Locator } from '@playwright/test';

class Add_User_Page {
    readonly page: Page;
    readonly selectUserRole: Locator;
    readonly adminOption: Locator;
    readonly selectStatus: Locator;
    readonly txtUsername: Locator;
    readonly txtPassword: Locator;
    readonly txtConfirmPassword: Locator;
    readonly txtBxHints: Locator;
    readonly enabledOption: Locator;
    readonly btnSave: Locator;

    constructor(page: Page) {
        this.page = page;
        this.selectUserRole  = page.locator(".oxd-select-text-input").first();
        this.adminOption =  page.locator("//span[contains(text(),'Admin')]")
        this.selectStatus = page.locator(".oxd-select-text-input").last();
        this.txtUsername =  page.locator("//label[text()='Username']/../following-sibling::div//input");
        this.txtPassword = page.locator("//label[text()='Password']/../following-sibling::div//input");
        this.txtConfirmPassword = page.locator("//label[text()='Confirm Password']/../following-sibling::div//input");
        this.txtBxHints =  page.getByPlaceholder('Type for hints...')
        this.enabledOption = page.locator("//span[contains(text(),'Enabled')]")
        this.btnSave = page.getByRole('button', { name: 'Save' })
    }
    async createUser(username: string, password: string){
        await this.selectUserRole.click();
        await this.adminOption.click();
        await this.selectStatus.click();
        await this.enabledOption.click();
        await this.txtUsername.fill(username);
        await this.txtBxHints.pressSequentially("Rahul  Das");
        await this.page.getByText('Rahul Das').first().click();
        await this.txtPassword.fill(password);
        await this.txtConfirmPassword.fill(password);
        await this.btnSave.click();
    }

}

export default Add_User_Page;