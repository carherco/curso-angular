import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, of } from "rxjs";
import { delay, tap, map } from "rxjs/operators";

interface Usertoken {
  username: string,
  token: string
}
interface SimulatedResponse {
  loginStatus: 'OK' | 'ERROR',
  usertoken?: Usertoken,
  errorMessage?: string
}

// --- Simulación de respuestas ---//
const BodySimulatedResponseLoginOK: SimulatedResponse = {
  loginStatus: 'OK',
  usertoken: {
    username: 'curso',
    token: 'asdfasart4385u34tfsg4tgrfw5g3'
  }
};

const BodySimulatedResponseLoginERROR: SimulatedResponse = {
  loginStatus: 'ERROR',
  errorMessage: 'Invalid Credentials'
};

const ResponseLoginOk$: Observable<SimulatedResponse> = Observable.create(
  emmitter => {emmitter.next(BodySimulatedResponseLoginOK); emmitter.complete()}
).pipe(delay(1000));

const ResponseLoginERROR$: Observable<SimulatedResponse> = Observable.create(
  emmitter => {emmitter.next(BodySimulatedResponseLoginERROR); emmitter.complete()}
).pipe(delay(1000));
// --- Fin de simulación de respuestas ---//

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usertoken: Usertoken;
  private lastLoginerrorMessage: string = '';

  constructor(private http: HttpClient) {
    this.usertoken = {
      username: '',
      token: ''
    };
    this.lastLoginErrorMessage = null;
  }

  /**
   * Método que simula un proceso de login. Las credenciales correctas son usuario: curso, password: ionic
   *
   * @param user
   * @return Observable<boolean> Observable que emite true si el proceso de login ha ido bien y emite false si ha ido mal
   */
  login(user: {username: string, password: string}): Observable<boolean> {

    if (user.username === 'curso' && user.password === 'angular') {
      // Simulamos que hemos recibido la respuesta ResponseLoginOk$
      // Cambiamos la respuesta por un true
      return ResponseLoginOk$.pipe(
        map(
          respuesta => {
            this.usertoken = respuesta.usertoken;
            this.lastLoginErrorMessage = null;
            localStorage.setItem('username',respuesta.usertoken.username);
            localStorage.setItem('token', respuesta.usertoken.token);
            return true;
          })
      );
    } else {
      // Simulamos que hemos recibido la respuesta ResponseLoginERROR$.
      // Cambiamos la respuesta por un false
      return ResponseLoginERROR$.pipe(
        map(
          respuesta => {
            this.lastLoginErrorMessage = respuesta.errorMessage;
            return false;
          }
        )
      );
    }
  }

  logout(): Observable<boolean> {
    this.usertoken = {
      username: '',
      token: ''
    };
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    return of(true);
  }

  isLogged(): Observable<boolean> {
    if (localStorage.getItem('token')) {
      return of(true);
    } else {
      return of(false);
    }
  }

  getLastLoginErrorMessage(): string {
    return this.lastLoginErrorMessage;
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setUsername(username: string) {
    return of(true).pipe(
      delay(1000),
      tap( () => {
        localStorage.setItem('username',username);
        // this.usertoken.username = username;
      })
    );
  }

}

