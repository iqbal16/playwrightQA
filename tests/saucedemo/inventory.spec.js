import {test, expect} from '@playwright/test'

// Helper function untuk login sebagai standard_user.
// Tujuannya supaya step login tidak perlu ditulis berulang di setiap test inventory.
async function loginAsStandardUser (page) {
    // Membuka baseURL dari playwright.config.js, yaitu https://www.saucedemo.com.
    await page.goto('/');

    // Mengisi form login dengan username dan password valid.
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');

    // Klik tombol Login untuk masuk ke halaman inventory.
    await page.click('[data-test="login-button"]');

    // Validasi login berhasil dengan memastikan URL mengarah ke halaman inventory.
    await expect(page).toHaveURL(/inventory/);
}

test ('user bisa melihat halaman products setelah login', async ({page}) => {
    // Login terlebih dahulu karena halaman Products hanya bisa diakses setelah login.
    await loginAsStandardUser(page);

    // Validasi title halaman inventory menampilkan text Products.
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});

test ('list product tampil', async ({page}) => {
    // Login terlebih dahulu sebelum memvalidasi daftar product.
    await loginAsStandardUser(page);

    // Validasi jumlah product card yang tampil di halaman inventory adalah 6 item.
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
});

test ('user bisa add product ke cart', async ({page}) => {
    // Login terlebih dahulu sebelum melakukan aksi add to cart.
    await loginAsStandardUser(page);

    // Klik tombol Add to cart pada product Sauce Labs Backpack.
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // Setelah product berhasil ditambahkan, tombol Add to cart berubah menjadi Remove.
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
});

test ('cart badge berubah jadi 1', async ({page}) => {
    // Login terlebih dahulu sebelum menambahkan product ke cart.
    await loginAsStandardUser(page);

    // Tambahkan satu product ke cart.
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // Validasi tombol Remove muncul sebagai tanda product sudah masuk ke cart.
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();

    // Validasi badge cart muncul dan menampilkan angka 1.
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("1");
});

test ('user bisa remove product dari inventory', async ({page}) => {
    // Login terlebih dahulu sebelum menambahkan dan menghapus product.
    await loginAsStandardUser(page);

    // Tambahkan product ke cart.
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // Pastikan tombol Remove muncul setelah product berhasil ditambahkan.
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();

    // Klik tombol Remove untuk menghapus product dari cart.
    await page.click('[data-test="remove-sauce-labs-backpack"]');

    // Setelah product dihapus, tombol Add to cart muncul kembali.
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
});

test ('user dapat melakukan sorting product price low to high', async ({page}) => {
    // Login terlebih dahulu sebelum melakukan sorting product.
    await loginAsStandardUser(page);

    // Pilih opsi Price low to high pada dropdown sorting.
    // Value "lohi" adalah value option SauceDemo untuk harga dari rendah ke tinggi.
    await page.selectOption('[data-test="product-sort-container"]','lohi');

    // Setelah sorting low to high, product pertama harus Sauce Labs Onesie.
    await expect(page.locator('[data-test="inventory-item-name"]').first()).toHaveText('Sauce Labs Onesie');
});

test ('user dapat membuka detail product', async ({page}) => {
    // Login terlebih dahulu sebelum membuka halaman detail product.
    await loginAsStandardUser(page);

    // Klik nama product Sauce Labs Backpack dari halaman inventory.
    // item-4-title-link adalah locator khusus untuk link product Sauce Labs Backpack.
    await page.click('[data-test="item-4-title-link"]');

    // Validasi user berhasil masuk ke halaman detail product.
    await expect(page).toHaveURL(/inventory-item/)

    // Validasi nama product pada halaman detail sesuai dengan product yang diklik.
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText("Sauce Labs Backpack");
});

test ('user dapat kembali ke inventory product', async ({page}) => {
    // Login terlebih dahulu sebelum membuka detail product.
    await loginAsStandardUser (page);

    // Buka detail product Sauce Labs Backpack.
    await page.click('[data-test="item-4-title-link"]');

    // Klik tombol Back to products untuk kembali ke halaman inventory.
    await page.click('[data-test="back-to-products"]');

    // Validasi halaman kembali ke inventory dengan title Products.
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});

test ('user bisa melakukan sorting name z to a', async ({page}) => {
    // Login terlebih dahulu sebelum melakukan sorting product.
    await loginAsStandardUser (page);

    // Pilih opsi Name Z to A pada dropdown sorting.
    // Value "za" adalah value option SauceDemo untuk sorting nama dari Z ke A.
    await page.selectOption('[data-test="product-sort-container"]','za');

    // Setelah sorting Z to A, product pertama harus Test.allTheThings() T-Shirt (Red).
    await expect(page.locator('[data-test="inventory-item-name"]').first()).toHaveText("Test.allTheThings() T-Shirt (Red)");
});

test ('user bisa melakukan sorting price high to low', async ({page}) => {
    // Login terlebih dahulu sebelum melakukan sorting product.
    await loginAsStandardUser (page);

    // Pilih opsi Price high to low pada dropdown sorting.
    // Value "hilo" adalah value option SauceDemo untuk harga dari tinggi ke rendah.
    await page.selectOption('[data-test="product-sort-container"]','hilo');

    // Setelah sorting high to low, product pertama harus Sauce Labs Fleece Jacket.
    await expect(page.locator('[data-test="inventory-item-name"]').first()).toHaveText("Sauce Labs Fleece Jacket");
});

test ('badge pada cart berhasil hilang setelah remove', async ({page}) => {
    // Login terlebih dahulu sebelum menambahkan product ke cart.
    await loginAsStandardUser (page);

    // Tambahkan dua product ke cart supaya badge cart muncul.
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');

    // Hapus kedua product dari cart melalui tombol Remove di halaman inventory.
    await page.click('[data-test="remove-sauce-labs-backpack"]');
    await page.click('[data-test="remove-sauce-labs-bike-light"]');

    // Setelah semua product dihapus, badge cart tidak lagi tampil.
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toBeHidden();
});

test ('user bisa membuka halaman cart dari inventory', async ({page}) => {
    // Login terlebih dahulu sebelum membuka halaman cart.
    await loginAsStandardUser (page);

    // Tambahkan product ke cart agar halaman cart memiliki item untuk divalidasi di flow berikutnya.
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // Klik icon cart di kanan atas untuk berpindah ke halaman cart.
    await page.click('[data-test="shopping-cart-link"]');

    // Validasi user berhasil masuk ke halaman cart.
    await expect(page).toHaveURL(/cart/);

    // Validasi title halaman cart adalah Your Cart.
    await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
});

test ('user bisa logout dari inventory page', async ({page}) => {
    // Login terlebih dahulu sebelum melakukan logout.
    await loginAsStandardUser (page);

    // Klik button burger menu untuk membuka sidebar menu.
    // Selector #react-burger-menu-btn dipakai karena data-test="open-menu" berada di icon gambar,
    // sedangkan element yang benar-benar menerima klik adalah button wrapper-nya.
    await page.click('#react-burger-menu-btn');

    // Klik menu Logout pada sidebar.
    await page.click('[data-test="logout-sidebar-link"]');

    // Validasi user kembali ke halaman login SauceDemo.
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    // Validasi tombol Login muncul kembali sebagai tanda user sudah logout.
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});
