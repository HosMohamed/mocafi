import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

export enum SessionConstants {
  IsLoggedIn = 'IsLoggedIn',
}

@Injectable()
class CanActivateGuard implements CanActivate {
  private readonly isLoggedIn: boolean;
  private readonly router = inject(Router);

  constructor() {
    // In a real world, we will be using an access token to check user login status.
    // True if it exists, otherwise false
    this.isLoggedIn = !!sessionStorage.getItem(SessionConstants.IsLoggedIn);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    if (this.isLoggedIn) {
      return true;
    }
    return this.router.createUrlTree(['/login']);
  }
}

export default CanActivateGuard;
