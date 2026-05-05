import {test, expect} from '@playwright/test'


async function loginAsStandardUser(page) {
     // Membuka baseURL dari playwright.config.js, yaitu https://www.saucedemo.com.
    await page.goto('/');

    // Mengisi form login dengan username dan password valid.
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');

    // Klik tombol Login untuk masuk ke halaman inventory.
    await page.click('[data-test="login-button"]');

    // Validasi login berhasil dengan memastikan URL mengarah ke halaman inventory.
    await expect(page).toHaveURL(/inventory/);
};

test ('User bisa melihat product yang sudah ditambahkan di cart', async({page}) => {

    // Login terlebih dahulu sebelum menambahkan product ke cart.
    await loginAsStandardUser(page);

    // Tambahkan product Sauce Labs Backpack dari halaman inventory.
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // Klik icon cart untuk membuka halaman cart.
    await page.click('[data-test="shopping-cart-link"]');

    // Validasi halaman cart berhasil terbuka.
    await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');

    // Validasi product yang ditambahkan tampil di halaman cart.
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');

});

test ('User bisa remove product dari cart page', async ({page}) => {

    // Login terlebih dahulu sebelum menambahkan product ke cart.
    await loginAsStandardUser(page);

    // Tambahkan product Sauce Labs Backpack dari halaman inventory.
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // Buka halaman cart.
    await page.click('[data-test="shopping-cart-link"]');

    // Validasi halaman cart berhasil terbuka.
    await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');

    // Klik tombol Remove untuk menghapus product dari cart.
    await page.click ('[data-test="remove-sauce-labs-backpack"]');

    // Validasi nama product tidak lagi tampil setelah product dihapus.
    await expect(page.locator('[data-test="inventory-item-name"]')).toBeHidden();
});

test ('User bisa kembali ke inventory dari cart', async ({page}) => {

    // Login terlebih dahulu sebelum membuka halaman cart.
    await loginAsStandardUser (page);

    // Buka halaman cart melalui icon cart.
    await page.click('[data-test="shopping-cart-link"]');

    // Klik Continue Shopping untuk kembali ke halaman inventory.
    await page.click('[data-test="continue-shopping"]');

    // Validasi user kembali ke halaman Products.
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');

});

test ('User bisa lanjut ke checkout dari cart', async ({page}) => {

    // Login terlebih dahulu sebelum melakukan checkout dari cart.
    await loginAsStandardUser (page);

    // Tambahkan product Sauce Labs Backpack ke cart.
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // Buka halaman cart.
    await page.click('[data-test="shopping-cart-link"]');

    // Validasi halaman cart berhasil terbuka sebelum lanjut checkout.
    await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');

    // Klik tombol Checkout untuk masuk ke halaman checkout information.
    await page.click('[data-test="checkout"]');

    // Validasi user berhasil masuk ke halaman Checkout: Your Information.
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information');
});
