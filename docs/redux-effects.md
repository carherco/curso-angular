# Effects

Redux está muy bien pero nos complica el trabajo cuando realizamos operaciones asíncronas:

- ¿Qué pasa con las llamadas http?
- ¿Cómo modifican el store?
- ¿Cuándo modifican el store?
- ¿Quién modifica el store?

En el reductor no podemos tener acciones asíncronas por lo que necesitamos otro lugar o elemento donde realizarlas. Son los llamados **effects** por el concepto de *efectos secundarios*.

## Instalación

Instalamos la librería de **Effects** con npm: 

> npm install @ngrx/effects --save

Y ya podemos crear efectos con angular cli:

> ng g ef Hero ‐‐root ‐m ../app.module.ts ‐‐spec false

## Adaptación

```ts
export class HeroEffects {

  @Effect() public loadHeroesEffect$ = this.actions$.ofType(HeroActionTypes.LoadHeroes);

  constructor(private actions$: Actions) {}
}
```

### Acciones y State

Cada Action asíncrona (Load) necesitará de una Action síncrona asociada (Loaded). Es buena práctica tener también una Action por si se produce algún error en la Action asíncrona (NotLoaded).

```ts
export enum HeroActionTypes {
  ...
  Load = '[HERO]_Load',
  Loaded = '[HERO]_Load_OK',
  NotLoaded = '[HERO]_Load_ERROR',
  ...
}

export class LoadHeroes implements HeroAction {
  readonly type = '[HERO]_Load';
  constructor(public readonly payload: Hero[]) {}
}

export class LoadHeroesOk implements HeroAction {
  readonly type = '[HERO]_Load_OK';
  constructor(public readonly payload: Hero[]) {}
}

export class LoadHeroesERROR implements HeroAction {
  readonly type = '[HERO]_Load_ERROR';
  constructor(public readonly payload: string) {}
}

export interface HeroState {
  items: Hero[],
  lastId: number,
  error: boolean,
  message: string
}
```

### El Reductor

```ts
export function heroreducer(state = initialHeroState, action: HeroAction): HeroState {
  let newstate = {...state};
  switch (action.type) {
    ...
    case '[HERO]_Load_OK':
      newstate.items = action.payload;
    break;
    case '[HERO]_Load_ERROR':
      newstate.error: true;
      newstate.message: action.payload;
    break;
    ...
  }
  return newstate;
}
```

### Los Effects

Los Effects se configuran en un **servicio**.

A este servicio le inyectamos un **observable de las Actions** de redux (Actions de @ngrx/effects) y los servicios que necesitemos para llevar a cabo la operación asíncrona.

El objetivo es suscribirnos a las Actions para que cuando se produzca la que nos interesa, cambiemos el observable de Action por un observable que realice la operación que nos interese.

Para ello hay que crear una propiedad en el servicio y decorarla con @Effect.

La librería @ngrx/effects se suscribirá a la propiedad decorada con @Effect esperando que el observable emita una acción. Por lo tanto esta propiedad debe ser un observable que emite Objetos de tipo Action.

La técnica es sencilla conceptualmente, pero requiere de un manejo avanzado de operadores de Observables. Manipularemos el observable de las acciones (**actions$**) para que cuando se emita el objeto Action que nos interese (en este ejemplo, '[HERO]_Load') cambiar esa acción por otra que el reducer pueda manejar. 

Si la acción emitida no es la que queremos "manipular" no re-emitimos nada, de esta forma a la librería no lo llegará ninguna emisión.

Si la acción emitida es la que queremos "manipular" la cambiamos con algún operador tipo mergeMap o SwitchMap para emitir la acción que nos convenga (en el ejemplo sería LoadHeroesOk). MergeMap cambia la emisión original por otro observable que es this.heroService.getHeroes() pero al que le aplicamos un map para que transforme el dato emitido que es un Hero[] por una Action LoadHeroesOk en la que el payload son los datos que emite this.heroService.getHeroes(). En caso de que la petición this.heroService.getHeroes() falle, cambiamos (gracias al método of de creación de Observables) la emisión del error por un observable que emite la Action LoadHeroesERROR.

La librería @ngrx/effects hará un dispatch de aquellas Actions que observe al suscribirse a las propiedades decoradas con @Effect.

Con esta técnica, la operación asíncrona se queda en el Effect y al reducer solamente le llegan operaciones aptas para el reducer.

```ts
@Injectable()
export class HeroEffects {
  
  constructor(
    private actions$: Actions,
    private heroService: HeroService
  ) {}

  @Effect()
  public loadHeroesEffect$: Observable<HeroActions> = this.actions$.pipe(
    // tap( x => console.log(x) ),
    ofType('[HERO]_Load'),
    // tap( x => console.log('Efecto') ),
    mergeMap(() =>
      //Aquí es donde se programa la operación asíncrona, en nuestro caso his.heroService.getHeroes()
      this.heroService.getHeroes().pipe(
        map((heroes: Hero[]) => new LoadHeroesOk(heroes)),
        catchError(err => of(new LoadHeroesERROR('Error loading cars')))
      )
    )
  );
}

```

Ejemplo resuelto en el módulo *redux-effects*
