import { Component, inject } from '@angular/core';
import _ from 'lodash';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiControllerService } from '../../services/api-controller/api-controller.service';
import { UserResponse } from '../user-flow.types';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { SessionConstants } from '../../route-guards/can-activate.guard';
import { UserCommunicationService } from '../../services/user-communication/user-communication.service';

@Component({
  selector: 'app-user-registration',
  standalone: false,
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.scss',
  providers: [ApiControllerService, UserCommunicationService],
})
export class UserRegistrationComponent {
  private readonly router = inject(Router);
  public readonly apiControllerService = inject(ApiControllerService);
  public readonly userCommunicationService = inject(UserCommunicationService);

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

    const payload = {
      name: this.registrationForm.value.name,
      email: this.registrationForm.value.email,
      gender: this.registrationForm.value.gender,
      status: 'active',
    };

    this.userCommunicationService.createUser(payload).subscribe((response) => {
      this.handleSuccessRegistration(response);
    });
  }

  private handleSuccessRegistration(
    response: UserResponse,
  ): Observable<UserResponse> {
    sessionStorage.setItem(SessionConstants.IsLoggedIn, 'true');
    this.router.navigate(['./profile']);
    return of(response);
  }
}
