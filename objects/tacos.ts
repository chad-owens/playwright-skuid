import { Locator, Page } from '@playwright/test';

export class TacoConsole {
    readonly page: Page;
    tblTacos: Locator;
    tblStaging: Locator;
    popConfig: Locator;
    tblConfigure: Locator;
    tblMenu: Locator;



    constructor(page: Page) {
        this.page = page;
        this.tblTacos = page.locator('#taco-table');
        this.tblStaging = page.locator('#staging-table');
        this.popConfig = page.getByRole('dialog', { name: 'Configure item' });
        this.tblConfigure = page.locator('#configure-table');
        this.tblMenu = page.locator('#menu-table');
    }

    async goto() {
        await this.page.goto('/taco');
        await this.tblTacos.waitFor();
    }

    /**
     * Add item to stage
     * @param {string} itemName
     * @param {boolean} applyDiscount
     */
    async addItemToStage(itemName: string, applyDiscount: boolean) {
        // Add item to staging area
        const rowTacoTable = this.page.locator('tr').filter({ hasText: itemName });
        await rowTacoTable.getByLabel('Configure').click();
        // Wait for dialog
        await this.popConfig.waitFor({ state: 'visible' });
        if (applyDiscount) {
            await this.tblConfigure.getByLabel('10% Discount').click();
        }
        await this.page.locator('#stage-item').click();

    }

    /**
     * Push items to menu
     */
    async pushItemsToMenu() {
        // Click Push items button
        await this.page.getByText('Push items to menu').click();
        // Wait for UI Blocker not visible
        const uiBlocker = this.page.getByText('Adding items to menu...');
        await uiBlocker.waitFor({ state: 'visible' });
        await uiBlocker.waitFor({ state: 'hidden' });

    }

    /**
     * Get item base price
     * @param {string} itemName
     * @returns {number}
     */
    async getItemBasePrice(itemName: string) {
        // Get item row
        const rowTacoTable = this.page.locator('tr').filter({ hasText: itemName });
        // Get price text and return number
        let strPrice = await rowTacoTable.locator('[data-cell-col="1"]').innerText();
        strPrice = strPrice.replace('$', '');
        return Number(strPrice);

    }

}