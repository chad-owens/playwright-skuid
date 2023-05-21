import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  globalSetup: require.resolve('./global-setup'),
  // Max time one test can run
  timeout: 30 * 1000,
  // Default timeout for expect, can overide within expect statement
  expect: {
    timeout: 10 * 1000
  },
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
  // Reporters
  reporter: [
    ['list'],
    ['json', { outputFile: 'test-results.json' }],
  ],
  // Shared setting for all projects
  use: {
    // Maximum time for actions like click() or waitFor(), can overide 
    actionTimeout: 10 * 1000,
    // base url
    baseURL: process.env.SKUID_HOST,
    // Collect trace when retrying a failed test
    trace: 'on-first-retry',
  },

});