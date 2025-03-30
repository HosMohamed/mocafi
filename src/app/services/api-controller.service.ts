import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, of, Observable, BehaviorSubject, map } from 'rxjs';

/**
 * This service is designed to be injected into child components, ensuring that
 * each component receives a new instance. This approach guarantees that the
 * loading and error variables associated with each request are unique
 * preventing potential conflicts or unexpected behavior when multiple
 * components make concurrent API calls.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiControllerService {
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  public loading$ = new BehaviorSubject(false);
  public error$ = new BehaviorSubject(false);
  private maxRetries = 3;
  private request_trials = 0;
  accessToken = environment.ACCESS_TOKEN;
  private baseUrl = 'https://gorest.co.in/public/v2';
  private headers = {
    Authorization: `Bearer ${this.accessToken}`,
    'Content-Type': 'application/json',
  };

  public get<T>(endPoint: string) {
    this.loading$.next(true);
    const url = `${this.baseUrl}/${endPoint}`;
    return this.httpClient
      .get<T>(url, { headers: new HttpHeaders(this.headers) })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((response) => this.handleStatusUpdates(response)),
        catchError((error) =>
          this.handleRetry<T, null>(error, endPoint, this.get<T>),
        ),
      );
  }

  public post<B, T>(endPoint: string, body: B) {
    this.loading$.next(true);
    const url = `${this.baseUrl}/${endPoint}`;
    return this.httpClient
      .post<T>(url, body, { headers: new HttpHeaders(this.headers) })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((response) => this.handleStatusUpdates(response)),
        catchError((error) =>
          this.handleRetry<B, T>(error, endPoint, this.post<B, T>, body),
        ),
      );
  }

  public put<B, T>(endPoint: string, body: B) {
    this.loading$.next(true);
    const url = `${this.baseUrl}/${endPoint}`;
    return this.httpClient
      .put<T>(url, body, { headers: new HttpHeaders(this.headers) })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((response) => this.handleStatusUpdates(response)),
        catchError((error) =>
          this.handleRetry<B, T>(error, endPoint, this.put<B, T>, body),
        ),
      );
  }

  public delete<T>(endPoint: string) {
    this.loading$.next(true);
    const url = `${this.baseUrl}/${endPoint}`;
    return this.httpClient
      .delete<T>(url, { headers: new HttpHeaders(this.headers) })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((response) => this.handleStatusUpdates(response)),
        catchError((error) =>
          this.handleRetry(error, endPoint, this.delete<T>),
        ),
      );
  }

  private handleStatusUpdates<T>(response: T) {
    this.loading$.next(false);
    this.error$.next(false);
    return response;
  }

  private handleRetry<B, T>(
    error: any,
    endPoint: string,
    method: (...args: any[]) => Observable<any>,
    body?: B,
  ): Observable<any> {
    method = method.bind(this);
    this.request_trials++;
    if (this.request_trials < this.maxRetries) {
      return !!body ? method(endPoint, body) : method(endPoint);
    }
    this.error$.next(true);
    this.loading$.next(false);
    return of(error);
  }
}
