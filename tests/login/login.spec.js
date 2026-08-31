const { test } = require('../../fixtures/testFixtures');
const { expect } = require('@playwright/test')

const productData =
    require('../../test-data/products.json');


test(
    'Valid user login and add multiple products',
    async ({
        page,
        loginPage,
        homePage,
        productsPage,
        productDetailsPage,
        cartPage,
        checkoutPage
    }) => {


        // =======================================
        // 1. LOGIN
        // =======================================

        await page.goto('/login');

        await loginPage.login(
            process.env.TEST_USERNAME,
            process.env.TEST_PASSWORD
        );

        // Verify successful login
        await expect(page).toHaveURL(
            'https://automationexercise.com/'
        );


        // =======================================
        // 2. CLEAR EXISTING CART
        // =======================================

        await page.goto('/view_cart');

        await cartPage.clearCart();


        // =======================================
        // 3. NAVIGATE TO PRODUCTS
        // =======================================

        await homePage.openProducts();

        await productsPage.waitForPageLoad();


        // =======================================
        // 4. ADD MULTIPLE PRODUCTS
        // =======================================

        for (
            let i = 0;
            i < productData.products.length;
            i++
        ) {

            const product =
                productData.products[i];


            // -----------------------------------
            // Search product
            // -----------------------------------

            await productsPage.searchProduct(
                product.name
            );


            // -----------------------------------
            // Verify searched product
            // -----------------------------------

            const productContainer =
                productsPage.getProductContainer(
                    product.name
                );

            await expect(
                productContainer
            ).toBeVisible();


            // -----------------------------------
            // Open product details
            // -----------------------------------

            await productsPage.openProduct(
                product.name
            );


            // -----------------------------------
            // Set quantity
            // -----------------------------------

            await productDetailsPage.setQuantity(
                product.quantity
            );


            // -----------------------------------
            // Add product to cart
            // -----------------------------------

            await productDetailsPage.addToCart();


            // -----------------------------------
            // Continue Shopping
            // -----------------------------------

            if (
                i <
                productData.products.length - 1
            ) {

                await productDetailsPage
                    .continueShopping();


                // Continue Shopping only closes
                // the popup, so click Products again

                await homePage.openProducts();

                await productsPage.waitForPageLoad();

            } else {

                // Last product
                // Go directly to Cart

                await productDetailsPage
                    .viewCart();
            }
        }


        // =======================================
        // 5. VERIFY CART PAGE
        // =======================================

        await expect(page).toHaveURL(
            'https://automationexercise.com/view_cart'
        );


        // =======================================
        // 6. VERIFY PRODUCTS
        // =======================================

        for (
            const product of productData.products
        ) {


            // -----------------------------------
            // Verify product exists
            // -----------------------------------

            await cartPage.verifyProduct(
                product.name
            );


            // -----------------------------------
            // Verify quantity
            // -----------------------------------

            const actualQuantity =
                await cartPage.getProductQuantity(
                    product.name
                );

            expect(actualQuantity).toBe(
                product.quantity
            );


            // -----------------------------------
            // Verify unit price
            // -----------------------------------

            const actualPrice =
                await cartPage.getProductPrice(
                    product.name
                );

            expect(actualPrice).toBe(
                product.price
            );


            // -----------------------------------
            // Verify product total
            // -----------------------------------

            const actualProductTotal =
                await cartPage.getProductTotal(
                    product.name
                );


            // Expected:
            // Price × Quantity

            const expectedProductTotal =
                product.price *
                product.quantity;


            expect(actualProductTotal).toBe(
                expectedProductTotal
            );
        }
        await checkoutPage.proceedToCheckout();

        await checkoutPage.verifyDeliveryAddress();

        await checkoutPage.verifyBillingAddress();

        await checkoutPage.placeOrder();
    }
);