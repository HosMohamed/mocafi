import { Observable, throwError, timeout } from 'rxjs';
import { HttpRequest, HttpEvent, HttpHandlerFn } from '@angular/common/http';

export function timeoutInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    timeout({
      each: 10_000,
      with: () => throwError(() => new Error('Request timeout')),
    }),
  );
}
