import { expect, test } from '@playwright/test';

const VALID_USER = 'rahulshettyacademy';
const VALID_PASS = 'Learning@830$3mK2';
const LOGIN_PAGE_URL = 'https://rahulshettyacademy.com/loginpagePractise/';
const LOGIN_PAGE_TITLE = 'LoginPage Practise | Rahul Shetty Academy';

async function login(page, username, password) {
    await page.locator('#username').fill(username);
    await page.locator('#password').fill(password);
    await page.locator('#signInBtn').click();
    await page.waitForTimeout(600);
}

test.describe('Login Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(LOGIN_PAGE_URL);
    });

    test('✅ Valid login - no error shown', async ({ page }) => {
        await login(page, VALID_USER, VALID_PASS);
        await expect(page.locator('[style*="block"]')).toHaveCount(0);
    });

    test('✅ Valid login - shows courses', async ({ page }) => {
        await login(page, VALID_USER, VALID_PASS);
        const text = await page.locator('body').textContent();
        expect(text).toContain('Learn');
    });

    test('❌ Wrong username - shows error', async ({ page }) => {
        await login(page, 'wronguser', VALID_PASS);
        await expect(page.locator('[style*="block"]')).toContainText('Incorrect');
    });

    test('❌ Wrong password - shows error', async ({ page }) => {
        await login(page, VALID_USER, 'wrongpass');
        await expect(page.locator('[style*="block"]')).toContainText('Incorrect');
    });

    test('⚠️ Empty username - shows error', async ({ page }) => {
        await login(page, '', VALID_PASS);
        const hasError = await page.locator('[style*="block"]').isVisible().catch(() => false);
        expect(hasError).toBe(true);
    });

    test('⚠️ Empty password - shows error', async ({ page }) => {
        await login(page, VALID_USER, '');
        const hasError = await page.locator('[style*="block"]').isVisible().catch(() => false);
        expect(hasError).toBe(true);
    });

    test('🔐 Username is case sensitive', async ({ page }) => {
        await login(page, VALID_USER.toUpperCase(), VALID_PASS);
        await expect(page.locator('[style*="block"]')).toContainText('Incorrect');
    });

    test('🔐 Password is case sensitive', async ({ page }) => {
        await login(page, VALID_USER, VALID_PASS.toLowerCase());
        await expect(page.locator('[style*="block"]')).toContainText('Incorrect');
    });

    test('📝 Username input visible', async ({ page }) => {
        await expect(page.locator('#username')).toBeVisible();
    });

    test('📝 Password input visible', async ({ page }) => {
        await expect(page.locator("[type='password']")).toBeVisible();
    });

    test('📝 Sign in button visible', async ({ page }) => {
        await expect(page.locator('#signInBtn')).toBeVisible();
    });

    test('⌨️ Can type in username field', async ({ page }) => {
        await page.locator('#username').fill('test');
        expect(await page.locator('#username').inputValue()).toBe('test');
    });

    test('⌨️ Can type in password field', async ({ page }) => {
        await page.locator("[type='password']").fill('pass');
        expect(await page.locator("[type='password']").inputValue()).toBe('pass');
    });

    test('⌨️ Can clear username', async ({ page }) => {
        const field = page.locator('#username');
        await field.fill('text');
        await field.clear();
        expect(await field.inputValue()).toBe('');
    });

    test('⌨️ Can clear password', async ({ page }) => {
        const field = page.locator("[type='password']");
        await field.fill('pass');
        await field.clear();
        expect(await field.inputValue()).toBe('');
    });

    test('🔤 Handles long username', async ({ page }) => {
        await login(page, 'a'.repeat(100), VALID_PASS);
        const text = await page.locator('body').textContent();
        expect(text).toBeTruthy();
    });

    test('🔢 Rejects numeric username', async ({ page }) => {
        await login(page, '12345678', VALID_PASS);
        await expect(page.locator('[style*="block"]')).toContainText('Incorrect');
    });

    test('🔢 Rejects numeric password', async ({ page }) => {
        await login(page, VALID_USER, '12345678');
        await expect(page.locator('[style*="block"]')).toContainText('Incorrect');
    });

    // test('➖ Spaces prefix fails login', async ({ page }) => {
    //     await login(page, '  ' + VALID_USER, VALID_PASS);
    //     const hasError = await page.locator('[style*="block"]').isVisible().catch(() => false);
    //     expect(hasError).toBe(true);
    // });

    test('📄 Page title is correct', async ({ page }) => {
        await expect(page).toHaveTitle(LOGIN_PAGE_TITLE);
    });

    test('🔄 Multiple failed attempts allowed', async ({ page }) => {
        for (let i = 0; i < 2; i++) {
            await login(page, VALID_USER, 'wrong');
            await page.reload();
        }
        await login(page, VALID_USER, VALID_PASS);
        await expect(page.locator('[style*="block"]')).toHaveCount(0);
    });

    test('💡 First course name shown', async ({ page }) => {
        await login(page, VALID_USER, VALID_PASS);
        const course = await page.locator('.card-body a').first().textContent();
        expect(course).toBeTruthy();
    });
});

// ============= PAGE NAVIGATION TESTS =============
test('🌐 Should navigate to login page successfully', async ({ page }) => {
    await page.goto(LOGIN_PAGE_URL);
    await expect(page).toHaveTitle(LOGIN_PAGE_TITLE);
    
    const loginForm = page.locator('#signInBtn');
    await expect(loginForm).toBeVisible();
});

test('🌐 Google homepage should have correct title', async ({ page }) => {
    await page.goto('https://google.com');
    await expect(page).toHaveTitle('Google');
    expect(page.url()).toContain('google');
});