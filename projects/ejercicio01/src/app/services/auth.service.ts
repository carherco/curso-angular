import { Injectable } from '@angular/core';
import { Observable, of, timer, Subject, BehaviorSubject } from "rxjs";
import { delay, tap, map } from "rxjs/operators";

const respuestaSimuladaOk = {
  username: 'test',
  token: 'asdfasart4385u34tfsg4tgrfw5g3'
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // usertoken: {username: string, token: string };

  username$: BehaviorSubject<string> = new BehaviorSubject(localStorage.getItem('username'));
  constructor() {

    // this.usertoken = {
    //   username: '',
    //   token: ''
    // };

  }

  login(user: {username: string, password: string}): Observable<boolean> {
    //let obs = this.http.post('https://api/login', user);

    if (user.username === 'test' && user.password === 'test') {
      return of(respuestaSimuladaOk).pipe(
        delay(1000),
        map(
          (respuesta: {username: string, token: string }) => {
            // this.usertoken = respuesta;
            localStorage.setItem('username',respuesta.username);
            localStorage.setItem('token', respuesta.token);
            return true;
          })
      );

    } else {
      return of(false).pipe(delay(1000));
    }


  }

  logout(): Observable<boolean> {
    // this.usertoken = {
    //   username: '',
    //   token: ''
    // };
    localStorage.removeItem('username');
    localStorage.removeItem('token');

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
        localStorage.setItem('username', username);
        this.username$.next(username);
        // this.usertoken.username = username;
      })
    );
  }

}
