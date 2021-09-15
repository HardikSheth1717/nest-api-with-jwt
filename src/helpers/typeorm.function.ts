import { Connection } from "typeorm";
import TypeORMConnection from "./typeorm.connection";

export default class TypeORMFunction<Type> {
    private ormConnection: Promise<void | Connection>;

    constructor() {
        this.ormConnection = TypeORMConnection.CreateConnection();
    }

    Save = async (obj: Type): Promise<Type> => {
        return await this.ormConnection.then(async connection => {
            const conn: Connection = <Connection>connection;
            const data = await conn.manager.save<Type>(obj);
            return data;
        })
    };
}
