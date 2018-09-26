# Servicios

```
ng g s MockHero
```

```
installing service
  create src/app/mock-hero.service.spec.ts
  create src/app/mock-hero.service.ts
  WARNING Service is generated but not provided, it must be provided to be used
```

Angular cli genera 2 ficheros, uno con el servicio, y otro para el testeo del servicio. Además te advierte de que 
el servicio no ha sido provisto. Hay que incluirlo en la sección *providers* del módulo (app.module.ts) para que esté disponible.

```typescript
providers: [
    ...
    MockHeroService,
    ...
  ],
```

Podemos utilizar el modificador --module para indicar el módulo al que pertenece el elemento generado (el servicio en este caso). Utilizando dicho modificador, el cli sí que proveerá el servicio:

```
ng generate service hero --module=app
```

Un servicio es una clase decorada con @Injectable. Gracias a este decorador, Angular lo tendrá en cuenta en la inyección de dependencias. (Veremos la inyección de dependencias más adelante).

Creamos al menos un método en en servicio. En este caso un método que nos devuelve la lista de héroes.

```typescript
import { Injectable } from '@angular/core';
import { Hero } from 'app/hero';
import { HEROES } from 'app/mock-heroes';

@Injectable()
export class MockHeroService {

  constructor() { }

  getHeroes(): Hero[] {
    return HEROES;
  }

}
```

Para utilizar el servicio en un componente hay que importarlo para poder hacer referencia a él

```typescript
import { MockHeroService } from './mock-hero.service';
```

E inyectarlo en el constructor del componente

```typescript
constructor(private heroService: MockHeroService) { }
```


## Provisión de servicios en Angular 6

En Angular 6 exisite una propiedad nueva **providedIn** en los metadatos del decorador @Injectable:

```ts
import { Injectable } from '@angular/core';
import { UserModule } from './user.module';

@Injectable({
  providedIn: UserModule,
})
export class UserService {
}
```

Esta propiedad es una alternativa a incluir el servicio en la propiedad **providers** del módulo deseado:

```ts
import { NgModule } from '@angular/core';

import { UserService } from './user.service';

@NgModule({
  providers: [UserService],
})
export class UserModule {
}
```

Por defecto, angular provee lo servicios en **root** que equivale a estar provisto en el módulo raíz.

```ts
import { Injectable } from '@angular/core';
import { UserModule } from './user.module';

@Injectable({
  providedIn: root,
})
export class UserService {
}
```



## Ejercicio

Programar un servicio de autenticación AuthService con las siguientes especificaciones:

- 3 métodos:
  - logIn(username: string, password: string): boolean
  - logOut(): boolean
  - isLogged(): boolean

El servicio de login dará por válidas las credenciales "test" / "test" y por inválidas el resto de combinaciones de usuario y password. 

Si las credenciales son válidas, se almacenará la información del login y del usuario en el *localstorage*.

Programar además un componente loginComponent, que se mostrará cuando el usuario NO esté logueado y que permita al usuario hacer login.

Programar un componente loggedComponent, que se mostrará cuando el usuario SÍ esté loguedado. Este componente mostrará el username del usuario y un botón para desloguearse.

[Índice](index.md)
