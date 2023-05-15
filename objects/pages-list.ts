import { BrowserContext, Locator, Page } from "@playwright/test";
const { IS_SALESFORCE } = process.env;

export class PagesList {
    readonly page: Page;
    readonly context: BrowserContext;
    btnCreate: Locator;
    pagesDeck: Locator;

    constructor(page: Page) {
        this.page = page;
        this.btnCreate = page.locator("#button-pages-create");
        this.pagesDeck = page.locator("#deck-pages");
    }

    async goto() {
        if (IS_SALESFORCE === 'true') {
            await this.page.goto("/apex/skuid__PageList");
        } else {
            await this.page.goto("/ns/skuid/ui/pages");
        }
    }

    /**
     * Open a page in Composer
     */
    async composePage() {
        // Click page in deck to compose, wait for new tab
        const [newPage] = await Promise.all([
            this.context.waitForEvent("page"),
            this.page.locator('#deck-pages [data-te="skuid__grid"]').first().click(),
        ]);

        await newPage.locator("#toolbarWrapper").waitFor();
        return newPage;
    }
}
