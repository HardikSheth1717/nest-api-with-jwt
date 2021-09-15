import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { RoleController } from './controllers/role.controller';
import { UserController } from './controllers/user.controller';

import { AppService } from './app.service';

import { UserModule } from './modules/user.module';
import { RoleModule } from './modules/role.module';
import { UserSessionModule } from './modules/usersession.module';
import { AuthModule } from './modules/auth.module';

import { AuthMiddleware } from './middlewares/auth.middleware';
import { AdminRightsMiddleware } from './middlewares/adminRights.middleware';
import { ModeratorMiddleware } from './middlewares/moderatorRights.middleware';

import User from './dto/user.dto';
import { UserService } from './providers/user.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    database: 'dbhrms',
    username: 'root',
    password: 'Semaphore@123',
    entities: [
      User
    ],
    synchronize: false,
    logging: false,
    keepConnectionAlive: true
  }), JwtModule.register({}), UserModule, RoleModule, UserSessionModule, AuthModule,
  TypeOrmModule.forFeature([User])],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude(
      { path: 'auth', method: RequestMethod.ALL }
    ).forRoutes(RoleController, UserController);

    consumer.apply(AdminRightsMiddleware).forRoutes(RoleController);

    consumer.apply(ModeratorMiddleware).forRoutes(UserController);
  }
}
