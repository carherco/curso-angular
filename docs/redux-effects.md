# Effects

Redux está muy bien pero nos complica el trabajo cuando realizamos operaciones asíncronas:

- ¿Qué pasa con las llamadas http?
- ¿Cómo modifican el store?
- ¿Cuándo modifican el store?
- ¿Quién modifica el store?

Como el reductor no puede tener efectos secundarios, necesitamos otro
lugar dónde realizarlos. Son los llamados **effects** por el concepto de *efectos secundarios*.


## Instalación

Instalamos la librería de **Effects** con npm: 

> npm install @ngrx/effects ‐‐save

Y ya podemos crear efectos con angular cli:

> ng g ef Car ‐‐root ‐m ../app.module.ts ‐‐spec false



## Adaptación

```ts
export class CarEffects {

  @Effect() public save$ = this.actions$.ofType(CarActionTypes.Save);

  constructor(private actions$: Actions) {}
}
```

### Acciones e interface

```ts
export enum CarActionTypes {
  Brake = '[Car] Brake',
  Throttle = '[Car] Throttle',
  Save = '[Car] Save',
  Saved = '[Car] Saved',
  NotSaved = '[Car] Not Save'
}
export interface CarState {
  speed: number;
  _id?: string; // para identificar en servidor
  message?: string; // para notificar incidencias
}
```



### Reductor

```ts
switch (action.type) {
  case CarActionTypes.Brake:
    state.speed‐‐;
    return { ...state };
  case CarActionTypes.Throttle:
    state.speed++;
    return { ...state };
  case CarActionTypes.Save:
    return state;
  case CarActionTypes.Saved:
    return action.payload;
  case CarActionTypes.NotSaved:
    return { ...state, message: action.payload };
  default:
    return state;
}
```

### Intercambiando observables

```ts
export class CarEffects {

  @Effect() public save$ = this.actions$.ofType(CarActionTypes.Save).pipe(
    mergeMap((action: Save) =>
      this.api.postCar$(action.payload).pipe(
        map(car => new Saved(car)),
        catchError(err => of(new NotSaved(err.message)))
      )
    )
  );
  constructor(private actions$: Actions,private api: ApiService) {}
}
```

