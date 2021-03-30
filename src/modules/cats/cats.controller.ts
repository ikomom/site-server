import { Body, Controller, Get, Inject, Optional, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from '../../app.dto';
import { Cat } from './cats.interface';

@Controller('cats')
export class CatsController {
  constructor(
    private catsService: CatsService,
    @Inject('commonValue') private readonly commonValue,
    @Optional() @Inject('xx') private coom, // 无的时候, 是undefined
  ) {}

  @Post()
  async addCat(@Body() createCatDto: CreateCatDto) {
    await this.catsService.add(createCatDto);
    return {
      code: 0,
      message: '添加成功',
      ...this.commonValue,
      a: this.coom + '11',
    };
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
