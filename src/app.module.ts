import {
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { DogsModule, CatsModule } from './modules';
import { LoggerMiddleware } from './middleware/logger.middleware';

const commonValueProvider = {
  provide: 'commonValue',
  useValue: {
    app: true,
  },
};

@Global()
@Module({
  providers: [commonValueProvider],
  exports: [commonValueProvider],
})
export class CoreModule {}

@Module({
  imports: [DogsModule, CatsModule, CoreModule],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    // .forRoutes({ path: 'cats', method: RequestMethod.GET }); //.forRoutes('catsssss')
  }
}
