import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { SessionConstants } from '../route-guards/can-activate.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  standalone: false,
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss',
})
export class UserLoginComponent {
  private readonly router = inject(Router);

  public loginErrorMessage = false;
  public loginForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  public getErrorMessages(control: FormControl): string[] {
    const errors = [];

    if (!_.isEmpty(control.errors) && control.touched) {
      if (control?.errors?.['required']) {
        errors.push('Password is required');
      }
      if (control?.errors?.['minlength']) {
        errors.push('A minimum length of 8 characters is required');
      }
    }

    return errors;
  }

  // This method would/should include a tagging event in a real world app
  public onLoginSubmit(): void {
    if (
      !this.loginForm.valid ||
      !this.loginForm.controls.userName.value ||
      !this.loginForm.controls.password.value
    ) {
      this.loginErrorMessage = true;
      return;
    }

    const credentials = {
      username: 'SamHere',
      password: 'adminadmin',
    };

    if (
      this.loginForm.controls.userName.value === credentials.username &&
      this.loginForm.controls.password.value === credentials.password
    ) {
      sessionStorage.setItem(SessionConstants.IsLoggedIn, 'true');
      this.router.navigate(['./profile']);
    }
  }
}
