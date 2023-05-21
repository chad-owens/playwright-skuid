import { test, expect } from '../../../objects/taco-fixture';

test.describe('Admin Console Tests', () => {

    test('Load admin console page and verify taco list exists', async ({ tacoConsole }) => {
        // Load admin console page
        await tacoConsole.goto();
        // Verify taco table contains expected
        await expect(tacoConsole.tblTacos).toContainText('Tacos');

    });

    test('Add item to staging and push to menu', async ({ page, tacoConsole }) => {
        // Test data
        let td = {
            itemName: 'Crunchy Taco',
            applyDiscount: false
        }
        // Load admin console page
        await tacoConsole.goto();
        // Add item to staging
        await tacoConsole.addItemToStage(td.itemName, td.applyDiscount);
        await expect(tacoConsole.tblStaging).toContainText(td.itemName);
        // Push items to menu
        await tacoConsole.pushItemsToMenu();
        await expect(tacoConsole.tblMenu).toContainText(td.itemName);
        
    });

    test('Add discounted item to staging and push to menu', async ({ page, tacoConsole }) => {
        // Test data
        let td = {
            itemName: 'Chalupa Supreme',
            applyDiscount: true
        }
        // Load admin console page
        await tacoConsole.goto();
        // Add item to staging
        await tacoConsole.addItemToStage(td.itemName, td.applyDiscount);
        await expect(tacoConsole.tblStaging).toContainText(td.itemName);
        // Push items to menu
        await tacoConsole.pushItemsToMenu();
        await expect(tacoConsole.tblMenu).toContainText(td.itemName);
        
    });

});