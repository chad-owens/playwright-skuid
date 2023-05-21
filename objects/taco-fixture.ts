import { test as base } from '@playwright/test';
import { TacoConsole } from './tacos';

// Declare the types
type MyFixtures = {
    tacoConsole: TacoConsole;
};

// Extend base tests and add page objects
export const test = base.extend<MyFixtures>({

    tacoConsole: async ({ page }, use) => {
        await use(new TacoConsole(page));
    }

});

export { expect } from '@playwright/test';