import SqlFunction from '../helpers/sql.function';

export class UserQuery {
    sqlFunction: SqlFunction;

    constructor() {
        this.sqlFunction = new SqlFunction();
    }

    getUserList = async () => {
        return await this.sqlFunction.Get({
            table: "users",
            columns: ['*']
        });
    };
    
    getUserDetails = async (id: number) => {
        return await this.sqlFunction.GetById({
            table: "users",
            columns: ['*'],
            keyName: "Id",
            keyValue: id
        });
    };

    getUserByUserName = async (userName: string) => {
        return await this.sqlFunction.Get({
            table: "users",
            columns: ['*'],
            where: {
                UserName: userName
            }
        });
    };

    saveUser = async (
        id: number, firstName: string, lastName: string, age: number, gender: string, userName: string,
        roleId: number, password: string
    ) => {
        if (id === 0) {
            return await this.sqlFunction.Create({
                table: "users",
                data: {
                    FirstName: firstName,
                    LastName: lastName,
                    Age: age,
                    Gender: gender,
                    UserName: userName,
                    RoleId: roleId,
                    Password: password
                }
            });
        } else {
            return await this.sqlFunction.Update({
                table: "users",
                data: {
                    FirstName: firstName,
                    LastName: lastName,
                    Age: age,
                    Gender: gender,
                    UserName: userName,
                    RoleId: roleId
                },
                keyName: "Id",
                keyValue: id
            });
        }
    };

    deleteUser = async (id: number) => {
        return await this.sqlFunction.Delete({
            table: "users",
            keyName: "Id",
            keyValue: id
        });
    };
}