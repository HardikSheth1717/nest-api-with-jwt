import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Response, NextFunction } from 'express';
import RequestModel from '../common/requests/custom.request';

import AuthConfig from '../config/auth.config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) {

    }

    use(request: RequestModel, response: Response, next: NextFunction) {
        const token = request.headers["x-access-token"];

        if (!token) {
            return response.status(403).send({
                status: false,
                data: "Token not found!"
            });
        }

        this.jwtService.verifyAsync(<string>token, {
            secret: AuthConfig.secret
        }).then(user => {
            if (!user) {
                return response.status(401).send({
                    status: false,
                    data: "Unauthorised!"
                });
            }

            request.userId = user.id;
            next();
        }).catch(error => {
            if (error.name === "TokenExpiredError") {
                return response.status(401).send({
                    status: false,
                    data: "Unauthorized! Access token was expired!"
                });
            } else {
                return response.status(401).send({
                    status: false,
                    data: "Unauthorized!"
                });
            }
        });
    };
}