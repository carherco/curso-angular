# Redux

Redux no hace rápido lo simple, si no mantenible lo complejo.

## Principios de Redux

- Single Source Of Truth
  - Cada pieza de información se almacena en un único lugar (STORE), independientemente de dónde sea creada, modificada o requerida.
- Read Only State
  - La información será de sólo lectura y sólo podrá modificarse a través de conductos oficiales (ACTIONS).
- Changes By Pure Functions
  - Para especificar como el árbol de estado es transformado por las acciones, se utilizan funciones puras* (REDUCERS).
  - Los cambios tienen que poder ser replicados, cancelados y auditados.

Funciones puras:

- Retornan el mismo resultado para la misma entrada.
- No dependen del entorno ni de condiciones azarosas; sólo de sus argumentos.
- Sin efectos colaterales ni modificaciones del valor de sus parámetros u otras variables del entorno.

## Elementos de Redux

- Store
  - Despacha acciones de mutado
  - Mantiene el estado y controla su acceso en modo sólo lectura.

- State
  - Objeto en memoria que contiene la única copia válida de la información.
  - Representa el valor o el estado del store en un momento determinado.

```ts
//reducers/user.store.ts
import { User } from "app/model/User";

export interface UserState {
  items: User[],
  newItem: User,
  selectedItem: User,
  lastId: number
}
```

- Actions
  - Objetos con un tipo predefinido y un potencial argumento llamado payload.
  - Representan todas las posibles mutaciones que pueden afectar al estado del store.

```ts
//reducers/user.actions.ts
import { User } from "app/model/User";

export enum UserActionTypes {
  LoadUsers = '[USER]_Load',
  AddUser = '[USER]_Add',
  DeleteUser = '[USER]_Delete',
}

export interface UserAction {
  readonly type: string;
  readonly payload?: any;
}

export class LoadUsers implements UserAction {
  readonly type = UserActionTypes:LoadUsers;
  constructor(public readonly payload: User[]) {}
}

export class AddUser implements UserAction {
  readonly type = UserActionTypes:AddUser;
  constructor(public readonly payload: User) {}
}

export class DeleteUser implements UserAction {
  readonly type = UserActionTypes:DeleteUser;
  constructor(public readonly payload: User) {}
}

export type UserActions = LoadUsers | AddUser | DeleteUser;
```

- Reducers
  - Son funciones puras*, las únicas que pueden mutar el estado.
  - Reciben el estado actual (STATE) y una acción (ACTION).
  - Clonan el estado, realizan los cambios oportunos y devuelven el estado mutado.

```ts
//reducers/user.reducer.ts
import { UserState } from "./user.store";
import { Userction } from "./user.actions";

export const initialUserState: UserState = {
  items: [],
  newItem: null,
  selectedItem: null,
  lastId: 20
};

export function reducer(state = initialUserState, action: UserAction): UserState {
  let newstate = {...state};
  switch (action.type) {
    case '[USER]_Load':
      newstate.items = action.payload;
    break;
    case '[USER]_Add':
      newstate.items = newstate.items.slice(0); //Una forma de clonar arrays
      newstate.items.push(action.payload);
      newstate.lastId = newstate.lastId +1;
    break;
    case '[USER]_Delete':
      let user = action.payload;
      newstate.items = newstate.items.filter(function(el) { return el.id != user.id; });
    break;
    default:
      return state;
  }
  return newstate;
}
```

- Service
  - La pieza que une todo el puzzle.
  - Almacena el state, pero solamente lo modificará a través del reducer.
  - Ofrecerá a los componentes (o a otros servicios) un observable del estado.
  - Ofrece un método dispatch, única forma de modificar el state.
  - Solamente se modificará el state si se invoca el método dispatch con una de las actions oficiales.

```ts
import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { UserState } from '../reducers/user.store';
import { initialUserState, reducer } from '../reducers/user.reducer';
import { UserAction } from '../reducers/user.actions';

@Injectable({
  providedIn: 'root'
})
export class ReduxUserStateService {

    private state: UserState = initialUserState;
    private state$ = new BehaviorSubject<any>(this.state);

    constructor() {}

    public dispatch = (action: UserAction) => {
      this.state = reducer(this.state, action);
      this.state$.next(this.getSnapshot());
    };

    public getSnapshot = () => {
      return { ...this.state };
    };

    public select$ = () => this.state$.asObservable();
}
```

Ejemplo resuelto en el módulo *redux*.
