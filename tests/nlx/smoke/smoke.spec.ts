import { test, expect } from '../../../objects/fixture';

test.describe('Smoke Tests Login', () => {

    test('C81692: Login as Admin and verify pages list loads', async ({ page, login, pagesList }) => {
        // Get environment vatiables
        const username = process.env.SKUID_UN;
        const password = process.env.SKUID_PW;
        // Login 
        await login.goto();
        await login.login(`${username}`, `${password}`)
        await expect(page).toHaveURL(/.*\/ns\/skuid\/ui\/pages/);
        // Go to pages list
        await pagesList.goto();
        await expect(pagesList.pagesDeck).toBeVisible();

    });

});

test.describe('Smoke Tests Critical', () => {
    // Use existing cookie
    test.use({ storageState: 'cookies/admin.json' });

    test('Compose page and verify page composer opens in new tab', async ({ context, page, pagesList }) => {

        // Go to pages list
        await pagesList.goto();
        await expect(pagesList.pagesDeck).toBeVisible();
        // Click on a page to open page composer in new tab
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            page.locator('#deck-pages [data-te="skuid__grid"]').first().click()
        ])
        // Verify page open in new tab
        let newTab = newPage.locator('#toolbarWrapper');
        await newTab.waitFor();
        await expect(newTab).toBeVisible();

    });

    test('Open existing V2 page in page composer and verify basic components, models, canvas', async ({ page, pagesList }) => {
        // test data
        let td = {
            testPage: 'v2-composer-smoke',
            components: ['Wrapper', 'Button Set', 'Page Include', 'Chart'],
            model: 'Rebels',
            knownComponent: page.locator('[data-unique-id="v2-table"]')
        }
        // Go to pages list
        await pagesList.goto();
        await expect(pagesList.pagesDeck).toBeVisible();
        // Open page in composer
        await page.goto(`/ui/page/compose/${td.testPage}`);
        // Wait for page composer toolbar
        await page.locator('#toolbarWrapper').waitFor();
        // Verify some basic components
        for (let i = 0; i < td.components.length; i++) {
            await expect(page.locator('#components', { hasText: td.components[i] })).toBeVisible();
        }
        // Verify model displays
        await page.locator('[data-label="Models"]').click();
        await expect(page.locator('#models')).toContainText(td.model);
        // Verify known compoment in canvas
        await expect(td.knownComponent).toBeVisible();

    });

    test('Verify apps list loads', async ({ appsList }) => {

        // Go to apps list page
        await appsList.goto();
        await expect(appsList.btnCreate).toBeVisible();

    });

    test('Create a new app, add existing page and verify app slug loads', async ({ page, appsList }) => {
        // define test data
        let td = {
            appName: `${Date.now()}smoke`,
            grid: page.locator('#grid-home-page')
        }
        // Go to pages list
        await appsList.goto();
        await expect(appsList.btnCreate).toBeVisible();
        // Create new app
        await appsList.createNewApp(td.appName);
        // Load app url
        await page.goto(`/${td.appName}`);
        await td.grid.waitFor();
        await expect(td.grid).toBeVisible();
        // Delete freshly created app
        await appsList.goto();
        await appsList.deleteAppByName(td.appName);

    });


    test('Open existing Design System and verify loads with no errors', async ({ designList }) => {
        // define test data
        let td = {
            designName: 'AutomationDesign'
        }
        // Go to Design Systems List Page and Compose an existing design
        await designList.goto();
        await designList.composeDesign(td.designName);
        // Verify Composer tree loads
        await expect(designList.dsmComposerTree).toBeVisible();

    });

});