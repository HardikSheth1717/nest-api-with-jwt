import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserQuery } from '../query/user.query';
import SuccessResponse from '../common/responses/success.response';
import ErrorResponse from '../common/responses/error.response';
import User from '../dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    userQuery: UserQuery;

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
        this.userQuery = new UserQuery();
    }

    getUserList = async (): Promise<SuccessResponse | ErrorResponse> => {
        const list = await this.userRepository.find();
        
        return {
            status: true,
            data: list
        }
    };

    getUserDetails = async (id: number): Promise<SuccessResponse | ErrorResponse> => {
        const list = await this.userRepository.findByIds([id]);

        return {
            status: true,
            data: list
        }
    };

    getUserByUserName = async (userName: string): Promise<SuccessResponse | ErrorResponse> => {
        const list = await this.userRepository.find({
            where: {
                UserName: userName
            }
        });

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

    saveUserWithORM = async (user: User): Promise<SuccessResponse | ErrorResponse> => {
        user.Password = bcrypt.hashSync(user.Password, 8);

        return this.userRepository.save(user).then(result => {
            if (result.Id > 0) {
                return {
                    status: true,
                    data: [result]
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
    }

    deleteUser = async (id: number): Promise<SuccessResponse | ErrorResponse> => {
        const deleteId = await this.userRepository.delete(id);

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