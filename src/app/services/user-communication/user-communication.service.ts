import { DestroyRef, inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, exhaustMap, of } from 'rxjs';
import { UserPayload, UserResponse } from '../../user-flow/user-flow.types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiControllerService } from '../api-controller/api-controller.service';

@Injectable({
  providedIn: 'root',
})
export class UserCommunicationService {
  private readonly destroyRef = inject(DestroyRef);
  public readonly apiControllerService = inject(ApiControllerService);

  public createUser(payload: UserPayload): Observable<UserResponse> {
    return this.apiControllerService
      .post<UserPayload, UserResponse>('users', {
        ...payload,
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        exhaustMap((response) => of(response)),
      );
  }

  public fetchUser(userId: string = '7804411'): Observable<UserResponse> {
    return this.apiControllerService.get(`users/${userId}`).pipe(
      takeUntilDestroyed(this.destroyRef),
      exhaustMap((response: UserResponse) => of(response)),
    );
  }
  public updateProfile(
    payload: UserPayload,
    userId: string = '7804411',
  ): Observable<UserResponse> {
    return this.apiControllerService
      .put<UserPayload, UserResponse>(`users/${userId}`, {
        ...payload,
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        exhaustMap((response) => of(response)),
      );
  }

  public deleteUser(userId: string = '7804411'): Observable<UserResponse> {
    return this.apiControllerService.delete(`users/${userId}`).pipe(
      takeUntilDestroyed(this.destroyRef),
      exhaustMap((response) => of(response)),
    );
  }
}
