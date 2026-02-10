import { expect, test } from '@playwright/test';

// Use env vars for credentials to avoid committing secrets.
const VALID_USER = process.env.TEST_USER || '';
const VALID_PASS = process.env.TEST_PASS || '';

test.describe('Login tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
        await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    });

    test('valid credentials should not show error', async ({ page }) => {
        // Provide credentials via environment variables in CI or local runs
        await page.locator('#username').fill(VALID_USER);
        await page.locator('#password').fill(VALID_PASS);
        await page.locator('#signInBtn').click();

        // Assert that the visible error alert is not shown
        await expect(page.locator('[style*="block"]')).toHaveCount(0);
    });

    test('shows error for invalid credentials', async ({ page }) => {
        await page.locator('#username').fill('invalid_user');
        await page.locator('#password').fill('invalid_pass');
        await page.locator('#signInBtn').click();

        const alert = page.locator('[style*="block"]');
        await expect(alert).toHaveText('Incorrect username/password.');
    });
});

test('Page Playwright Test', async ({ page }) => {
    await page.goto('https://google.com');
    await expect(page).toHaveTitle('Google');
    expect(page.url()).toContain('google');
    expect(page.url()).toMatch(/google/);
});