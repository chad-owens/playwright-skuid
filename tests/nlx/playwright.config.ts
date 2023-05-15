import { defineConfig, devices } from '@playwright/test';
import baseConfig from '../../playwright.config';

export default defineConfig({
    ...baseConfig,
    projects: [
        {
            name: 'setup',
            testDir: '../../tests/nlx/setup'
        },
        {
            name: 'smoke',
            testDir: '../../tests/nlx/smoke',
            use: { ...devices['Desktop Chrome'] },
            dependencies: ['setup']
        }
    ]
});