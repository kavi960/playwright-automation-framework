const { test, expect } = require('@playwright/test');
const ApiUtils = require('../../utils/ApiUtils');

const productsData = require('../../test-data/products.json');

// Test 1: Get all products

test('GET products API - validate response', async ({ request }) => {

    const api = new ApiUtils(request);

    const response = await api.get(
        `${process.env.BASE_URL}/api/productsList`
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.responseCode).toBe(200);
    expect(responseBody.products).toBeDefined();
    expect(responseBody.products.length).toBeGreaterThan(0);
});


// Test 2: Verify product details

test('GET products API - verify product details', async ({ request }) => {

    const api = new ApiUtils(request);

    const response = await api.get(
        `${process.env.BASE_URL}/api/productsList`
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.responseCode).toBe(200);
    expect(responseBody.products).toBeDefined();

    const apiProducts = responseBody.products;

    for (const expectedProduct of productsData.products) {

        const actualProduct = apiProducts.find(
            product => product.name === expectedProduct.name
        );

        expect(actualProduct).toBeDefined();

        expect(actualProduct.name).toBe(expectedProduct.name);

        // API returns price as "Rs. 500"
        // Test data contains price as 500
        const actualPrice = Number(
            actualProduct.price.replace('Rs. ', '')
        );

        expect(actualPrice).toBe(expectedProduct.price);
    }
});