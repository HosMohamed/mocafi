import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import _ from 'lodash';
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

    this.handleValidForm();
  }

  private handleValidForm(): void {
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
