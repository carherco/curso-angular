import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
  });

  afterEach(() => {
    localStorage.removeItem('user_token');
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('user logged', inject([AuthService], (service: AuthService) => {
    localStorage.setItem('user_token', '1234');
    expect(service.isLogged()).toBeTruthy();
  }));

  it('user not logged', inject([AuthService], (service: AuthService) => {
    expect(service.isLogged()).toBeFalsy();
  }));


});
