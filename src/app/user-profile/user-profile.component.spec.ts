import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileComponent } from './user-profile.component';
import { Router } from '@angular/router';
import { ValidationErrorPipe } from '../pipes/validation-error.pipe';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('UserLoginComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeAll(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      providers: [Router, provideHttpClient()],
      imports: [ValidationErrorPipe],
    });
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchUserProfile on init', () => {
    const fetchUserProfileSpy = jest.spyOn(
      component,
      'fetchUserProfile' as any,
    );

    component.ngOnInit();
    expect(fetchUserProfileSpy).toHaveBeenCalled();
  });

  it('should call populateForm with the correct response', () => {
    const populateFormSpy = jest.spyOn(component, 'populateForm' as any);
    jest.spyOn(component.apiControllerService, 'get').mockReturnValue(of(true));
    expect(populateFormSpy).not.toHaveBeenCalled();
  });

  it('should set the userProfileForm values correctly', () => {
    component['populateForm']({
      status: 'active',
      name: 'SamHere',
      gender: 'Male',
      email: 'something@hotmail.com',
    } as any);

    expect(component.userProfileForm.value).toEqual({
      name: 'SamHere',
      gender: 'Male',
      email: 'something@hotmail.com',
    });
  });

  it('should set formDisabled to false on edit', () => {
    component.onEdit();
    expect(component.formDisabled).toBe(false);
  });

  it('should call handleSuccessDelete on delete', () => {
    const handleSuccessDeleteSpy = jest.spyOn(
      component,
      'handleSucceessDelete' as any,
    );
    component['onDelete']();
    expect(handleSuccessDeleteSpy).toHaveBeenCalled();
  });

  it('should return if form is not valid', () => {
    jest
      .spyOn(component.userProfileForm, 'valid', 'get')
      .mockReturnValue(false);
    const res = component.onUpdate();
    expect(res).toBeUndefined();
  });

  it('should call router navigate on logout', () => {
    const navigateSpy = jest.spyOn(component['router'], 'navigate');
    component['onLogout']();
    expect(navigateSpy).toHaveBeenCalledWith(['./login']);
  });

  it('should set formDisabled and showSuccessMessage to true on success update', () => {
    component['handleSuccessUpdate']({} as any);
    expect(component.formDisabled).toBe(true);
    expect(component.showSuccessMessage).toBe(true);
  });
});
