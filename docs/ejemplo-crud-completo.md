# Ejercicio mini-aplicación completa con API REST

- HomePageComponent (con botón para ir a página de login)
- LoginComponent (con formulario de login)
- AdminHomeComponent (con un menú en la que una entrada es "Listado de usuarios", las otras entradas, links falsos/inventados)
- UserListComponent (listdo de usuarios)
- UserEditComponent(formulario para editar un usuario)
- UserAddComponent (formulario para añadir un usuario)

- Usaremos la API https://reqres.in/

Tendremos un servicio userService

- getAll
- getOne
- add
- edit
- delete

Un servicio AuthService con métodos:

- login()
- logOut()
- isLogged()

Un guard AuthGuard de tipo canActivate.

## Código de ayuda

### Servicio Auth

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usertoken: {username: string, token: string }

  simulacionPeticionHTTPLoginCorrecto: Observable<boolean>;
  simulacionPeticionHTTPLoginIncorrecto: Observable<boolean>;

  constructor(private http: HttpClient) {
    this.usertoken = {
      username: '',
      token: ''
    };

    this.simulacionPeticionHTTPLoginCorrecto = Observable.create(
      emmitter => {emmitter.next(true); emmitter.complete()}
    ).pipe(delay(1000));

    this.simulacionPeticionHTTPLoginIncorrecto = Observable.create(
      emmitter => {emmitter.next(false); emmitter.complete()}
    ).pipe(delay(1000));


  }

  login(user: {username: string, password: string}): Observable<boolean> {
    //let obs = this.http.post('https://api/login', user);

    if (user.username === 'carlos' && user.password === 'carlos') {

      return this.simulacionPeticionHTTPLoginCorrecto.pipe(
        tap( x => {
          localStorage.setItem('username','carlos');
          localStorage.setItem('token','asdfasdfasdfasdfasdfasdfafsdasdf');
          this.usertoken = {username: 'carlos', 'token': 'asdfasdfasdfasdfasdfasdfafsdasdf'};
        })
      );

    } else {

      return this.simulacionPeticionHTTPLoginIncorrecto;

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
```

[Índice](index.md)
