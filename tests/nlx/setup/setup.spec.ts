import { test } from '@playwright/test';
import { request } from '@playwright/test';

const baseURL = process.env.SKUID_HOST;
const username = process.env.SKUID_UN;
const password = process.env.SKUID_PW;

// Use /login endpoint to login as admin role
test('authenticate as admin', async () => {
    const requestContext = await request.newContext();
    await requestContext.post(`${baseURL}/api/v1/auth/login`, {
        form: {
            username: `${username}`,
            password: `${password}`
        },
    });

    await requestContext.storageState({ path: 'cookies/admin.json' });
    await requestContext.dispose();
});

// Use /login endpoint to login as standard role
test('authenticate as standard', async () => {
    const requestContext = await request.newContext();
    await requestContext.post(`${baseURL}/api/v1/auth/login`, {
        form: {
            username: `${username}`,
            password: `${password}`
        },
    });

    await requestContext.storageState({ path: 'cookies/standard.json' });
    await requestContext.dispose();
});