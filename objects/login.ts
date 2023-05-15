import { Locator, Page } from '@playwright/test';

export class Login {
    readonly page: Page;
    inpUsername: Locator;
    inpPassword: Locator;
    btnLogin: Locator;


    constructor(page: Page) {
        this.page = page;
        this.inpUsername = page.locator('#username-input-field input');
        this.inpPassword = page.locator('#password-input-field input');
        this.btnLogin = page.locator('#userpass-login-button-button');
    }

    async goto() {
        await this.page.goto('ui/login?next=pages');
        await this.inpPassword.waitFor();
    }

    /**
     * Login
     * @param {string} username
     * @param {string} password
     */
    async login(username: string, password: string) {
        await this.inpUsername.fill(username);
        await this.inpPassword.fill(password);
        await this.btnLogin.click();

    }

}