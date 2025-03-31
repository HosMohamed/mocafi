import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserRegistrationComponent } from './user-registration.component';
import { Router } from '@angular/router';
import { ValidationErrorPipe } from '../../pipes/validation-error.pipe';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ApiControllerService } from '../../services/api-controller.service';

describe('UserLoginComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;

  beforeAll(() => {
    TestBed.configureTestingModule({
      declarations: [UserRegistrationComponent],
      providers: [
        Router,
        provideHttpClient(),
        {
          provide: ApiControllerService,
          useValue: {
            post: jest.fn(() => of(true)),
          },
        },
      ],
      imports: [ValidationErrorPipe],
    });
    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return undefined if form is invalid', () => {
    jest
      .spyOn(component.registrationForm, 'valid', 'get')
      .mockReturnValue(false);

    const res = component.onRegistration();
    expect(res).toBeUndefined();
  });

  it('should call apiControllerService.post with correct parameters', () => {
    jest
      .spyOn(component.registrationForm, 'valid', 'get')
      .mockReturnValue(true);
    const postSpy = jest.spyOn(component.apiControllerService, 'post');

    component.registrationForm.patchValue({
      name: 'John Doe',
      gender: 'Male',
      email: 'john.doe@example.com',
    });

    component.onRegistration();

    expect(postSpy).toHaveBeenCalledWith('users', {
      email: 'john.doe@example.com',
      gender: 'Male',
      name: 'John Doe',
      status: 'active',
    });
  });

  it('should call navigate on handleSuccessRegistration', () => {
    const navigateSpy = jest.spyOn(component['router'], 'navigate');

    component['handleSuccessRegistration']({} as any);

    expect(navigateSpy).toHaveBeenCalledWith(['./profile']);
  });
});
