import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Optional,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from '../../app.dto';
import { AuthGuard } from '../../guard/auth.guard';
import { Roles } from '../../guard/auth.decorator';
import { LoggingInterceptor } from '../../interceptor/logging.interceptor';
import { Cat } from './cats.interface';

@Roles('cats')
@Controller('cats')
export class CatsController {
  constructor(
    private catsService: CatsService,
    @Inject('commonValue') private readonly commonValue,
    @Optional() @Inject('xx') private coom, // 无的时候, 是undefined
  ) {}

  @Post()
  @Roles('admin')
  @UseGuards(AuthGuard)
  async addCat(@Body() createCatDto: CreateCatDto) {
    await this.catsService.add(createCatDto);
    return {
      code: 0,
      message: '添加成功',
    };
  }

  @Post('pipe')
  async addCatPipe(@Body() createCatDto: CreateCatDto) {
    return this.addCat(createCatDto);
  }

  @Get()
  @UseInterceptors(LoggingInterceptor)
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('/findOne')
  async findOneByName(@Query() query: any) {
    return this.catsService.findByName(query.name);
  }

  @Patch(':id')
  async updateById(@Body() createCatDto: Cat, @Param() params) {
    const msg = await this.catsService.updateById(params.id, createCatDto);
    return {
      code: 200,
      msg: msg,
    };
  }

  @Delete(':id')
  async deleteById(@Param() params) {
    const msg = await this.catsService.deleteById(params.id);
    return {
      code: 200,
      msg: msg,
    };
  }
}
