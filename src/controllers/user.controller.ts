import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';

import { UserService } from '../providers/user.service';
import SuccessResponse from '../common/responses/success.response';
import ErrorResponse from '../common/responses/error.response';
import User from '../dto/user.dto';
import CommonDto from 'src/dto/common.dto';

@Controller()
export class UserController {
    constructor(private userService: UserService) {

    }

    @Get('/users')
    async getUserList() : Promise<SuccessResponse | ErrorResponse> {
        return this.userService.getUserList();
    };

    @Get('/user/:id')
    async getUserDetails(@Param() user: CommonDto) : Promise<SuccessResponse | ErrorResponse> {
        return this.userService.getUserDetails(user.id);
    };

    @Post('/saveuser')
    async saveUser(@Body() user: User) : Promise<SuccessResponse | ErrorResponse> {
        return this.userService.saveUser(user);
    };

    @Delete('/deleteuser/:id')
    async deleteUser(@Param() user: CommonDto) : Promise<SuccessResponse | ErrorResponse> {
        return this.userService.deleteUser(user.id);
    };
}