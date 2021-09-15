import 'reflect-metadata';
import { createConnection } from 'typeorm';
import User from '../dto/user.dto';

export default class TypeORMConnection {
    static CreateConnection = () => {
        return createConnection({
            type: 'mysql',
            host: 'localhost',
            database: 'dbhrms',
            username: 'root',
            password: 'Semaphore@123',
            entities: [
                User
            ],
            synchronize: false,
            logging: false
        })
        .catch(error => {
            console.log(`TypeORM connection error: ${error.message}`);
        })
    }
}