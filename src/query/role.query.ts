import SqlFunction from '../helpers/sql.function';

export class RoleQuery {
    sqlFunction: SqlFunction;

    constructor() {
        this.sqlFunction = new SqlFunction();
    }

    getRoleList = async () => {
        return await this.sqlFunction.Get({
            table: "roles",
            columns: ['*']
        });
    };
    
    getRoleDetails = async (id: number) => {
        return await this.sqlFunction.GetById({
            table: "roles",
            columns: ['*'],
            keyName: "Id",
            keyValue: id
        });
    };

    getRoleByName = async (roleName: string) => {
        return await this.sqlFunction.Get({
            table: "roles",
            columns: ['*'],
            where: {
                RoleName: roleName
            }
        });
    };

    saveRole = async (id: number, roleName: string) => {
        if (id === 0) {
            return await this.sqlFunction.Create({
                table: "roles",
                data: {
                    RoleName: roleName
                }
            });
        } else {
            return await this.sqlFunction.Update({
                table: "roles",
                data: {
                    RoleName: roleName
                },
                keyName: "Id",
                keyValue: id
            });
        }
    };

    deleteRole = async (id: number) => {
        return await this.sqlFunction.Delete({
            table: "roles",
            keyName: "Id",
            keyValue: id
        });
    };
}