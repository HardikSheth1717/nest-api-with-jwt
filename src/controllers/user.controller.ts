import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';

import { UserService } from '../providers/user.service';
import SuccessResponse from '../common/responses/success.response';
import ErrorResponse from '../common/responses/error.response';
import User from 'src/dto/user.dto';

@Controller()
export class UserController {
    constructor(private userService: UserService) {

    }

    @Get('/users')
    async getUserList() : Promise<SuccessResponse | ErrorResponse> {
        return this.userService.getUserList();
    };

    @Get('/user/:userId')
    async getUserDetails(@Param('userId') userId: number) : Promise<SuccessResponse | ErrorResponse> {
        return this.userService.getUserDetails(userId);
    };

    @Post('/saveuser')
    async saveUser(@Body() user: User) : Promise<SuccessResponse | ErrorResponse> {
        return this.userService.saveUser(user);
    };

    @Delete('/deleteuser/:userId')
    async deleteUser(@Param('userId') userId: number) : Promise<SuccessResponse | ErrorResponse> {
        return this.userService.deleteUser(userId);
    };
}