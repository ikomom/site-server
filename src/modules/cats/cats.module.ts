import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { CatsModel } from '../../models';

@Module({
  imports: [CatsModel],
  providers: [CatsService],
  controllers: [CatsController],
  exports: [CatsService],
})
export class CatsModule {}
