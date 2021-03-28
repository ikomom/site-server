import { Inject, Injectable } from '@nestjs/common';
import { Cat } from './cats.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  // service 被控制的依赖也能注入其他依赖,
  // 但是不能在constructor注入自己，因为依赖注入未完成
  constructor(
    @Inject('commonValue') private readonly commonValue,
  ) {
    // this.cats.push(commonValue)
  }

  async add(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
