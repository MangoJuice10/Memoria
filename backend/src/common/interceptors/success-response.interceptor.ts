import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { SuccessResponse } from "src/common/types";
import { map, Observable } from "rxjs";

@Injectable()
export class SuccessResponseInterceptor<T> implements NestInterceptor<T, SuccessResponse<T> | T> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<SuccessResponse<T> | T> {
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data) => {
        const statusCode = response.statusCode;
        if (statusCode === 200 || statusCode === 201) {
          const body: SuccessResponse<T> = {
            status: "success",
            statusCode,
            data,
          };
          return body;
        }
        return data;
      }),
    );
  }
}
