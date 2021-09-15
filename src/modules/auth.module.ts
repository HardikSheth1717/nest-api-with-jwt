import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../providers/auth.service';
import { UserService } from '../providers/user.service';
import { UserSessionService } from '../providers/usersession.service';

import User from '../dto/user.dto';

@Module({
    imports: [TypeOrmModule.forFeature([User]), JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, UserService, UserSessionService]
})
export class AuthModule {
    
}