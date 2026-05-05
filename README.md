# SauceDemo Playwright Automation

Automation testing project untuk website [SauceDemo](https://www.saucedemo.com/) menggunakan Playwright.

Project ini dibuat sebagai latihan dan portfolio QA Automation dengan fokus pada functional UI testing, login flow, inventory page, cart behavior, checkout flow, dan GitHub Actions CI.

## Tech Stack

- JavaScript
- Playwright Test
- Node.js
- GitHub Actions
- HTML Reporter

## Test Coverage

### Login

Test file: `tests/saucedemo/login.spec.js`

Scenario yang sudah dibuat:

- User bisa login dengan credential valid
- User tidak bisa login dengan password salah
- Locked out user tidak bisa login
- User tidak bisa login tanpa username
- User tidak bisa login tanpa password
- User bisa menutup error message login

### Inventory

Test file: `tests/saucedemo/inventory.spec.js`

Scenario yang sudah dibuat:

- User bisa melihat halaman Products setelah login
- List product tampil dengan jumlah 6 product
- User bisa menambahkan product ke cart
- Cart badge berubah menjadi 1 setelah product ditambahkan
- User bisa remove product dari inventory
- User bisa sorting product price low to high
- User bisa membuka detail product
- User bisa kembali dari detail product ke inventory
- User bisa sorting product name Z to A
- User bisa sorting product price high to low
- Cart badge hilang setelah semua product di-remove
- User bisa membuka halaman cart dari inventory
- User bisa logout dari inventory page

### Cart

Test file: `tests/saucedemo/cart.spec.js`

Scenario yang sudah dibuat:

- User bisa melihat product yang sudah ditambahkan di cart
- User bisa remove product dari cart page
- User bisa kembali ke inventory dari cart
- User bisa lanjut ke checkout dari cart

### Checkout

Test file: `tests/saucedemo/checkout.spec.js`

Scenario yang sudah dibuat:

- User bisa membuka halaman checkout information
- User tidak bisa lanjut checkout jika first name kosong
- User tidak bisa lanjut checkout jika last name kosong
- User tidak bisa lanjut checkout jika postal code kosong
- User bisa lanjut ke checkout overview
- User bisa finish order

## Project Structure

```text
.
+-- .github/
|   +-- workflows/
|       +-- playwright.yml
+-- pages/
|   +-- CartPage.js
|   +-- CheckoutPage.js
|   +-- InventoryPage.js
|   +-- LoginPage.js
+-- tests/
|   +-- saucedemo/
|       +-- cart.spec.js
|       +-- checkout.spec.js
|       +-- inventory.spec.js
|       +-- login.spec.js
+-- utils/
|   +-- testdata.js
+-- package.json
+-- playwright.config.js
```

## Setup

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Run Tests

Run all tests:

```bash
npm test
```

Run tests with clean report/results first:

```bash
npm run test:clean
```

Run tests in headed mode:

```bash
npm run test:headed
```

Run only SauceDemo login tests:

```bash
npx playwright test tests/saucedemo/login.spec.js
```

Run only SauceDemo inventory tests:

```bash
npx playwright test tests/saucedemo/inventory.spec.js
```

Run only SauceDemo cart tests:

```bash
npx playwright test tests/saucedemo/cart.spec.js
```

Run only SauceDemo checkout tests:

```bash
npx playwright test tests/saucedemo/checkout.spec.js
```

Open HTML report:

```bash
npm run report
```

## Playwright Config

Base URL sudah diset di `playwright.config.js`:

```js
baseURL: 'https://www.saucedemo.com'
```

Test berjalan di 3 browser:

- Chromium
- Firefox
- WebKit

Artifact yang aktif:

- Screenshot hanya saat test gagal
- Video hanya saat test gagal
- Trace saat retry pertama

## GitHub Actions

Workflow CI ada di:

```text
.github/workflows/playwright.yml
```

Workflow akan berjalan saat:

- Push ke branch `main` atau `master`
- Pull request ke branch `main` atau `master`

CI menjalankan:

```bash
npm ci
npx playwright install --with-deps
npx playwright test
```

HTML report akan diupload sebagai artifact dengan nama `playwright-report`.

## Test Account

Credential SauceDemo:

```text
username: standard_user
password: secret_sauce
```

Negative login user:

```text
locked_out_user
```

## Notes

Project ini masih dikembangkan bertahap. Next coverage yang bisa ditambahkan:

- Test data management
- Page Object Model implementation
- Shared test fixtures
- Additional checkout overview validation
- Visual or API testing practice
