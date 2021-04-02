import {
  Body,
  Controller,
  Get,
  Inject,
  Optional,
  Post,
  UseGuards, UseInterceptors,
  UsePipes
} from '@nestjs/common'
import { CatsService } from './cats.service';
import { CreateCatDto } from '../../app.dto';
import { Cat } from './cats.interface';
import { AuthGuard } from '../../guard/auth.guard';
import { Roles } from '../../guard/auth.decorator';
import { LoggingInterceptor } from '../../interceptor/logging.interceptor'

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
  async findAll(@Body() body: any): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
