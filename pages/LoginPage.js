const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {

    constructor(page) {

        super(page);

        this.emailInput =
            page.locator('[data-qa="login-email"]');

        this.passwordInput =
            page.locator('[data-qa="login-password"]');

        this.loginButton =
            page.locator('[data-qa="login-button"]');
    }

    async login(email, password) {

        await this.emailInput.fill(email);

        await this.passwordInput.fill(password);

        await this.loginButton.click();
    }
}

module.exports = { LoginPage };