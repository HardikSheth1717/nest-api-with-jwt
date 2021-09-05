import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { RoleController } from './controllers/role.controller';
import { UserController } from './controllers/user.controller';

import { AppService } from './app.service';

import { UserModule } from './modules/user.module';
import { RoleModule } from './modules/role.module';
import { UserSessionModule } from './modules/usersession.module';
import { AuthModule } from './modules/auth.module';

import { AuthMiddleware } from './middlewares/auth.middleware';
import { isAdmin, isModerator } from './middlewares/rights.middleware';

@Module({
  imports: [JwtModule.register({}), UserModule, RoleModule, UserSessionModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude(
      { path: 'auth', method: RequestMethod.ALL }
    ).forRoutes(RoleController, UserController);

    consumer.apply(isAdmin).forRoutes(RoleController);

    consumer.apply(isModerator).forRoutes(UserController);
  }
}
