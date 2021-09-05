import { Module } from '@nestjs/common';
import { UserSessionController } from '../controllers/usersession.controller';
import { UserSessionService } from '../providers/usersession.service';

@Module({
    controllers: [UserSessionController],
    providers: [UserSessionService]
})
export class UserSessionModule {
    
}