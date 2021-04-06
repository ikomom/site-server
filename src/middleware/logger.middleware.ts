import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '../utils/log4js';
import * as querstring from 'querystring';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    next();
    const code = res.statusCode; // 响应状态码
    // 组装日志信息
    let body = req.body || '';
    try {
      body = JSON.stringify(req.body);
    } catch (e) {}
    const logFormat = `[${req.ip}][${code}][${
      req.method
    }] ${querstring.unescape(req.originalUrl)} ${body}`;

    // 根据状态码，进行日志类型区分
    if (code >= 500) {
      Logger.error(logFormat);
    } else if (code >= 400) {
      Logger.warn(logFormat);
    } else {
      Logger.access(logFormat);
      Logger.log(logFormat);
    }
  }
}
