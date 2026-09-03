const { test, expect } = require('@playwright/test');

test('Verify Automation Exercise home page', async ({ page }) => {

    await page.goto('/');

    await expect(page).toHaveTitle(/Automation Exercise/);

});