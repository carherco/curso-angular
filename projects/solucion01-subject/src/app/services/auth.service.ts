import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from "rxjs";
import { delay, tap, map } from "rxjs/operators";

const respuestaSimuladaOk = {
  username: 'test',
  token: 'asdfasart4385u34tfsg4tgrfw5g3'
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private username$: BehaviorSubject<string> = new BehaviorSubject(this.getUsername());

  constructor() {

  }

  login(user: {username: string, password: string}): Observable<boolean> {

    if (user.username === 'test' && user.password === 'test') {
      return of(respuestaSimuladaOk).pipe(
        delay(1000),
        map(
          (respuesta: {username: string, token: string }) => {
            localStorage.setItem('username',respuesta.username);
            localStorage.setItem('token', respuesta.token);
            this.username$.next(respuesta.username);
            return true;
          })
      );

    } else {
      return of(false).pipe(delay(1000));
    }


  }

  logout(): Observable<boolean> {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this.username$.next('');
    return of(true);
  }

  isLogged(): Observable<boolean> {
    if(localStorage.getItem('token')) {
      return of(true);
    } else {
      return of(false);
    }
  }

  getUsername(): string {
    console.log('Lectura del localStorage');
    return localStorage.getItem('username');
  }

  getUsername$(): Observable<string> {
    return this.username$.asObservable();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setUsername(username: string) {
    return of(true).pipe(
      delay(1000),
      tap( () => {
        localStorage.setItem('username',username);
        this.username$.next(username);
      })
    );
  }

}
