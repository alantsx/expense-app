import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export class CustomInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('This is INTERCEPTING the REQUEST');
    return next.handle().pipe(
      map((data) => {
        const response = data.map((report) => {
          report.createdAt = report.created_at;
          delete report.created_at;
          delete report.updated_at;

          return report;
        });

        return response;
      }),
    );
  }
}
