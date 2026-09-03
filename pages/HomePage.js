const { BasePage } = require('./BasePage');

class HomePage extends BasePage {

    constructor(page) {
        super(page);

        this.loggedInUser = page.getByText('Logged in as');
        this.productsLink = page.getByRole('link', { name: 'Products' });
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
    }

    async isUserLoggedIn() {
        return await this.loggedInUser.isVisible();
    }

    async openProducts() {

        await this.productsLink.waitFor({
            state: 'visible'
        });

        await this.page.goto('/products', {
            waitUntil: 'domcontentloaded'
        });

        await this.page.waitForURL('**/products');
    }

    async logout() {
        await this.logoutLink.click();
    }
}

module.exports = { HomePage };