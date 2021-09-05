import { Injectable } from '@nestjs/common';

import { RoleQuery } from '../query/role.query';
import validator from '../validators/validator';
import SuccessResponse from '../common/responses/success.response';
import ErrorResponse from '../common/responses/error.response';
import Role from '../dto/role.dto';

@Injectable()
export class RoleService {
    roleQuery: RoleQuery;

    constructor() {
        this.roleQuery = new RoleQuery();
    }

    getRoleList = async (): Promise<SuccessResponse | ErrorResponse> => {
        const list = await this.roleQuery.getRoleList();
        return {
            status: true,
            data: list
        }
    };

    getRoleDetails = async (id: number): Promise<SuccessResponse | ErrorResponse> => {
        const errors = validator.NumberValidator("id", id.toString(), true);

        if (errors.length > 0) {
            return {
                status: false,
                error: errors
            }
        }
        else {
            const list = await this.roleQuery.getRoleDetails(id);

            return {
                status: true,
                data: list
            }
        }
    };

    getRoleByRoleName = async (roleName: string): Promise<SuccessResponse | ErrorResponse> => {
        const errors = validator.StringValidator("roleName", roleName, true, "text", 5, 45);

        if (errors.length > 0) {
            return {
                status: false,
                error: errors
            }
        }
        else {
            const list = await this.roleQuery.getRoleByName(roleName);

            return {
                status: true,
                data: list
            }
        }
    };

    saveRole = async (role: Role): Promise<SuccessResponse | ErrorResponse> => {
        const errors = validator.StringValidator("roleName", role.roleName, true, "text", 3, 50);

        if (errors.length > 0) {
            return {
                status: false,
                error: errors
            }
        }
        else {
            const newId = await this.roleQuery.saveRole(role.id, role.roleName);

            return {
                status: true,
                data: [role]
            }
        }
    };

    deleteRole = async (id: number): Promise<SuccessResponse | ErrorResponse> => {
        const errors = validator.NumberValidator("id", id.toString(), true);

        if (errors.length > 0) {
            return {
                status: false,
                error: errors
            }
        }
        else {
            const deleteId = await this.roleQuery.deleteRole(id);

            return {
                status: true,
                data: deleteId
            }
        }
    };
}