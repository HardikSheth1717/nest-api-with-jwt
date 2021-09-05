import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../providers/auth.service';
import { UserService } from '../providers/user.service';
import { UserSessionService } from '../providers/usersession.service';

@Module({
    imports: [JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, UserService, UserSessionService]
})
export class AuthModule {
    
}