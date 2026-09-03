const Database = require('better-sqlite3');

class DatabaseUtils {

    constructor() {
        this.db = new Database('./database/testdb.sqlite');
    }

    executeQuery(query, params = []) {
        const statement = this.db.prepare(query);
        return statement.all(...params);
    }

    closeConnection() {
        this.db.close();
    }
}

module.exports = DatabaseUtils;