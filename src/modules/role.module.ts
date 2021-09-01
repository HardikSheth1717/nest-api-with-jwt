import { Module } from '@nestjs/common';
import { RoleController } from 'src/controllers/role.controller';
import { RoleService } from 'src/providers/role.service';

@Module({
    controllers: [RoleController],
    providers: [RoleService]
})
export class RoleModule {
    
}