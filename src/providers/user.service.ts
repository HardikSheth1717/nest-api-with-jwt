import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserQuery } from '../query/user.query';
import SuccessResponse from '../common/responses/success.response';
import ErrorResponse from '../common/responses/error.response';
import User from '../dto/user.dto';

@Injectable()
export class UserService {
    userQuery: UserQuery;

    constructor() {
        this.userQuery = new UserQuery();
    }

    getUserList = async (): Promise<SuccessResponse | ErrorResponse> => {
        const list = await this.userQuery.getUserList();
        return {
            status: true,
            data: list
        }
    };

    getUserDetails = async (id: number): Promise<SuccessResponse | ErrorResponse> => {
        const list = await this.userQuery.getUserDetails(id);

        return {
            status: true,
            data: list
        }
    };

    getUserByUserName = async (userName: string): Promise<SuccessResponse | ErrorResponse> => {
        const list = await this.userQuery.getUserByUserName(userName);

        return {
            status: true,
            data: list
        }
    };

    saveUser = async (user: User): Promise<SuccessResponse | ErrorResponse> => {
        return this.userQuery.saveUser(
            user.Id, user.FirstName, user.LastName, user.Age, user.Gender,
            user.UserName, user.RoleId, bcrypt.hashSync(user.Password, 8)
        ).then(result => {
            if (result > 0) {
                return {
                    status: true,
                    data: [user]
                };
            } else {
                return {
                    status: false,
                    error: "User not saved !"
                };
            }
        })
            .catch(error => {
                return {
                    status: false,
                    error: error.message
                };
            });
    };

    deleteUser = async (id: number): Promise<SuccessResponse | ErrorResponse> => {
        const deleteId = await this.userQuery.deleteUser(id);

        return {
            status: true,
            data: deleteId
        }
    };

    checkUserRole = async (id: number): Promise<SuccessResponse | ErrorResponse> => {
        const list = await this.userQuery.checkUserRole(id);

        return {
            status: true,
            data: list
        }
    };
}