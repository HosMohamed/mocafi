import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegistrationComponent } from './user-registration.component';
import { RouterModule, Routes } from '@angular/router';
import { AppInputComponent } from '../shared-component/app-input/app-input.component';
import { CTAButtonComponent } from '../shared-component/cta-button/cta-button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export const routes: Routes = [
  {
    path: '',
    component: UserRegistrationComponent,
  },
];

@NgModule({
  declarations: [UserRegistrationComponent],
  exports: [UserRegistrationComponent],
  imports: [
    CommonModule,
    AppInputComponent,
    CTAButtonComponent,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(routes),
  ],
})
export class UserRegistrationModule {}
