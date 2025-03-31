import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ApiControllerService } from './api-controller.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DestroyRef } from '@angular/core';

describe('ApiControllerService', () => {
  let service: ApiControllerService;
  let httpClient: HttpClient;
  const baseUrl = 'https://gorest.co.in/public/v2';

  beforeEach(() => {
    httpClient = {
      get: jest.fn(() => new Observable()),
      post: jest.fn(() => new Observable()),
      put: jest.fn(() => new Observable()),
      delete: jest.fn(() => new Observable()),
    } as unknown as HttpClient;

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ApiControllerService,
        DestroyRef,
        {
          provide: HttpClient,
          useValue: httpClient,
        },
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(ApiControllerService);
    httpClient = TestBed.inject(HttpClient);
    service['headers'] = {
      Authorization: `Bearer`,
      'Content-Type': 'application/json',
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call post method and set loading to true', () => {
    const postSpy = jest.spyOn(httpClient, 'post');
    service.post('test', { data: 'test' });
    expect(service.loading$.value).toBeTruthy();
    expect(postSpy).toHaveBeenCalled();
  });

  it('should call handleStatusUpdates when post succeeds', () => {
    const handleStatusUpdatesSpy = jest.spyOn(
      service,
      'handleStatusUpdates' as any,
    );
    jest.spyOn(httpClient, 'post').mockReturnValue(of(true as any));

    service.post('test', { data: 'test' }).subscribe(() => {
      expect(handleStatusUpdatesSpy).toHaveBeenCalled();
    });
  });

  it('should call handleRetry when post fails', () => {
    const handleRetrySpy = jest.spyOn(service, 'handleRetry' as any);
    jest.spyOn(httpClient, 'post').mockReturnValue(of(new Error()));

    service.post('test', { data: 'test' }).subscribe(() => {
      expect(handleRetrySpy).toHaveBeenCalled();
    });
  });

  it('should call put method and set loading to true', () => {
    const putSpy = jest.spyOn(httpClient, 'put');
    service.put('test', { data: 'test' });
    expect(service.loading$.value).toBeTruthy();
    expect(putSpy).toHaveBeenCalled();
  });

  it('should call handleStatusUpdates when put succeeds', () => {
    const handleStatusUpdatesSpy = jest.spyOn(
      service,
      'handleStatusUpdates' as any,
    );
    jest.spyOn(httpClient, 'put').mockReturnValue(of(true as any));

    service.put('test', { data: 'test' }).subscribe(() => {
      expect(handleStatusUpdatesSpy).toHaveBeenCalled();
    });
  });

  it('should call handleRetry when put fails', () => {
    const handleRetrySpy = jest.spyOn(service, 'handleRetry' as any);
    jest.spyOn(httpClient, 'put').mockReturnValue(of(new Error()));

    service.put('test', { data: 'test' }).subscribe(() => {
      expect(handleRetrySpy).toHaveBeenCalled();
    });
  });

  it('should call delete method and set loading to true', () => {
    const deleteSpy = jest.spyOn(httpClient, 'delete');
    service.delete('test');
    expect(service.loading$.value).toBeTruthy();
    expect(deleteSpy).toHaveBeenCalled();
  });

  it('should call handleStatusUpdates when delete succeeds', () => {
    const handleStatusUpdatesSpy = jest.spyOn(
      service,
      'handleStatusUpdates' as any,
    );
    jest.spyOn(httpClient, 'delete').mockReturnValue(of(true as any));

    service.delete('test').subscribe(() => {
      expect(handleStatusUpdatesSpy).toHaveBeenCalled();
    });
  });

  it('should call handleRetry when delete fails', () => {
    const handleRetrySpy = jest.spyOn(service, 'handleRetry' as any);
    jest.spyOn(httpClient, 'delete').mockReturnValue(of(new Error()));

    service.delete('test').subscribe(() => {
      expect(handleRetrySpy).toHaveBeenCalled();
    });
  });
});
