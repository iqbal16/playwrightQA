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

async function addBackpackAndOpenCart(page) {
    // Tambahkan product Sauce Labs Backpack ke cart dari halaman inventory.
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // Klik icon cart untuk membuka halaman cart.
    await page.click('[data-test="shopping-cart-link"]');

    // Validasi halaman cart berhasil terbuka.
    await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');

    // Validasi product yang ditambahkan muncul di halaman cart.
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
};


test ('User bisa membuka halaman checkout information', async ({page}) => {

    // Login sebagai standard_user sebelum melakukan checkout.
    await loginAsStandardUser(page);

    // Tambahkan product ke cart lalu buka halaman cart.
    await addBackpackAndOpenCart(page);

    // Klik tombol Checkout untuk masuk ke halaman checkout information.
    await page.click('[data-test="checkout"]');

    // Validasi URL sudah masuk ke step pertama checkout.
    await expect(page).toHaveURL(/checkout-step-one/);

    // Validasi title halaman checkout information.
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information');
});

test ('User tidak bisa lanjut checkout jika first name kosong', async ({page}) => {

    // Login dan buka halaman cart dengan product yang sudah ditambahkan.
    await loginAsStandardUser(page);
    await addBackpackAndOpenCart(page);

    // Masuk ke halaman checkout information.
    await page.click('[data-test="checkout"]');

    // Isi hanya last name dan postal code, first name sengaja dikosongkan.
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12324');

    // Klik Continue untuk memicu validasi form.
    await page.click('[data-test="continue"]');

    // Validasi error yang muncul saat first name kosong.
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: First Name is required');

});

test ('User tidak bisa lanjut checkout jika last name kosong', async ({page}) => {
    
    // Login dan buka halaman cart dengan product yang sudah ditambahkan.
    await loginAsStandardUser(page);
    await addBackpackAndOpenCart(page);

    // Masuk ke halaman checkout information.
    await page.click('[data-test="checkout"]');

    // Isi first name dan postal code, last name sengaja dikosongkan.
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="postalCode"]', '12324');

    // Klik Continue untuk memicu validasi form.
    await page.click('[data-test="continue"]');

    // Validasi error yang muncul saat last name kosong.
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: Last Name is required');

});

test ('User tidak bisa lanjut checkout jika postal code kosong', async ({page}) => {
        
    // Login dan buka halaman cart dengan product yang sudah ditambahkan.
    await loginAsStandardUser(page);
    await addBackpackAndOpenCart(page);

    // Masuk ke halaman checkout information.
    await page.click('[data-test="checkout"]');

    // Isi first name dan last name, postal code sengaja dikosongkan.
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');

    // Klik Continue untuk memicu validasi form.
    await page.click('[data-test="continue"]');

    // Validasi error yang muncul saat postal code kosong.
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: Postal Code is required');

});

test ('User bisa lanjut ke checkout overview', async ({page}) => {
    
    // Login dan buka halaman cart dengan product yang sudah ditambahkan.
    await loginAsStandardUser(page);
    await addBackpackAndOpenCart(page);

    // Masuk ke halaman checkout information.
    await page.click('[data-test="checkout"]');

    // Isi semua field checkout information dengan data valid.
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12324');

    // Klik Continue untuk lanjut ke halaman checkout overview.
    await page.click('[data-test="continue"]');

    // Validasi user berhasil masuk ke step kedua checkout.
    await expect(page).toHaveURL(/checkout-step-two/);

    // Validasi title halaman checkout overview.
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');
});

test ('User bisa finish order', async ({page}) => {

    // Login dan buka halaman cart dengan product yang sudah ditambahkan.
    await loginAsStandardUser(page);
    await addBackpackAndOpenCart(page);

    // Masuk ke halaman checkout information.
    await page.click('[data-test="checkout"]');

    // Isi semua field checkout information dengan data valid.
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12324');

    // Klik Continue untuk lanjut ke halaman checkout overview.
    await page.click('[data-test="continue"]');

    // Validasi user berhasil masuk ke checkout overview sebelum menyelesaikan order.
    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');

    // Klik Finish untuk menyelesaikan order.
    await page.click('[data-test="finish"]');

    // Validasi user berhasil masuk ke halaman checkout complete.
    await expect(page).toHaveURL(/checkout-complete/);

    // Validasi title dan pesan sukses setelah order selesai.
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Complete!');
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');

});
