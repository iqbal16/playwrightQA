import {test, expect} from '@playwright/test'

//positive case
test('user can login successfully', async ({page}) => { 
   
    await page.goto('/'); //artinya buka baseURL dari playwright.config.js, yaitu SauceDemo.

    await page.fill('[data-test="username"]', 'standard_user'); //fill berfungsi untuk melakukan input cthnya : input username
    await page.fill('[data-test="password"]', 'secret_sauce'); //input password
    await page.click('[data-test="login-button"]'); //click berfungsi untuk melakukan click suatu button

    await expect(page).toHaveURL(/inventory/); //memastikan login berhasil dan adan infomrasi url yang disediakan dengan menambahkan expect
    await expect(page.locator('[data-test="title"]')).toHaveText('Products'); //memasitikan halaman menuju ke inventory dan memiliki tulsian products dengan melakukan pengecekan terhadap locator spesifik title


});

//negative case

test('user cannot login with invalid password', async ({page}) => {
    await page.goto ('/');

    await page.fill ('[data-test="username"]', 'standard_user' );
    await page.fill ('[data-test="password"]', 'password123');
    await page.click('[data-test="login-button"]');

    await expect(page.locator('[data-test="error"]')).toBeVisible(); //expect locator ditambah dengan ada memastikan locator teresebut terlihat 
    await expect(page.locator('[data-test="error"]')).toContainText("Epic sadface: Username and password do not match any user in this service");//expect locator ditambah dengan memastikan content errornya sesuai

});

test('locked out user cannot login', async({page}) =>{
    await page.goto ('/')

    await page.fill ('[data-test="username"]', 'locked_out_user' );
    await page.fill ('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText("Epic sadface: Sorry, this user has been locked out.");
})

