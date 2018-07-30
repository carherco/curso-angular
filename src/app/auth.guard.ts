import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AuthService } from "app/auth.service";
import { Observable } from 'rxjs';

@Injectable()
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
