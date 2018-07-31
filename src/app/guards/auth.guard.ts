import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean
  {
      if(this.authService.isLogged()) {
      // if (localStorage.getItem('user_token')) {
          // logged in so return true
          return true;
      }

      // not logged in so redirect to login page
      this.router.navigate(['/login']);
      return false;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean
  {
      if(this.authService.isLogged()) {
      // if (localStorage.getItem('user_token')) {
          // logged in so return true
          return true;
      }

      // not logged in so redirect to login page
      this.router.navigate(['/login']);
      return false;
  }
}
