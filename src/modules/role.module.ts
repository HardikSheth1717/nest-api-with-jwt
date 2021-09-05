import { Module } from '@nestjs/common';
import { RoleController } from '../controllers/role.controller';
import { RoleService } from '../providers/role.service';

@Module({
    controllers: [RoleController],
    providers: [RoleService]
})
export class RoleModule {
    
}