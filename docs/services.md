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
constructor(private heroService: HeroService) { }
```

