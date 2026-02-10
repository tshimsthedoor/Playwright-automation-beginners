import { expect, test } from '@playwright/test';

test.only('Browser Context Playwright Test', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    expect(await page.title()).toBe('LoginPage Practise | Rahul Shetty Academy');

    // input the username and password
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('Learning@830$3mK2');

    // sign in button
    await page.locator('#signInBtn').click();
});

test('Page Playwright Test', async ({page}) => {
    await page.goto('https://google.com');

    // to get the title of the page
    const title = await page.title();
    console.log(title);
    expect(title).toBe('Google');
    //expect(page.url()).toBe('https://www.google.com/');
    expect(page.url()).toContain('google');
    expect(page.url()).toMatch(/google/);
    await expect(page).toHaveTitle("Google");
    
});