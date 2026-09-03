const { test, expect } = require('@playwright/test');
const DatabaseUtils = require('../../utils/DatabaseUtils');

const productsData = require('../../test-data/products.json');

test('Validate products from database', async () => {

    const db = new DatabaseUtils();

    for (const product of productsData.products) {

        const result = db.executeQuery(
            'SELECT * FROM products WHERE name = ?',
            [product.name]
        );

        expect(result.length).toBe(1);

        expect(result[0].name).toBe(product.name);
        expect(result[0].price).toBe(product.price);
    }

    db.closeConnection();
});