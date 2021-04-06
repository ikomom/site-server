import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { ConfigModel } from '../../models';

@Module({
  imports: [ConfigModel],
  controllers: [ConfigController],
  providers: [ConfigService],
})
export class ConfigModule {}
