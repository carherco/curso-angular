import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from "rxjs";
import { delay, tap, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usertoken: {username: string, token: string }

  constructor(private http: HttpClient) { 

    this.usertoken = {
      username: '',
      token: ''
    };

  }

  login(user: {username: string, password: string}): Observable<boolean> {
    //let obs = this.http.post('https://api/login', user);


    if (user.username === 'carlos' && user.password === 'carlos') {
      let respuestaSimulada = {
        username: 'Carlos',
        token: 'asdfasart4385u34tfsg4tgrfw5g3'
      }
      let obs_simulado = Observable.create(
        emmitter => {emmitter.next(respuestaSimulada); emmitter.complete()}
      )
      
      .pipe(delay(1000),
            map(
                  (respuesta: {username: string, token: string }) => {
                    this.usertoken = respuesta;
                    localStorage.setItem('username',respuesta.username);
                    localStorage.setItem('token', respuesta.token);
                    return true;
                  })
      );

      return obs_simulado;

    } else {

      let obs_simulado = Observable.create(
        emmitter => {emmitter.next(false); emmitter.complete()}
      ).pipe(delay(1000));

      return obs_simulado;
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



}
