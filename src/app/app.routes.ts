import { Routes } from '@angular/router';
import CanActivateGuard from './route-guards/can-activate.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./user-login/user-login.module').then(
        (res) => res.UserLoginModule
      ),
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./user-registration/user-registration.module').then(
        (res) => res.UserRegistrationModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./user-profile/user-profile.module').then(
        (res) => res.UserProfileModule
      ),
    canActivate: [CanActivateGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
