import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './user-login.component';
import { RouterModule, Routes } from '@angular/router';
import { AppInputComponent } from '../shared-component/app-input/app-input.component';
import { CTAButtonComponent } from '../shared-component/cta-button/cta-button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorPipe } from '../pipes/validation-error.pipe';

export const routes: Routes = [
  {
    path: '',
    component: UserLoginComponent,
  },
];

@NgModule({
  declarations: [UserLoginComponent],
  exports: [UserLoginComponent],
  imports: [
    CommonModule,
    AppInputComponent,
    CTAButtonComponent,
    ReactiveFormsModule,
    ValidationErrorPipe,
    RouterModule.forChild(routes),
  ],
})
export class UserLoginModule {}
