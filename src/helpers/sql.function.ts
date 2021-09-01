import SqlConnection from './sql.connection';
import SqlCommon from './dto/sql.dto';

export default class SqlFunction {
    private sqlPool: any;

    constructor() {
        this.sqlPool = SqlConnection.CreateSqlPool();
    }

    Get = async (obj: SqlCommon): Promise<[]> => {
        if (!obj.where) {
            const [data] = await this.sqlPool.execute(`
                SELECT ${obj.columns.join(',')}
                FROM ${obj.table}
            `);

            return data;
        } else {
            const columns = Object.keys(obj.where);
            const data = Object.values(obj.where);

            let whereClause = ``;

            for (let i = 0; i < columns.length; i++) {
                if (i > 0) {
                    whereClause += ` AND `;
                }

                whereClause += ` ${columns[i]} = '${data[i]}'`;
            }

            const [result] = await this.sqlPool.execute(`
                SELECT ${obj.columns.join(',')}
                FROM ${obj.table}
                WHERE ${whereClause}
            `);

            return result;
        }
    };

    GetById = async (obj: SqlCommon): Promise<[]> => {
        const [data] = await this.sqlPool.execute(`
            SELECT ${obj.columns.join(',')}
            FROM ${obj.table}
            WHERE ${obj.keyName} = ?
        `, [obj.keyValue]);

        return data;
    };

    Create = async (obj: SqlCommon): Promise<number> => {
        const columns = Object.keys(obj.data);
        const data = Object.values(obj.data);
        let placeHolders = data.map(element => {
            return "?";
        })

        const [inserted] = await this.sqlPool.execute(`
            INSERT INTO ${obj.table} (${columns.join(',')})
            VALUES (${placeHolders.join(',')})`, data);

        return parseInt(inserted.insertId);
    };

    Update = async (obj: SqlCommon): Promise<number> => {
        const columns = Object.keys(obj.data);
        const data = Object.values(obj.data);

        const [updated] = await this.sqlPool.execute(`
            UPDATE ${obj.table} SET ${columns.join(' = ?, ')} = ? WHERE ${obj.keyName} = ?`,
            [...data, obj.keyValue]);

        return parseInt(updated.affectedRows) > 0 ? obj.keyValue : 0;
    };

    Delete = async (obj: SqlCommon): Promise<number> => {
        const [data] = await this.sqlPool.execute(`
        DELETE FROM ${obj.table} WHERE ${obj.keyName} = ?`, [obj.keyValue]);

        return parseInt(data.affectedRows) > 0 ? obj.keyValue : 0;
    };

    Execute = async (query: string, params: string[]): Promise<[]> => {
        const [data] = await this.sqlPool.execute(query, params);
        return data;
    };
}