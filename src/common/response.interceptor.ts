import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  @Injectable()
  export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
      return next.handle().pipe(
        map((data) => {
          const response = context.switchToHttp().getResponse();
          const statusCode = response.statusCode;
  
          // Memastikan properti 'message' ada di data, jika tidak, gunakan pesan default
          const message = data && typeof data === 'object' && 'message' in data
            ? (data as any).message
            : 'Request successful';
  
          return {
            status: statusCode,
            message,
            data,
          };
        }),
      );
    }
  }
  