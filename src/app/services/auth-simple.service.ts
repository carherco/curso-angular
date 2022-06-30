import { Injectable } from '@angular/core';

interface UserCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthSimpleService {

  private lastLoginerrorMessage: string = '';

  constructor() {}

  login(user: UserCredentials): boolean {
    if (user.username === 'curso' && user.password === 'angular') {
      localStorage.setItem('username', user.username);
      localStorage.setItem('token', 'token_simulado');
      return true;
    } else {
      this.lastLoginErrorMessage = 'Credenciales incorrectas';
      return false;
    }
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  }

  isLogged(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  getUsername(): string {
    return localStorage.getItem('username');
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getLastLoginErrorMessage(): string {
    return this.lastLoginErrorMessage;
  }

}
