import { NestFactory } from '@nestjs/core';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';

import { AppModule } from './app.module';
import { ValidationFilter } from './common/filters/validation.filter';
import { ValidationException } from './common/exceptions/validation.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new ValidationFilter());

  app.useGlobalPipes(new ValidationPipe({
    skipMissingProperties: true,
    exceptionFactory: (errors: ValidationError[]) => new ValidationException(errors)
  }));
  await app.listen(3000);
}
bootstrap();
