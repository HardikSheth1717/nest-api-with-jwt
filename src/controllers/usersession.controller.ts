import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';

import { UserSessionService } from '../providers/usersession.service';
import SuccessResponse from '../common/responses/success.response';
import ErrorResponse from '../common/responses/error.response';
import UserSession from '../dto/usersession.dto';

@Controller()
export class UserSessionController {
    constructor(private usersessionService: UserSessionService) {

    }

    @Get('/usersessions')
    async getUserSessionList() : Promise<SuccessResponse | ErrorResponse> {
        return this.usersessionService.getUserSessionList();
    };

    @Get('/usersession/:usersessionId')
    async getUserSessionDetails(@Param('usersessionId') usersessionId: number) : Promise<SuccessResponse | ErrorResponse> {
        return this.usersessionService.getUserSessionDetails(usersessionId);
    };

    @Post('/saveusersession')
    async saveUserSession(@Body() usersession: UserSession) : Promise<SuccessResponse | ErrorResponse> {
        return this.usersessionService.saveUserSession(usersession.id, usersession.userId);
    };

    @Delete('/deleteusersession/:usersessionId')
    async deleteUserSession(@Param('usersessionId') usersessionId: number) : Promise<SuccessResponse | ErrorResponse> {
        return this.usersessionService.deleteUserSession(usersessionId);
    };
}