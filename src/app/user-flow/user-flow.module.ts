import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginModule } from '../user-login/user-login.module';
import { UserRegistrationModule } from '../user-registration/user-registration.module';
import { UserProfileModule } from '../user-profile/user-profile.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppInputComponent } from '../shared-component/app-input/app-input.component';
import { CTAButtonComponent } from '../shared-component/cta-button/cta-button.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * This Module will ONLY be a container for any user related modules
 */
@NgModule({
  declarations: [],
  exports: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppInputComponent,
    CTAButtonComponent,
    UserLoginModule,
    UserRegistrationModule,
    MatProgressSpinnerModule,
    UserProfileModule,
  ],
  providers: [],
})
export class UserFlowModule {}
