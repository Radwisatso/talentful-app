import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class EmployeeRpcExceptionFilter implements RpcExceptionFilter<any> {
  catch(exception: any, host: ArgumentsHost): Observable<any> {
    // Handle NestJS HTTP Exceptions
    if (exception.getStatus && typeof exception.getStatus === 'function') {
      return throwError(
        () =>
          new RpcException({
            statusCode: exception.getStatus(),
            message: exception.message,
            error: exception.name,
          }),
      );
    }

    // Handle Prisma errors
    if (exception.code) {
      let statusCode = 400;
      let message = 'Database error';

      switch (exception.code) {
        case 'P2002':
          statusCode = 409;
          message = 'Email address is already registered';
          break;
        case 'P2025':
          statusCode = 404;
          message = 'Record not found';
          break;
        default:
          message = 'Database operation failed';
      }

      return throwError(
        () =>
          new RpcException({
            statusCode,
            message,
            error: 'DatabaseError',
          }),
      );
    }

    // Handle unknown errors
    return throwError(
      () =>
        new RpcException({
          statusCode: 500,
          message: exception.message || 'Internal server error',
          error: 'InternalError',
        }),
    );
  }
}
