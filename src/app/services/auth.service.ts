import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, of } from "rxjs";
import { delay, tap, map } from "rxjs/operators";

interface Usertoken {
  username: string,
  token: string
}
interface SimulatedResponse {
  loginStatus: 'OK' | 'ERROR',
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

const ResponseLoginOk$: Observable<SimulatedResponse> = new Observable(
  emitter => {emitter.next(BodySimulatedResponseLoginOK); emitter.complete()}
);

const ResponseLoginERROR$: Observable<SimulatedResponse> = new Observable(
  emitter => {emitter.next(BodySimulatedResponseLoginERROR); emitter.complete()}
);
// --- Fin de simulación de respuestas ---//

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usertoken: Usertoken;
  private lastLoginErrorMessage: string | null;

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

    if (user.username === 'curso' && user.password === 'ionic') {
      // Simulamos que hemos recibido la respuesta ResponseLoginOk$
      // Cambiamos la respuesta por un true
      return ResponseLoginOk$.pipe(
        map(
          respuesta => {
            this.usertoken = respuesta.usertoken!;
            this.lastLoginErrorMessage = null;
            localStorage.setItem('username', respuesta.usertoken!.username);
            localStorage.setItem('token', respuesta.usertoken!.token);
            return true;
          })
      );
    } else {
      // Simulamos que hemos recibido la respuesta ResponseLoginERROR$.
      // Cambiamos la respuesta por un false
      return ResponseLoginERROR$.pipe(
        map(
          respuesta => {
            this.lastLoginErrorMessage = respuesta.errorMessage!;
            return false;
          }
        )
      );
    }
  }

  logout() {
    this.usertoken = {
      username: '',
      token: ''
    };
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  }

  isLogged(): boolean {
    if(localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  getLastLoginErrorMessage(): string | null {
    return this.lastLoginErrorMessage;
  }

}
