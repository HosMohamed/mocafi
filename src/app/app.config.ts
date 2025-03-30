import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import CanActivateGuard from './route-guards/can-activate.guard';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { timeoutInterceptor } from './services/timeout-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    CanActivateGuard,
    provideHttpClient(withInterceptors([timeoutInterceptor])),
  ],
};
