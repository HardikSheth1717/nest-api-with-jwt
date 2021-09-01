const mySql = require('mysql2');

export default class SqlConnection {
    static CreateSqlPool = () => {
        return mySql.createPool({
            host: 'localhost',
            database: 'dbhrms',
            user: 'root',
            password: 'Semaphore@123',
            waitForConnections: true,
            queueLimit: 10
        }).promise();
    }
}