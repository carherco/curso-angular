# Paso de datos entre componentes 

## Input binding (del componente padre al hijo)

En esta sección vamos a ver cómo pasar datos de un componente a otro.

Partiendo del último ejemplo de crud básico, vamos a crear un componente que sea el encargado de presentar los detalles de cada usuario.

Esta era la capa que representaba al usuario en la template original (crud-basico.component.html):

```html
  <div *ngIf="selectedUser" class="col-md-6">
    <h3>Detalle de {{selectedUser.name}}</h3>
    <div><label>Id: </label>{{selectedUser.id}}</div>
    <div>
      <label>Nombre: </label>
      <input [(ngModel)]="selectedUser.name" placeholder="name"/>
    </div>
  </div>
```

Creamos un nuevo componente:

````
ng g c child-comp
````

En child-comp.component.html nos llevamos es siguiente html:

```html
    <h3>Detalle de {{selectedUser.name}}</h3>
    <div><label>Id: </label>{{selectedUser.id}}</div>
    <div>
      <label>Nombre: </label>
      <input [(ngModel)]="selectedUser.name" placeholder="name"/>
    </div>
```

En crud-basico.component.html cambiamos todo el html anterior por simplemente el selector de child-comp

```html
  <app-child-comp *ngIf="selectedUser" class="col-md-3"></app-child-comp>
```

Para pasar el dato del usuario seleccionado al componente child-comp, ponemos lo siguiente:

```html
  <app-child-comp *ngIf="selectedUser" class="col-md-3" [variable_para_child]="selectedUser"></app-child-comp>
```

Y en child-comp.component.ts informamos de que tenemos una variable de entrada con el decorador @Input

```typescript
  @Input('variable_para_child')  user: User;
```

Y ya podemos probar el funcionamiento.

## Output binding (del componente hijo al padre)

Vamos a ampliar child-comp con un botón para eliminar el registro

```html
  <h3>Detalle de {{user.name}}</h3>
  <div><label>Id: </label>{{user.id}}</div>
  <div>
    <label>Nombre: </label>
    <input [(ngModel)]="user.name" placeholder="name"/>
  </div>
  <button class="btn btn-danger" (click)="delete()">Eliminar</button>
```

```typescript
  delete() {
    //No tenemos acceso al listado completo para poder eliminar el elemento
  }
```

Pero nos encontramos que no tenemos acceso al listado completo de elemento. Vamos a informar al componente padre de que queremos eliminar el elemento, para que lo haga él. Esto se consigue gracias al decorador @Output que permite emitir eventos.

En child-comp.component.ts declaramos una propiedad decorada con @Output y cuyo valor es una instancia de EventEmitter.

```typescript
  @Input('variable_para_child')  user: User;
  @Output() onChildDeleted = new EventEmitter<User>();
```

Cuando queramos lanzar el evento desde child-copm, llamaremos al método *emit*

```typescript
  delete() {
    this.onChildDeleted.emit(this.user);
  }
```

El componente padre puede bindear el evento:

```html
  <app-child-comp *ngIf="selectedUser" class="col-md-3" [variable_para_child]="selectedUser" (onChildDeleted)="onDeleted($event)"></app-child-comp>
```

En *$event* recibirá lo que el child-comp haya metido como parámetro de entrada de la función *emit*

```typescript
  onDeleted(user: User) {
    console.log('El child component quiere eliminar el item ' + user.id);
  }
```

## Ejercicios

- Separar en otro componente el listado de de usuarios.

- Separar en otro componente el formulario de alta.

[Índice](index.md)
