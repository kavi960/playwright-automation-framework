const base = require('@playwright/test');

const { LoginPage } = require('../pages/LoginPage');
const { HomePage } = require('../pages/HomePage');
const { ProductsPage } = require('../pages/ProductsPage');
const { ProductDetailsPage } = require('../pages/ProductDetailsPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { PaymentPage } = require('../pages/PaymentPage');


exports.test = base.test.extend({

    credentials: async ({}, use, testInfo) => {

        const credentials = {
            chromium: {
                username: process.env.CHROME_USERNAME,
                password: process.env.CHROME_PASSWORD
            },

            firefox: {
                username: process.env.FIREFOX_USERNAME,
                password: process.env.FIREFOX_PASSWORD
            },

            webkit: {
                username: process.env.WEBKIT_USERNAME,
                password: process.env.WEBKIT_PASSWORD
            }
        };

        await use(credentials[testInfo.project.name]);
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },

    productDetailsPage: async ({ page }, use) => {
        await use(new ProductDetailsPage(page));
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },

    paymentPage: async ({ page }, use) => {
        await use(new PaymentPage(page));
    }
});


exports.expect = base.expect;
