import { defineConfig, devices } from '@playwright/test';
import baseConfig from '../../playwright.config';

export default defineConfig({
    ...baseConfig,
    projects: [
        {
            name: 'admin',
            testDir: '../../tests/tacos/admin',
            use: { ...devices['Desktop Chrome'] }
        }
    ]
});