import {test, expect } from "@playwright/test";

test ('user can open homepage', async ({page}) => {
    await page.goto ('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
})

test ('homepage shows docs navigation', async ({page}) => {
    await page.goto ('https://playwright.dev/');
    await expect(page.getByRole('link', {name: 'Docs'})).toBeVisible();
})

test ('user can navigate to get started page', async ({page}) => {
    await page.goto ('https://playwright.dev/');
    await page.getByRole('link', {name : 'Docs'}).click();
    await expect(page.getByRole('heading', {name:'Installation'})).toBeVisible();
})
