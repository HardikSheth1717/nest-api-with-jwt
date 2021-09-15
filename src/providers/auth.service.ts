import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "./user.service";
import * as bcrypt from 'bcrypt';

import SuccessResponse from '../common/responses/success.response';
import ErrorResponse from '../common/responses/error.response';
import User from '../dto/user.dto';
import SignIn from '../dto/signin.dto';
import AuthConfig from '../config/auth.config';
import { UserSessionService } from "./usersession.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly sessionService: UserSessionService
    ) {

    }

    signup = async (user: User): Promise<SuccessResponse | ErrorResponse> => {
        return this.userService.getUserByUserName(user.UserName).then(users => {
            if (users && users.status) {
                users = <SuccessResponse>users;

                if (users.data.length > 0) {
                    return {
                        status: false,
                        error: "User with the same username is already registered!"
                    }
                } else {
                    return this.userService.saveUserWithORM(user).then(user => {
                        if (user.status) {
                            return {
                                status: true,
                                data: "User is successfully registered!"
                            }
                        } else {
                            return {
                                status: false,
                                data: "User is not registered!"
                            }
                        }
                    }).catch(error => {
                        return {
                            status: false,
                            error: error.message
                        }
                    });
                }
            } else {
                return {
                    status: false,
                    error: "Something went wrong!"
                }
            }
        }).catch(error => {
            return {
                status: false,
                error: error.message
            }
        });
    };

    signin = async (signin: SignIn): Promise<SuccessResponse | ErrorResponse> => {
        return this.userService.getUserByUserName(signin.userName).then(users => {
            if (users && users.status) {
                users = <SuccessResponse>users;

                if (users.data.length > 0) {
                    const user: User = users.data[0];
                    const isValidPassword = bcrypt.compareSync(signin.password, user.Password);

                    if (!isValidPassword) {
                        return {
                            status: false,
                            error: "Password is invalid!"
                        }
                    }

                    const accessToken = this.jwtService.sign({ id: user.Id }, {
                        secret: AuthConfig.secret,
                        expiresIn: AuthConfig.jwtAccessTokenValidity
                    });

                    return this.sessionService.saveUserSession(0, user.Id).then(session => {
                        if (session.status) {
                            session = <SuccessResponse>session;

                            return {
                                status: true,
                                data: [{
                                    id: user.Id,
                                    firstName: user.FirstName,
                                    lastName: user.LastName,
                                    accessToken: accessToken,
                                    refreshToken: session.data[0].refreshToken
                                }]
                            };
                        } else {
                            return {
                                status: false,
                                error: "Something went wrong!"
                            }
                        }
                    }).catch(error => {
                        return {
                            status: false,
                            error: error.message
                        }
                    });
                } else {
                    return {
                        status: false,
                        error: "Username is invalid!"
                    }
                }
            } else {
                return {
                    status: false,
                    error: "Username is invalid!"
                }
            }
        }).catch(error => {
            return {
                status: false,
                error: error.message
            }
        });
    };

    renewAccessToken = async (refreshToken: string): Promise<SuccessResponse | ErrorResponse> => {
        let successResponse = new SuccessResponse();
        let errorResponse = new ErrorResponse();
        
        return this.sessionService.getUserSessionByToken(refreshToken).then(tokens => {
            if (tokens && tokens.status) {
                tokens = <SuccessResponse>tokens;

                if (tokens.data.length > 0) {
                    const expiryTime = tokens.data[0].ExpiryTime;
                    const userId = tokens.data[0].UserId;
                    const tokenId = tokens.data[0].Id;

                    return this.sessionService.checkRefreshTokenExpiry(expiryTime).then(tokenExpired => {
                    if (!tokenExpired) {
                            const newAccessToken = this.jwtService.sign({ id: userId }, {
                                secret: AuthConfig.secret,
                                expiresIn: AuthConfig.jwtAccessTokenValidity
                            });

                            successResponse.status = true;
                            successResponse.data = {
                                accessToken: newAccessToken,
                                refreshToken: refreshToken
                            }

                            return successResponse;
                        } else {
                            return this.sessionService.deleteUserSession(tokenId).then((): SuccessResponse | ErrorResponse => {
                                errorResponse.status = false;
                                errorResponse.error = "Refresh token was expired. Please make a new signin request";
                                return errorResponse;
                            }).catch(error => {
                                errorResponse.status = false;
                                errorResponse.error = `Something went wrong. ${error.message}`;
                                return errorResponse;
                            })
                        }
                    }).catch(error => {
                        errorResponse.status = false;
                        errorResponse.error = `Something went wrong. ${error.message}`;
                        return errorResponse;
                    })
                } else {
                    errorResponse.status = false;
                    errorResponse.error = "Unauthorised!";
                    return errorResponse;
                }
            } else {
                errorResponse.status = false;
                errorResponse.error = "Something went wrong!";
                return errorResponse;
            }
        }).catch(error => {
            errorResponse.status = false;
            errorResponse.error = error.message;
            return errorResponse;
        });
    };
}