# Inyección de dependencias

La inyección de dependencias es un patrón de diseño orientado a objetos, en el que se suministran objetos a una clase en lugar de ser la propia clase la que cree el objeto. También se conoce como IoC (Inversion of Control).

Veamoslo en un ejemplo. Pongamos que tenemos una clase HeroService que para instanciarla necesita recibir en el constructor un objeto Http.

```typescript
export class HeroService {
  constructor (private http: Http) {}
}
```

Http es una clase que para instanciarla necesita 2 objetos.

```typescript
export declare class Http {
    protected _backend: ConnectionBackend;
    protected _defaultOptions: RequestOptions;
    constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions);
```

## Método tradicional

Sin el patrón de inyección de dependencias, si quiero una instancia de HeroService tengo que hacer lo siguiente:

```typescript
export class CrudBasicoComponent implements OnInit {

  private heroService;

  constructor() {
      backend = new ConnectionBackend();
      options = new RequestOptions();
      http = new Http(backend, options);
      this.heroService = new HeroService(http);
      
  }
```

Problemas de esto:
- Hacen falta demasiadas líneas de programación simplemente para instanciar un único objeto. 
- Hace falta conocimiento de las clases y de los constructores para poder instanciarlas todas.
- Si modifico el constructor de HeroService (para añadir otro parámetro, o para cambiarlo por otro...) tengo que revisar TODA la aplicación para cambiar todos los new HeroService() que tenga.

## Con inyección de dependencias

Si se utiliza el patrón de inyección de dependencias, es el *sistema* el que se encarga de suministrar los objetos correspondientes a cada clase.

Simplemente tipando en el constructor el tipo de cada variable, Angular se encargará de instanciar todas clases que sean necesarias

```typescript
export class CrudBasicoComponent implements OnInit {

  private heroService;

  constructor(heroService: HeroService) {
      this.heroService = heroService;
  }
```

O con la forma abreviada

```typescript
export class CrudBasicoComponent implements OnInit {

  constructor(private heroService: HeroService) {
  }
```

Con este patrón, desparecen todos los problemas mencionados anteriormente.


[Índice](index.md)


# Formas de configurar los proveedores de servicios

- Utilizar el nombre de la clase como su propio proveedor

```
providers: [HeroService]
```

Realmente es una abreviatura de:

```
[{ provide: HeroService, useClass: HeroService }]
```


- Utilizar un objeto provider

```
providers: [
  { provide: HeroService, useClass: MockHeroService }
]
```

- Configurar 2 instancias del mismo servicio:

```
providers: [ 
  HeroService,
  { provide: OtraInstanciaDeHeroService, useClass: HeroService}
]
```

Con esta configuración podemos inyectar HeroService o OtraInstanciaHeroService y serán dos instancias distintas

- Configurar dos alias para la misma instancia

providers: [ 
  HeroService,
  { provide: MismoHeroService, useExisting: HeroService}
]

Con esta configuración tanto inyectando HeroService como MismoHeroService tendremos la misma instancia del servicio.

- Utilizar un Factory

A veces necesitamos "ayudar" a Angular a que construya el servicio. 

```
export class HeroService {
  constructor(
    private logger: Logger,
    private isAuthorized: boolean) { }

  getHeroes() {
    return HEROES.filter(hero => this.isAuthorized || !hero.isSecret);
  }
}
```

Podemos utilizar Factorías para eso:

```
providers: [ 
  { provide: HeroService, useFactory: heroServiceFactory, deps: [Logger, UserService] }
]
```

La propiedad useFactory le dice a Angular que el proveedor en una función factoría cuya implementación es heroServiceFactory.

```
let heroServiceFactory = (logger: Logger, userService: UserService) => {
  return new HeroService(logger, userService.user.isAuthorized);
};
```

La propiedad *deps* es un array de tokens de providers. Las clases Logger y UserService sirven de tokens para sus propios proveedores. El inyector resuelve estos tokens e inyecta los servicios correspondientes en los parámetors de la función factoría.

- Inyectar non-class objects

Hay veces que lo que queremos inyectar es un string, una función o un object literal:

```
export const HERO_DI_CONFIG: AppConfig = {
  apiEndpoint: 'api.heroes.com',
  title: 'Dependency Injection'
};
```

Si intentamos hacer esto, falla, porque no se puede utilizar como *token* un interfaz.

```
[
  { provide: AppConfig, useValue: HERO_DI_CONFIG }
]
```

```
constructor(private config: AppConfig){ }
```

Si hemos utilizaro otros frameworks con inyección de dependencias, nos resultará extraño que esto no funcione, ya que los interfaces suelen ser la forma preferida de inyectar los servicios.

Pero Angular no puede hacerlo. Un interface es un elemento de TypeScript que desaparece al compilar a JavaScript. Por lo tanto, en tiempo de ejecución, Angular no tendrá forma de encontrar AppConfig.

La solución pasa por utilizar InyectionToken.

- InyectionToken

```
import { InjectionToken } from '@angular/core';

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
```

```
constructor(@Inject(APP_CONFIG) config: AppConfig) {
  this.title = config.title;
}
```

- La directiva @Optional

````
import { Optional } from '@angular/core';

export class HeroService {
  constructor(@Optional() private logger: Logger) {
    if (this.logger) {
      this.logger.log(some_message);
    }
  }
}
```

# Proveer servicios en componentes

```
Los servicios también se pueden proveer en los componentes. 

```
@Component({
/* . . . */
  providers: [UserService]
})
```

Los proveedores de @Component y de @NgModule son independientes uno del otro. Proveer un servicio solamente en un componente limita el scope del servicio únicamente a dicho componente (otros componentes en el mismo módulo no podrán acceder a él).

Por supuesto, varios componentes podrían proveerse el mismo servicio, y obtendrían instancias distintas del mismo.


https://angular.io/guide/dependency-injection