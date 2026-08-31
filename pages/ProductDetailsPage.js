class ProductDetailsPage {
    constructor(page) {
        this.page = page;

        this.productInformation = page.locator('.product-information');
        this.productName = this.productInformation.locator('h2');

        this.quantityInput = page.locator('#quantity');

        this.addToCartButton = this.productInformation
            .locator('button.cart');

        this.continueShoppingButton = page
            .locator('.modal-content')
            .getByRole('button', { name: 'Continue Shopping' });

        this.viewCartLink = page
            .locator('.modal-content')
            .getByRole('link', { name: 'View Cart' });
    }

    async waitForPageLoad() {
        await this.productInformation.waitFor({
            state: 'visible'
        });
    }

    async setQuantity(quantity) {
        await this.quantityInput.fill(String(quantity));
    }

    async addToCart() {
        await this.addToCartButton.click();

        await this.continueShoppingButton.waitFor({
            state: 'visible'
        });
    }

    async continueShopping() {
        await this.continueShoppingButton.click();

        await this.continueShoppingButton.waitFor({
            state: 'hidden'
        });
    }

    async viewCart() {
        await this.viewCartLink.click();
    }
}

module.exports = {ProductDetailsPage};