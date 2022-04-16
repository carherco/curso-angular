
# Formas de configurar los proveedores de servicios

- Utilizar el nombre de la clase como su propio proveedor

```typescript
providers: [HeroService]
```

Realmente es una abreviatura de:

```typescript
[{ provide: HeroService, useClass: HeroService }]
```

- Utilizar un objeto provider

```typescript
providers: [
  { provide: HeroService, useClass: MockHeroService }
]
```

En la propiedad *provide* se indica el *token* o identificador del proveedor. 

En la propiedad *useClass* se indica la clase que corresponde al servicio. 

- Configurar 2 instancias del mismo servicio:

```typescript
providers: [
  HeroService,
  { provide: OtraInstanciaDeHeroService, useClass: HeroService}
]
```

Con esta configuración podemos inyectar HeroService o OtraInstanciaHeroService y serán dos instancias distintas

- Configurar dos alias para la misma instancia

```typescript
providers: [ 
  HeroService,
  { provide: MismoHeroService, useExisting: HeroService}
]
```

Con esta configuración tanto inyectando HeroService como MismoHeroService tendremos la misma instancia del servicio.

- Utilizar un Factory

A veces necesitamos "ayudar" a Angular a que construya el servicio. El siguiente es un ejemplo de un servicio que necesita una variable booleana para instanciarlo.

```typescript
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

```typescript
providers: [
  { provide: HeroService, useFactory: heroServiceFactory, deps: [Logger, UserService] }
]
```

La propiedad *useFactory* le dice a Angular que el proveedor es una función factoría cuya implementación es heroServiceFactory.

```typescript
let heroServiceFactory = (logger: Logger, userService: UserService) => {
  return new HeroService(logger, userService.user.isAuthorized);
};
```

La propiedad *deps* es un array de tokens de providers. Las clases Logger y UserService sirven de tokens para sus propios proveedores. El inyector resuelve estos tokens e inyecta los servicios correspondientes en los parámetors de la función factoría.

- Inyectar non-class objects

Hay veces que lo que queremos inyectar es un string, una función o un object literal:

```typescript
export const HERO_DI_CONFIG: AppConfig = {
  apiEndpoint: 'api.heroes.com',
  title: 'Dependency Injection'
};
```

Si intentamos hacer esto, falla, porque no se puede utilizar como *token* un interfaz.

```typescript
[
  { provide: AppConfig, useValue: HERO_DI_CONFIG }
]
```

```typescript
constructor(private config: AppConfig){ }
```

Si hemos utilizaro otros frameworks con inyección de dependencias, nos resultará extraño que esto no funcione, ya que los interfaces suelen ser la forma preferida de inyectar los servicios.

Pero Angular no puede hacerlo. Un interface es un elemento de TypeScript que desaparece al compilar a JavaScript. Por lo tanto, en tiempo de ejecución, Angular no tendrá forma de encontrar AppConfig.

La solución pasa por utilizar InyectionToken.

- InyectionToken

```typescript
import { InjectionToken } from '@angular/core';

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
```

```typescript
export const HERO_DI_CONFIG: AppConfig = {
  apiEndpoint: 'api.heroes.com',
  title: 'Dependency Injection'
};
```

```typescript
providers: [
  { provide: APP_CONFIG, useValue: HERO_DI_CONFIG }
]
```

```typescript
constructor(@Inject(APP_CONFIG) config: AppConfig) {
  this.title = config.title;
}
```

# La directiva @Optional

```typescript
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

Los servicios también se pueden proveer en los componentes. 

```typescript
@Component({
/* . . . */
  providers: [UserService]
})
```

Los proveedores de @Component y de @NgModule son independientes uno del otro. Proveer un servicio solamente en un componente limita el scope del servicio únicamente a dicho componente (otros componentes en el mismo módulo no podrán acceder a él).

Por supuesto, varios componentes podrían proveerse el mismo servicio, y obtendrían instancias distintas del mismo.

## Enlaces de interés

- https://angular.io/guide/dependency-injection
- https://dev.to/christiankohler/improved-dependeny-injection-with-the-new-providedin-scopes-any-and-platform-30bb
- https://indepth.dev/posts/1090/angulars-root-and-any-provider-scopes
