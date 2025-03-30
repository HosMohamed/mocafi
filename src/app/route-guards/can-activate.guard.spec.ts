import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import CanActivateGuard, { SessionConstants } from './can-activate.guard';

describe('CanActivateGuard', () => {
  let guard: CanActivateGuard;

  beforeEach(() => {
    const routerService = {
      createUrlTree: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        CanActivateGuard,
        { provide: Router, useValue: routerService },
      ],
    });

    guard = TestBed.inject(CanActivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation when user is logged in', () => {
    jest.replaceProperty(guard, 'isLoggedIn' as any, true);
    const result = guard.canActivate(null as any, null as any);
    expect(result).toBe(true);
  });

  it('should redirect to login when user is not logged in', () => {
    const createUrlTreeSpy = jest
      .spyOn(guard['router'], 'createUrlTree')
      .mockReturnValue('/login' as any);

    jest.replaceProperty(guard, 'isLoggedIn' as any, false);
    const result = guard.canActivate(null as any, null as any);
    expect(createUrlTreeSpy).toHaveBeenCalledWith(['/login']);
    expect(result).toBe('/login' as any);
  });
});
