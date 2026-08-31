const { expect } = require('@playwright/test');

class CheckoutPage {

    constructor(page) {
        this.page = page;


        this.proceedToCheckoutButton =
            page.locator('a.check_out');

        this.placeOrderButton =
            page.locator('a[href="/payment"]');

        this.deliveryAddress =
            page.locator('#address_delivery');


        this.billingAddress =
            page.locator('#address_invoice');
    }

    // Click Proceed To Checkout
    async proceedToCheckout() {

        await this.proceedToCheckoutButton.click();
    }

    // Click Place Order
    async placeOrder() {

        await this.placeOrderButton.click();
    }

    // Verify delivery address
    async verifyDeliveryAddress() {

        await expect(
            this.deliveryAddress
        ).toBeVisible();
    }

    // Verify billing address
    async verifyBillingAddress() {

        await expect(
            this.billingAddress
        ).toBeVisible();
    }

    // Get complete delivery address text
    async getDeliveryAddress() {

        return await this.deliveryAddress.innerText();
    }

    // Get complete billing address text
    async getBillingAddress() {

        return await this.billingAddress.innerText();
    }
}

module.exports = { CheckoutPage };