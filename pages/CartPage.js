const { expect } = require('@playwright/test');

class CartPage {

    constructor(page) {
        this.page = page;

        // All product rows in the cart
        this.cartRows = page.locator('tr[id^="product-"]');
    }

    // Get a specific product row
    getProductRow(productName) {
        return this.cartRows.filter({
            hasText: productName
        });
    }

    // Verify product exists in cart
    async verifyProduct(productName) {

        const productRow =
            this.getProductRow(productName);

        await expect(productRow).toBeVisible();
    }

    // Get product quantity
    async getProductQuantity(productName) {

        const productRow =
            this.getProductRow(productName);

        const quantity =
            await productRow
                .locator('.cart_quantity button')
                .innerText();

        return Number(quantity);
    }

    // Get product unit price
    async getProductPrice(productName) {

        const productRow =
            this.getProductRow(productName);

        const priceText =
            await productRow
                .locator('.cart_price p')
                .innerText();

        return Number(
            priceText
                .replace('Rs. ', '')
                .trim()
        );
    }

    // Get product total
    async getProductTotal(productName) {

        const productRow =
            this.getProductRow(productName);

        const totalText =
            await productRow
                .locator('.cart_total_price')
                .innerText();

        return Number(
            totalText
                .replace('Rs. ', '')
                .trim()
        );
    }

    // Remove all products from cart
    async clearCart() {

        while (await this.cartRows.count() > 0) {

            // Current number of products
            const currentCount =
                await this.cartRows.count();

            // First product row
            const firstRow =
                this.cartRows.first();

            // Delete button inside row
            const deleteButton =
                firstRow.locator(
                    '.cart_quantity_delete'
                );

            // Delete product
            await deleteButton.click();

            // Wait until count decreases
            await expect(
                this.cartRows
            ).toHaveCount(
                currentCount - 1
            );
        }
    }
}

module.exports = { CartPage };