import { Controller, Get } from '@nestjs/common';
import * as Log4js from 'log4js';

@Controller('dogs')
export class DogsController {
  @Get()
  hello() {
    return {
      code: 200,
      data: {
        message: 'ok',
      },
    };
  }
}
