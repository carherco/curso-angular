import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PruebaGuard implements CanActivate {
  

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true;
  }
}
