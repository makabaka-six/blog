import { Injectable, NestInterceptor, ExecutionContext, CallHandler, } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseResponseDto } from '@/common/response.dto';

@Injectable()
export default class ResponseInterceptor<T> implements NestInterceptor<T, BaseResponseDto<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<BaseResponseDto<T>> {
    return next.handle().pipe(
      map((data) => ({
        code: 200,
        message: 'Success',
        data,
      })),
    );
  }
}