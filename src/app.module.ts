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
import { SequelizeModule } from '@nestjs/sequelize';
import { Logger } from './utils/log4js';

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
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: () => {
        return {
          dialect: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '123456',
          database: 'testdb',
          autoLoadModels: true,
          // synchronize: true,
          logging: (msg) => Logger.log(msg),
        };
      },
    }),
    CoreModule,
    DogsModule,
    CatsModule,
  ],
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
