import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserLoginComponent } from './user-login.component';
import { Router } from '@angular/router';
import { ValidationErrorPipe } from '../../pipes/validation-error.pipe';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;

  beforeAll(() => {
    TestBed.configureTestingModule({
      declarations: [UserLoginComponent],
      providers: [Router],
      imports: [ValidationErrorPipe],
    });
    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set loginErrorMessage to true when form is invalid', () => {
    component.loginForm.controls.userName.setValue('');
    component.loginForm.controls.password.setValue('');
    component.onLoginSubmit();
    expect(component.loginErrorMessage).toBe(true);
  });

  it('should call router navigate on valid form submission', () => {
    jest.spyOn(component['router'], 'navigate');
    component.loginForm.controls.userName.setValue('SamHere');
    component.loginForm.controls.password.setValue('adminadmin');
    component.onLoginSubmit();
    expect(component['router'].navigate).toHaveBeenCalledWith(['./profile']);
  });
});
