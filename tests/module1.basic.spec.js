import {test, expect } from "@playwright/test";

test ('Membuka Halaman Playwright', async ({page}) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);

}
);

test ('Menampilkan Tulisan Get Started di Homepage', async ({page})=>{
    await page.goto('https://playwright.dev');
    await expect(page.getByRole('link', {name: 'Get Started'})).toBeVisible();
});

test ('User Dapat click get started', async ({page}) => {
    await page.goto('https://playwright.dev');
    await page.getByRole('link', {name : 'Get started'}).click();
    await expect(page.getByRole('heading', {name: 'Installation'})).toBeVisible()
});