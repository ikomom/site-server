import { User } from './user.model';
import { Cats } from './cats.model';
import { Config } from './config.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  exports: [SequelizeModule],
})
export class UserModel {}

@Module({
  imports: [SequelizeModule.forFeature([Cats])],
  exports: [SequelizeModule],
})
export class CatsModel {}

@Module({
  imports: [SequelizeModule.forFeature([Config])],
  exports: [SequelizeModule],
})
export class ConfigModel {}
