import { Component, DestroyRef, inject } from '@angular/core';
import _ from 'lodash';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiControllerService } from '../services/api-controller.service';
import { UserPayload, UserResponse } from '../user-flow/user-flow.types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { exhaustMap, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { SessionConstants } from '../route-guards/can-activate.guard';

@Component({
  selector: 'app-user-registration',
  standalone: false,
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.scss',
  providers: [ApiControllerService],
})
export class UserRegistrationComponent {
  private destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  public readonly apiControllerService = inject(ApiControllerService);

  public registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    gender: new FormControl('', [
      Validators.required,
      Validators.pattern('Male|Female|male|female'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  // This method would/should include a tagging event in a real world app
  public onRegistration(): void {
    if (
      !this.registrationForm.valid ||
      !this.registrationForm?.value?.email ||
      !this.registrationForm.value.gender ||
      !this.registrationForm.value.name
    ) {
      return;
    }

    this.apiControllerService
      .post<UserPayload, UserResponse>('users', {
        email: this.registrationForm.value.email,
        gender: this.registrationForm.value.gender,
        name: this.registrationForm.value.name,
        status: 'active',
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        exhaustMap((response) => {
          return this.handleSuccessRegistration(response);
        }),
      )
      .subscribe();
  }

  private handleSuccessRegistration(
    response: UserResponse,
  ): Observable<UserResponse> {
    sessionStorage.setItem(SessionConstants.IsLoggedIn, 'true');
    this.router.navigate(['./profile']);
    return of(response);
  }
}
