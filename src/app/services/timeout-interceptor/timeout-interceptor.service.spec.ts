import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { timeoutInterceptor } from './timeout-interceptor.service';
import { firstValueFrom, Observable } from 'rxjs';

describe('TimeoutInterceptor', () => {
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(withInterceptors([timeoutInterceptor]))],
    });

    httpClient = TestBed.inject(HttpClient);
  });

  it('should return the response', async () => {
    const res = timeoutInterceptor({} as any, () => {
      return new Observable((observer) => {
        setTimeout(() => {
          observer.next('response' as any);
          observer.complete();
        }, 1000);
      });
    });

    const result = await firstValueFrom(res);
    expect(result).toBe('response');
  }, 10000);
  it('should throw an error when it times out', () => {
    const res = timeoutInterceptor({} as any, () => {
      return new Observable((observer) => {
        setTimeout(() => {
          observer.next('response' as any);
          observer.complete();
        }, 11000);
      });
    });

    res.subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });
  }, 12000);
});
