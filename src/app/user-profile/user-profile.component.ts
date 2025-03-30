import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ApiControllerService } from '../services/api-controller.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import _, { take } from 'lodash';
import { exhaustMap, of } from 'rxjs';
import { SessionConstants } from '../route-guards/can-activate.guard';
import { UserPayload, UserResponse } from '../user-flow/user-flow.types';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  providers: [ApiControllerService],
})
export class UserProfileComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  public readonly apiControllerService = inject(ApiControllerService);

  public userProfileForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    gender: new FormControl('', [
      Validators.required,
      Validators.pattern('Male|Female|male|female'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  public formDisabled = true;
  public showSuccessMessage = false;

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  private fetchUserProfile(): void {
    this.apiControllerService.loading$.next(true);
    this.apiControllerService
      .get('users/7804411')
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        exhaustMap((response: UserResponse) => {
          this.populateForm(response);
          this.apiControllerService.loading$.next(false);
          return of(response);
        }),
      )
      .subscribe();
  }

  private populateForm(response: UserResponse): void {
    if (response.status === 'active') {
      this.userProfileForm.patchValue({
        name: response.name,
        email: response.email,
        gender: response.gender,
      });
    }
  }

  public onEdit(): void {
    this.formDisabled = false;
  }

  public getErrorMessages(control: FormControl): string[] {
    const errors = [];

    if (!_.isEmpty(control.errors) && control.touched) {
      if (control?.errors?.['email']) {
        errors.push('Please enter a valid email');
      }
      if (control?.errors?.['minlength']) {
        errors.push('A minimum length of 8 characters is required');
      }
      if (control?.errors?.['pattern']) {
        errors.push('Gender should either be Male or Female');
      }
    }

    return errors;
  }

  // This method would/should include a tagging event in a real world app
  public onDelete(): void {
    this.apiControllerService.loading$.next(true);

    // I will just simulate the delete action here
    this.handleSucceessDelete({} as UserResponse);

    // Uncomment the following lines to enable the delete functionality

    // this.apiControllerService
    //   .delete('users/7804411')
    //   .pipe(
    //     takeUntilDestroyed(this.destroyRef),
    //     exhaustMap((response: UserResponse) => {
    //       return this.handleSucceessDelete(response);
    //     }),
    //   )
    //   .subscribe();
  }

  private handleSucceessDelete(response: UserResponse) {
    this.apiControllerService.loading$.next(false);
    this.apiControllerService.error$.next(false);
    sessionStorage.setItem(SessionConstants.IsLoggedIn, 'false');
    this.router.navigate(['./login']);
    return of(response);
  }

  // This method would/should include a tagging event in a real world app
  public onUpdate(): void {
    if (
      !this.userProfileForm.valid ||
      !this.userProfileForm?.value?.email ||
      !this.userProfileForm.value.gender ||
      !this.userProfileForm.value.name
    ) {
      return;
    }

    this.apiControllerService.loading$.next(true);
    this.apiControllerService
      .put<UserPayload, UserResponse>('users/7804411', {
        email: this.userProfileForm.value.email,
        gender: this.userProfileForm.value.gender,
        name: this.userProfileForm.value.name,
        status: 'active',
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        exhaustMap((response: UserResponse) => {
          this.apiControllerService.loading$.next(false);
          this.apiControllerService.error$.next(false);
          this.formDisabled = true;
          this.showSuccessMessage = true;
          return of(response);
        }),
      )
      .subscribe();
  }
}
