import { Controller, Get } from '@nestjs/common';

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
