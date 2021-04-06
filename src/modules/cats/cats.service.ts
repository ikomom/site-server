import { Injectable } from '@nestjs/common';
import { Cat } from './cats.interface';
import { InjectModel } from '@nestjs/sequelize';
import { Cats } from '../../models/cats.model';
import { plainToClass } from 'class-transformer';
import { Op } from 'sequelize';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cats) private catsModel: typeof Cats) {
    // this.cats.push(commonValue)
  }

  async add(cat: Cat) {
    try {
      await plainToClass(Cats, cat).save();
    } catch (e) {
      throw new Error(e);
    }
  }

  async findByName(name: string) {
    return this.catsModel.findAndCountAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
  }

  async findAll(): Promise<Cats[]> {
    return this.catsModel.findAll();
  }

  async findById(id: number) {
    return this.catsModel.findOne({
      where: {
        id: id,
      },
    });
  }

  async updateById(id: number, cat: Cat) {
    const findResult = await this.findById(id);
    if (!findResult) {
      return '数据不存在';
    }
    await findResult.update(cat);
    return '更新成功';
  }

  async deleteById(id: number) {
    const findResult = await this.findById(id);
    if (!findResult) {
      return '数据不存在';
    }
    await findResult.destroy();
    return '删除成功';
  }
}
