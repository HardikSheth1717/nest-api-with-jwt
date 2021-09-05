import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserQuery } from '../query/user.query';
import validator from '../validators/validator';
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
        const errors = validator.NumberValidator("id", id.toString(), true);

        if (errors.length > 0) {
            return {
                status: false,
                error: errors
            }
        }
        else {
            const list = await this.userQuery.getUserDetails(id);

            return {
                status: true,
                data: list
            }
        }
    };

    getUserByUserName = async (userName: string): Promise<SuccessResponse | ErrorResponse> => {
        const errors = validator.StringValidator("userName", userName, true, "text", 5, 45);

        if (errors.length > 0) {
            return {
                status: false,
                error: errors
            }
        }
        else {
            const list = await this.userQuery.getUserByUserName(userName);
            
            return {
                status: true,
                data: list
            }
        }
    };

    saveUser = async (user: User): Promise<SuccessResponse | ErrorResponse> => {
        let errors = [];
        const errors1 = validator.StringValidator("firstName", user.FirstName, true, "text", 3, 50);
        const errors2 = validator.StringValidator("lastName", user.LastName, true, "text", 3, 50);
        const errors3 = validator.NumberValidator("age", user.Age.toString(), true);
        const errors4 = validator.StringValidator("gender", user.Gender, true, "text", 4, 6);
        const errors5 = validator.StringValidator("userName", user.UserName, true, "text", 5, 45);
        const errors6 = validator.NumberValidator("roleId", user.RoleId.toString(), true);
        const errors7 = validator.StringValidator("password", user.Password, true, "text", 8, 20);

        errors = [...errors1, ...errors2, ...errors3, ...errors4, ...errors5, ...errors6, ...errors7];
        
        if (errors.length > 0) {
            return {
                status: false,
                error: errors
            }
        }
        else {
            const newId = await this.userQuery.saveUser(
                user.Id, user.FirstName, user.LastName, user.Age, user.Gender,
                user.UserName, user.RoleId, bcrypt.hashSync(user.Password, 8)
            );

            return {
                status: true,
                data: [user]
            }
        }
    };

    deleteUser = async (id: number): Promise<SuccessResponse | ErrorResponse> => {
        const errors = validator.NumberValidator("id", id.toString(), true);

        if (errors.length > 0) {
            return {
                status: false,
                error: errors
            }
        }
        else {
            const deleteId = await this.userQuery.deleteUser(id);

            return {
                status: true,
                data: deleteId
            }
        }
    };

    checkUserRole = async (id: number): Promise<SuccessResponse | ErrorResponse> => {
        const errors = validator.NumberValidator("id", id.toString(), true);

        if (errors.length > 0) {
            return {
                status: false,
                error: errors
            }
        }
        else {
            const list = await this.userQuery.checkUserRole(id);

            return {
                status: true,
                data: list
            }
        }
    };
}