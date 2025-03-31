import { Component, inject, OnInit } from '@angular/core';
import { ApiControllerService } from '../../services/api-controller/api-controller.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import _ from 'lodash';
import { SessionConstants } from '../../route-guards/can-activate.guard';
import { UserResponse } from '../user-flow.types';
import { UserCommunicationService } from '../../services/user-communication/user-communication.service';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  providers: [ApiControllerService, UserCommunicationService],
})
export class UserProfileComponent implements OnInit {
  private readonly router = inject(Router);
  public readonly userCommunicationService = inject(UserCommunicationService);
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
    this.userCommunicationService.fetchUser().subscribe((response) => {
      this.populateForm(response);
    });
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

  // This method would/should include a tagging event in a real world app
  public onDelete(): void {
    // I will just simulate the delete action here
    this.handleSucceessDelete();

    // Uncomment the following lines to enable the delete functionality

    // this.userCommunicationService
    //   .deleteUser()
    //   .subscribe(() => this.handleSucceessDelete());
  }

  private handleSucceessDelete() {
    sessionStorage.setItem(SessionConstants.IsLoggedIn, 'false');
    this.router.navigate(['./login']);
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

    const payload = {
      name: this.userProfileForm.value.name,
      email: this.userProfileForm.value.email,
      gender: this.userProfileForm.value.gender,
      status: 'active',
    };

    this.userCommunicationService.updateProfile(payload).subscribe(() => {
      this.handleSuccessUpdate();
    });
  }

  public onLogout(): void {
    sessionStorage.setItem(SessionConstants.IsLoggedIn, 'false');
    this.router.navigate(['./login']);
  }

  private handleSuccessUpdate(): void {
    this.formDisabled = true;
    this.showSuccessMessage = true;
  }
}
