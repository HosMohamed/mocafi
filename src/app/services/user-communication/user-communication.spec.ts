import { TestBed } from '@angular/core/testing';
import { UserCommunicationService } from './user-communication.service';
import { provideHttpClient } from '@angular/common/http';

describe('UserCommunicationService', () => {
  let service: UserCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserCommunicationService, provideHttpClient()],
    });
    service = TestBed.inject(UserCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call post method when createUser is called', () => {
    const createUserSpy = jest.spyOn(service.apiControllerService, 'post');
    service.createUser({} as any);
    expect(createUserSpy).toHaveBeenCalled();
  });
  it('should call get method when fetchUser is called', () => {
    const fetchUserSpy = jest.spyOn(service.apiControllerService, 'get');
    service.fetchUser();
    expect(fetchUserSpy).toHaveBeenCalled();
  });
  it('should call put method when updateProfile is called', () => {
    const updateProfileSpy = jest.spyOn(service.apiControllerService, 'put');
    service.updateProfile({} as any);
    expect(updateProfileSpy).toHaveBeenCalled();
  });
  it('should call delete method when deleteUser is called', () => {
    const deleteUserSpy = jest.spyOn(service.apiControllerService, 'delete');
    service.deleteUser();
    expect(deleteUserSpy).toHaveBeenCalled();
  });
});
