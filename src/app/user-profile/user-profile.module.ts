import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppInputComponent } from '../shared-component/app-input/app-input.component';
import { CTAButtonComponent } from '../shared-component/cta-button/cta-button.component';
import { ValidationErrorPipe } from '../pipes/validation-error.pipe';

export const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
  },
];

@NgModule({
  declarations: [UserProfileComponent],
  exports: [UserProfileComponent],
  imports: [
    CommonModule,
    AppInputComponent,
    CTAButtonComponent,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    ValidationErrorPipe,
    RouterModule.forChild(routes),
  ],
})
export class UserProfileModule {}
