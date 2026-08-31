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
        await this.productsLink.click();
    }

    async logout() {
        await this.logoutLink.click();
    }
    async openProducts() {
    await this.productsLink.click();
}
}

module.exports = { HomePage };