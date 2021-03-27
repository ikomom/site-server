import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Next,
  Post,
  Req,
  Res,
  UseFilters,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { CreateCatDto } from './app.dto';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('cat')
  getCat(@Req() request: Request, @Res() response: Response): any {
    response.status(200).send({
      data: [],
      code: 0,
    });
  }

  @Post()
  getSome(@Body() body: CreateCatDto) {
    if (body.age > 18) {
      return '通过';
    } else {
      throw new HttpException(
        {
          msg: '不通过',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
