import { Body, Controller, Get, Param, Post, Delete, Res } from '@nestjs/common';

import { RoleService } from '../providers/role.service';
import SuccessResponse from '../common/responses/success.response';
import ErrorResponse from '../common/responses/error.response';
import Role from '../dto/role.dto';
import CommonDto from 'src/dto/common.dto';

@Controller()
export class RoleController {
    constructor(private roleService: RoleService) {

    }

    @Get('/roles')
    async getRoleList() : Promise<SuccessResponse | ErrorResponse> {
        return this.roleService.getRoleList();
    };

    @Get('/role/:id')
    async getRoleDetails(@Param() role: CommonDto) : Promise<SuccessResponse | ErrorResponse> {
        return this.roleService.getRoleDetails(role.id);
    };

    @Post('/saverole')
    async saveRole(@Body() role: Role) : Promise<SuccessResponse | ErrorResponse> {
        return this.roleService.saveRole(role);
    };

    @Delete('/deleterole/:id')
    async deleteRole(@Param() role: CommonDto) : Promise<SuccessResponse | ErrorResponse> {
        return this.roleService.deleteRole(role.id);
    };
}