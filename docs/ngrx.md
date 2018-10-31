# NgRx

La librería NgRx nos ayuda a utilizar Redux en nuestro proyecto de Angular.

## Instalación

Para utilizar NgRx, necesitamos isntalar las propias librerías más algunas herramientas de desarrollo que añaden potencia al CLI de Angular.

> npm install @angular-devkit/schematics --save-dev

> npm install @ngrx/schematics --save-dev

> ng config cli.defaultCollection @ngrx/schematics

> npm install @ngrx/store --save

> npm install @ngrx/store-devtools --save

> npm install @ngrx/router-store --save

## Comandos

Ahora con el CLI de Angular podemos hacer más cosas: 

- Generar el store raíz:

> ng g st RootState ‐‐root ‐m app.module.ts ‐‐spec false

- Generar el reductor y las acciones y el interface para una funcionalidad concreta: 

> cd .\src\app\reducers\

> ng g r Hero ‐‐spec false ‐r index.ts 

> ng g a Hero ‐‐spec false

## Adaptación a la librería

### En el módulo

```ts
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store‐devtools';
import { metaReducers, reducers } from './reducers';
@NgModule({
  imports: [
    StoreModule.forRoot(rootReducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ]
})
```

### State

Lo primero que haremos será definir un interfaz para nuestro state. Se suele llamar State pero lo llamaré RootState en este documento.

```ts
export interface RootState {
  router: any;
  global: GlobalState;
  cars: CarsState;
}
```

### reducers

La librería necesita un mapeo entre cada propiedad del state y la función reductora asociada:

```ts
export const rootReducers: ActionReducerMap<RootState> = {
  router: routerReducer,
  global: globalreducer,
  cars: carsReducer
};
```

Las funciones reductoras estarán en un fichero a parte. No deben estar incluidas en ninguna clase.

```ts
export function globalReducer(state = initialState, action: GlobalActions): GlobalState {
  switch (action.type) {
    case GlobalActionTypes.SendUserMessage:
      return { ...state, userMessage: action.payload };
    case GlobalActionTypes.IsLoginNeeded:
      return { ...state, loginNeeded: action.payload };
    case GlobalActionTypes.StoreToken:
      return { ...state, token: action.payload };
    default:
      return state;
  }
}
```

### Actions

```ts
export enum GlobalActionTypes {
  SendUserMessage = '[Global] Show Message',
  IsLoginNeeded = '[Auth] Is Login Needed',
  StoreToken = '[Auth] Store Token'
}
```

```ts
export class SendUserMesage implements Action {
  readonly type = GlobalActionTypes.SendUserMessage;
  constructor(public payload: string) {}
}
```

```ts
export type GlobalActions = SendUserMesage | IsLoginNeeded | StoreToken;
```

### Index y reducers

```ts
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromCar from './car.reducer';
export interface State {
  car: fromCar.State;
}
export const reducers: ActionReducerMap<State> = {
  car: fromCar.reducer
};
export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
```

### Feature

```ts
import { CarActions } from './car.actions';
export interface State {
  speed: number;
}
export const initialState: State = {
  speed: 0
};
export function reducer(state = initialState, action:CarActions ):State {
  switch (action.type) {
    case CarActionTypes.Brake:
      state.speed‐‐;
      return { ...state };
    case CarActionTypes.Throttle:
      state.speed++;
      return { ...state };
    default:
      return state;
    }
  }
}
```

### dispatch y select

```ts
constructor(private store: Store<RootState>) {
  this.store.dispatch(new SendUserMesage('Tutorial Angular en Español'));
}
```

```ts
this.store
  .select('global', 'userMessage')
  .subscribe(userMessage: string => console.log(userMessage));
```

### Acciones

```ts
import { Action } from '@ngrx/store';
export enum CarActionTypes {
  CarAction= '[Car] CarAction'
}
export class CarAction implements Action {
  readonly type = CarActionTypes.CarAction;
}
export type CarActions = CarAction;
```

## Dispatch y select

```ts
export class CarContainerComponent implements OnInit {

  public motor = { speed: 5 };

  constructor(private store: Store<State>) {}

  ngOnInit = () => this.store.select('car').subscribe(value => (this.motor = value));

  onBrake = () => this.store.dispatch(new Brake());

  onThrottle = () => this.store.dispatch(new Throttle());
}
```

### Redux DevTools

http://extension.remotedev.io/

```ts
StoreDevtoolsModule.instrument()
```

## Ejercicio

Realizar el ejercicio anterior utilizando la librería NgRx
