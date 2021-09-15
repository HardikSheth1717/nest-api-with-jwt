import { Injectable, NestMiddleware } from "@nestjs/common";
import { Response, NextFunction } from 'express';
import RequestModel from "../common/requests/custom.request";
import { UserService } from "../providers/user.service";
import validator from '../validators/validator';
import SuccessResponse from '../common/responses/success.response';

@Injectable()
export class AdminRightsMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) { }

    use(request: RequestModel, response: Response, next: NextFunction) {
        const userId: number = request.userId;

        const errors = validator.NumberValidator("userId", userId.toString(), true);

        if (errors.length > 0) {
            return response.status(200).send({
                status: false,
                error: errors
            });
        }
        else {
            console.log('x');
            return this.userService.checkUserRole(userId).then(users => {
                if (users && users.status) {
                    users = <SuccessResponse>users;

                    if (users.data[0].RoleName === "Admin") {
                        next();
                        return;
                    }

                    return response.status(403).send({
                        status: false,
                        data: "Require Admin role."
                    });
                } else {
                    return response.status(403).send({
                        status: false,
                        data: "Require Admin role."
                    });
                }
            }).catch(error => {
                return response.status(200).send({
                    status: false,
                    data: `Something went wrong. - ${error}`
                });
            })
        }
    }
}