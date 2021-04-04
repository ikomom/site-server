import { Inject, Injectable } from '@nestjs/common';
import { Cat } from './cats.interface';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];
  readonly key: string = 'admin';

  // service 被控制的依赖也能注入其他依赖,
  // 但是不能在constructor注入自己，因为依赖注入未完成
  constructor(
    @Inject('commonValue') private readonly commonValue,
    private moduleRef: ModuleRef,
  ) {
    // this.cats.push(commonValue)
  }

  async add(cat: Cat) {
    const val = this.moduleRef.get('commonValue', { strict: false });
    const contextId = ContextIdFactory.create();

    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
