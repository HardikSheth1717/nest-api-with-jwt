import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { UserSessionQuery } from '../query/usersession.query';
import SuccessResponse from '../common/responses/success.response';
import ErrorResponse from '../common/responses/error.response';
import AuthConfig from '../config/auth.config';

@Injectable()
export class UserSessionService {
    usersessionQuery: UserSessionQuery;

    constructor() {
        this.usersessionQuery = new UserSessionQuery();
    }

    getUserSessionList = async (): Promise<SuccessResponse | ErrorResponse> => {
        const list = await this.usersessionQuery.getUserSessionList();
        return {
            status: true,
            data: list
        }
    };

    getUserSessionDetails = async (id: number): Promise<SuccessResponse | ErrorResponse> => {
        const list = await this.usersessionQuery.getUserSessionDetails(id);

        return {
            status: true,
            data: list
        }
    };

    getUserSessionByToken = async (refreshToken: string): Promise<SuccessResponse | ErrorResponse> => {
        const list = await this.usersessionQuery.getUserSessionByToken(refreshToken);

        return {
            status: true,
            data: list
        }
    };

    saveUserSession = async (id: number, userId: number): Promise<SuccessResponse | ErrorResponse> => {
        const refreshToken: string = v4();
        let expiryTime: Date = new Date();
        expiryTime.setSeconds(new Date().getSeconds() + AuthConfig.jwtRefreshTokenValidity);

        const newId = await this.usersessionQuery.saveUserSession(
            id, userId, refreshToken, expiryTime.getTime());

        return {
            status: true,
            data: [{
                id: id,
                userId: userId,
                refreshToken: refreshToken
            }]
        }
    };

    deleteUserSession = async (id: number): Promise<SuccessResponse | ErrorResponse> => {
        const deleteId = await this.usersessionQuery.deleteUserSession(id);

        return {
            status: true,
            data: deleteId
        }
    };

    checkRefreshTokenExpiry = async (tokenExpiryTime: number): Promise<boolean> => {
        return new Date(tokenExpiryTime) < new Date();
    }
}