import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';

import { UserSessionService } from '../providers/usersession.service';
import SuccessResponse from '../common/responses/success.response';
import ErrorResponse from '../common/responses/error.response';
import UserSession from '../dto/usersession.dto';
import CommonDto from 'src/dto/common.dto';

@Controller()
export class UserSessionController {
    constructor(private usersessionService: UserSessionService) {

    }

    @Get('/usersessions')
    async getUserSessionList() : Promise<SuccessResponse | ErrorResponse> {
        return this.usersessionService.getUserSessionList();
    };

    @Get('/usersession/:id')
    async getUserSessionDetails(@Param() usersession: CommonDto) : Promise<SuccessResponse | ErrorResponse> {
        return this.usersessionService.getUserSessionDetails(usersession.id);
    };

    @Post('/saveusersession')
    async saveUserSession(@Body() usersession: UserSession) : Promise<SuccessResponse | ErrorResponse> {
        return this.usersessionService.saveUserSession(usersession.id, usersession.userId);
    };

    @Delete('/deleteusersession/:id')
    async deleteUserSession(@Param() usersession: CommonDto) : Promise<SuccessResponse | ErrorResponse> {
        return this.usersessionService.deleteUserSession(usersession.id);
    };
}