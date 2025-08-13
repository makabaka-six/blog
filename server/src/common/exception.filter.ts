import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export default class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    Logger.error(`
      ${request.method} ${request.url} 
      params:${JSON.stringify(request.params)} 
      body:${JSON.stringify(request.body)} 
      message:${(exception as any).message}`, 'ExceptionFilter');

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      response
        .status(HttpStatus.OK)
        .json({
          code: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: exception.message
        });
    } else {
      const status = 500;
      response
        .status(HttpStatus.OK)
        .json({
          code: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: 'Internal server error'
        });

    }
  }
}