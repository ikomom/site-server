import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  imports: [],
  controllers: [AppController, CatsController],
  providers: [
    AppService,
    CatsService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: 'commonValue',
      useValue: {
        app: true,
      },
    },
  ],
})
export class AppModule {}
