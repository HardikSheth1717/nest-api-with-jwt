import SqlFunction from '../helpers/sql.function';

export class UserSessionQuery {
    sqlFunction: SqlFunction;

    constructor() {
        this.sqlFunction = new SqlFunction();
    }

    getUserSessionList = async () => {
        return await this.sqlFunction.Get({
            table: "usersession",
            columns: ['*']
        });
    };
    
    getUserSessionDetails = async (id: number) => {
        return await this.sqlFunction.GetById({
            table: "usersession",
            columns: ['*'],
            keyName: "Id",
            keyValue: id
        });
    };

    getUserSessionByToken = async (refreshToken: string) => {
        return await this.sqlFunction.Get({
            table: "usersession",
            columns: ['*'],
            where: {
                RefreshToken: refreshToken
            }
        });
    };

    saveUserSession = async (id: number, userId: number, refreshToken: string, expiryTime: number) => {
        if (id === 0) {
            return await this.sqlFunction.Create({
                table: "usersession",
                data: {
                    UserId: userId,
                    RefreshToken: refreshToken,
                    ExpiryTime: expiryTime
                }
            });
        } else {
            return await this.sqlFunction.Update({
                table: "usersession",
                data: {
                    UserId: userId,
                    RefreshToken: refreshToken,
                    ExpiryTime: expiryTime
                },
                keyName: "Id",
                keyValue: id
            });
        }
    };

    deleteUserSession = async (id: number) => {
        return await this.sqlFunction.Delete({
            table: "usersession",
            keyName: "Id",
            keyValue: id
        });
    };
}