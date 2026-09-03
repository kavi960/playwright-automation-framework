const { BasePage } = require('./BasePage');

class ProductsPage extends BasePage {

    constructor(page) {
        super(page);

        this.searchInput = page.locator('#search_product');
        this.searchButton = page.locator('#submit_search');
    }

    async waitForPageLoad() {
        await this.searchInput.waitFor({
            state: 'visible'
        });
    }

    async searchProduct(productName) {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

    getProductContainer(productName) {
        return this.page
            .locator('.col-sm-4')
            .filter({
                hasText: productName
            });
    }

    async openProduct(productName) {
        const productContainer =
            this.getProductContainer(productName);

        await productContainer
            .getByRole('link', {
                name: 'View Product'
            })
            .click();
    }

    async navigateToProducts() {
        await this.page.goto('/products');
        await this.waitForPageLoad();
    }
}

module.exports = { ProductsPage };