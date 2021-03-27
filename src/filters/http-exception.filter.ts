import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as uuid from 'uuid';

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const commonRes = {
      id: uuid.v4(),
      timestamp: new Date().toISOString(),
      path: request.url,
    };
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      response.status(status).json({
        ...commonRes,
        code: status,
        response: exception.getResponse(),
      });
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        ...commonRes,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        response: exception.message,
      });
    }
  }
}
