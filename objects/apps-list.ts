import { Locator, Page } from '@playwright/test';

export class AppsList {
    readonly page: Page;
    appsList: Locator;
    btnCreate: Locator;

    constructor(page: Page) {
        this.page = page;
        this.appsList = page.locator('#deck-pages');
        this.btnCreate = page.locator('#button-apps-create');
    }

    /**
     * Go to app list page
     */
    async goto() {
        await this.page.goto('ns/skuid/ui/apps');
        await this.btnCreate.waitFor({ timeout: 10 * 1000 });
    }

    /**
     * Create new app with app name
     * @param {string} appName 
     */
    async createNewApp(appName: string) {
        // Click Create Button
        await this.btnCreate.click();
        // Fill in required fields for New App
        let inpAppName = this.page.locator('#field-app-new-name input');
        await inpAppName.fill(appName);
        // Save/Create New App
        await this.page.locator('#button-trigger-new-app-creation button').click();
        await this.page.waitForNavigation();
        await this.page.locator('[data-te="skuid__uiBlocker"]').waitFor({ state: 'hidden' });
        await this.page.locator('#header-app-detail').waitFor();
        // Add page to app
        // Click Add Existing Page 
        await this.page.locator('#button-acdpages-empty-state-add-button, #button-acdpages-add-button').click();
        // Choose an existing page
        await this.page.locator('#sk-2Okk-190348 input').fill('v2-home-page');
        await this.page.locator('li', { hasText: 'v2-home-page' }).click();
        // Click Save and Next button
        await this.page.locator('#button-addpagetoapp-saveandnext-button').click();
        // Click Save & Close
        await this.page.locator('#button-addpagetoapp-pageurls-saveandclose-button').click();
        // Wait for App detail page header
        await this.page.locator('#header-app-detail').waitFor();
        await this.page.locator('[data-te="skuid__uiBlocker"]', { hasText: 'Saving...' }).waitFor({ state: 'hidden' });
        await this.page.locator('#deck-acdpages').waitFor();

    }

    /**
     * Search apps by query string
     * @param {string} queryString App to search for
     * @param {number} [waitTime = 10 *1000] The amount of ms to wait for element
     */
    async searchForApp(queryString: string, waitTime: number = 10 * 1000) {
        // Wait for search input and enter search term
        await this.page.locator('#filterset-apps input').fill(queryString);
        // wait for UI Blockers
        let blocker = this.page.locator('[id^="deck-apps"][data-te="skuid__uiBlocker"]');
        await blocker.waitFor({ state: 'hidden', timeout: waitTime });

    }

    /**
     * Searches for exact appName to delete then deletes
     * @param {string} appName The name of the page you want to delete
     */
    async deleteAppByName(appName: string) {
        // Search for an app
        await this.searchForApp(appName);
        // Wait for App Name
        let gridAppName = this.page.locator('#deck-apps [data-te="skuid__grid"]', { hasText: appName }).first();
        await gridAppName.waitFor();
        await gridAppName.locator('#button-app-menuoptions-homepagefound-button').click();
        // Click on Delete menu item
        await this.page.locator('[id^="button-app-menuoptions"] li', { hasText: 'Delete' }).click();
        // Confirm the delete
        await this.page.locator('#button-permanent-delete-app').click();
        // Wait for the App deleted message
        let appDeletedMessage = this.page.locator('[data-te="skuid__toast"]');
        await appDeletedMessage.waitFor();

    }

}