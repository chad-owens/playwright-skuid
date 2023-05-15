import { Locator, Page } from '@playwright/test';

export class DesignList {
    readonly page: Page;
    designSystemList: Locator;
    dsmComposerTree: Locator;

    constructor(page: Page) {
        this.page = page;
        this.designSystemList = page.locator('#deck-designsystems');
        this.dsmComposerTree = page.locator('[data-te="skuidbuilder__composerTree"]');
    }

    async goto() {
        await this.page.goto('ns/skuid/ui/design');
        await this.designSystemList.waitFor();
    }

    /**
     * Search the Design List
     * @param {string} name Design to search for
     * @param {number} [waitTime = 10 *1000] The amount of ms to wait for element
     */
    async searchForDesign(name: string, waitTime: number = 10 * 1000) {
        // Wait for search input and enter search term
        await this.page.locator('#filterset-designsystem-search input, #filterset-designsystems input').fill(name);
        // wait for UI Blockers
        let blocker = this.page.locator('#deck-designsystems [data-te="skuid__uiBlocker"]');
        await this.page.waitForTimeout(1 * 1000);
        await blocker.waitFor({ state: 'hidden', timeout: waitTime });
    }

    /**
     * Search for and Compose a Design 
     * @param {string} name Name of Design
     */
    async composeDesign(name: string) {
        // Search for Design
        await this.searchForDesign(name);
        // Wait for Design Name
        let gridAppName = this.page.locator('#deck-designsystems [data-te="skuid__grid"]', { hasText: name }).first();
        // await gridAppName.waitFor();
        // Click on Design System card
        await gridAppName.click();
        // Wait for Composer
        await this.page.waitForNavigation();
        await this.dsmComposerTree.waitFor();
    }

}