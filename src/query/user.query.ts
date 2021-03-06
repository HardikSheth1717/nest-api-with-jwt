import SqlFunction from '../helpers/sql.function';
import TypeORMFunction from 'src/helpers/typeorm.function';
import User from 'src/dto/user.dto';

export class UserQuery {
    sqlFunction: SqlFunction;
    ormFunction: TypeORMFunction<User>;

    constructor() {
        this.sqlFunction = new SqlFunction();
        this.ormFunction = new TypeORMFunction<User>();
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

    saveUserWithORM = async (user: User) => {
        return await this.ormFunction.Save(user);
    };

    deleteUser = async (id: number) => {
        return await this.sqlFunction.Delete({
            table: "users",
            keyName: "Id",
            keyValue: id
        });
    };

    checkUserRole = async (id: number) => {
        return await this.sqlFunction.Execute(`
            SELECT R.RoleName
            FROM users U
            INNER JOIN roles R ON U.RoleId = R.Id
            WHERE U.Id = ?
        `, [id.toString()]);
    }
}