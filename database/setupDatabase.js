const Database = require('better-sqlite3');

const db = new Database('./database/testdb.sqlite');

db.exec(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        price INTEGER NOT NULL
    )
`);

db.exec(`
    INSERT OR IGNORE INTO products (id, name, price)
    VALUES
        (1, 'Blue Top', 500),
        (2, 'Men Tshirt', 400),
        (3, 'Sleeveless Dress', 1000)
`);

console.log('Database created successfully.');

db.close();