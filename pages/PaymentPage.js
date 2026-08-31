const { expect } = require('@playwright/test');

class PaymentPage {

    constructor(page) {

        this.page = page;

        // Payment details
        this.cardName =
            page.locator('[data-qa="name-on-card"]');

        this.cardNumber =
            page.locator('[data-qa="card-number"]');

        this.cvc =
            page.locator('[data-qa="cvc"]');

        this.expiryMonth =
            page.locator('[data-qa="expiry-month"]');

        this.expiryYear =
            page.locator('[data-qa="expiry-year"]');

        // Pay and Confirm Order
        this.payAndConfirmOrderButton =
            page.locator('[data-qa="pay-button"]');

        // Order confirmation
        this.orderSuccessMessage =
            page.locator('h2[data-qa="order-placed"]');
    }

    // Enter payment details
    async enterPaymentDetails(
        name,
        cardNumber,
        cvc,
        expiryMonth,
        expiryYear
    ) {

        await this.cardName.fill(name);

        await this.cardNumber.fill(cardNumber);

        await this.cvc.fill(cvc);

        await this.expiryMonth.fill(expiryMonth);

        await this.expiryYear.fill(expiryYear);
    }

    // Pay and confirm order
    async payAndConfirmOrder() {

        await this.payAndConfirmOrderButton.click();
    }

    // Verify order placed
    async verifyOrderPlaced() {

        await expect(
            this.orderSuccessMessage
        ).toBeVisible();
    }
}

module.exports = { PaymentPage };