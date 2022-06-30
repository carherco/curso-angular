# Formularios Template-driven

Es posible construir casi cualquier formulario con plantillas de Angular. Se pueden colocar los elementos con libertad y creatividad, hacer binding de los controles con los datos, especificar reglas de validación y mostrar errores de validación, habilitar y deshabilitar controles según condiciones...

Vamos a utilizar las potencia de los formularios de Angular al siguiente ejemplo: 

```html
<div>
  <h1>User Form</h1>
  <form>
    <div>
      <label for="name">Name: </label>
      <input type="text" id="name" name="name" required>
    </div>

    <div>
      <label for="username">Username: </label>
      <input type="text" id="username" name="username" required>
    </div>

    <div>
      <label for="email">Email: </label>
      <input type="email" id="email" name="email">
    </div>

    <h4>Address</h4>
    <div>
      <div>
        <label for="street">Street:
          <input type="text" id="street" name="street">
        </label>
      </div>
      <div>
        <label for="city">City:
          <input type="text" id="city" name="city">
        </label>
      </div>
      <div>
        <label for="zipcode">Zip Code:
          <input type="text" id="zipcode" name="zipcode">
        </label>
      </div>
    </div>

    <button type="submit">Submit</button>

  </form>
</div>
```

```typescript
import { Component } from '@angular/core';
import { USERS } from 'app/data/users';
import { User } from 'app/model/TypicodeUser';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  user: User = USERS[0];
  constructor() { }
}
```

Existe un módulo en el *@angular/forms* llamado *FormsModule* que nos da acceso a los tipos *ngForm* y *ngModel* para tipar variables y a la directiva *ngModel* que ya hemos utilizado alguna vez para realizar el doble binding.

```typescript
  imports: [
    ...
    FormsModule,
    ...
  ],
```

## Two way data binding con ngModel

No vemos los datos del héroe en el formulario porque no hemos hecho binding todavía con el héroe.

Utilizamos *ngModel* para asociar cada control del formulario a una propiedad del héroe. Recordemos que para utilizar *ngModel* es necesario declarar el atributo *name*.

También interpolaremos el objeto user en la plantilla para comprobar que efectivamente se realiza el binding.

```html
<div>
  <h1>User Form</h1>
  {{ user | json }}
  <form>
    <div>
      <label for="name">Name: </label>
      <input type="text" id="name" name="name" required [(ngModel)]="user.name">
    </div>

    <div>
      <label for="username">Username: </label>
      <input type="text" id="username" name="username" required [(ngModel)]="user.username">
    </div>

    <div>
      <label for="email">Email: </label>
      <input type="email" id="email" name="email" [(ngModel)]="user.email">
    </div>

    <h4>Address</h4>
    <div>
      <div>
        <label for="street">Street:
          <input type="text" id="street" name="street" [(ngModel)]="user.address!.street">
        </label>
      </div>
      <div>
        <label for="city">City:
          <input type="text" id="city" name="city" [(ngModel)]="user.address!.city">
        </label>
      </div>
      <div>
        <label for="zipcode">Zip Code:
          <input type="text" id="zipcode" name="zipcode" [(ngModel)]="user.address!.zipcode">
        </label>
      </div>
    </div>

    <button type="submit">Submit</button>

  </form>
</div>
```

## Marcar visualmente el estado de los controles

Utilizar ngModel en un formulario proporciona mucho más que tan solo two-way data binding. También informa de si el usuario ha tocado el control, si el valor ha cambiado o si el valor es válido o no.

La directiva ngModel actualiza el control con clases CSS especiales de Angular que reflejan el estado del control. Esas clases se pueden utilizar para cambiar la apariencia del control.

![Clases ngModel](img/ngModel_clases.png "Clases ngModel")

Vamos a añadir una template reference variable llamada spy al input del nombre para ver las clases css asociadas en cada momento.

```html
  <div>
    <label for="name">Name</label>
    <input type="text" id="name" required [(ngModel)]="user.name" name="name" #spy>
    <br>{{spy.className}}
  </div>
```

Gracias a estas clases podemos marcar visualmente mediante css el estado de los controles.

```css
  .ng-valid[required], .ng-valid.required  {
    border-left: 5px solid #42A948; /* green */
  }

  .ng-invalid:not(form)  {
    border-left: 5px solid #a94442; /* red */
  }
```

Hay una séptima clase, **.ng-pending** que se pone cuando el control ha cambiado mientras se está validando.

## Mostrar y ocultar mensajes de errores de validación

Vamos a poner otro template reference variable al control del nombre pero "tipándolo al tipo ngModel". La documentación llama a esto: "Exportar ngModel a la variable name".

```html
  <div>
    <label for="name">Name</label>
    <input type="text" id="name" required [(ngModel)]="user.name" name="name" #spy #name="ngModel">
    <br>{{spy.className}}
  </div>
```

También añadiremos un mensaje de error, que aparecera cuando el nombre esté vacío.

```html
  <div>
    <label for="name">Name</label>
    <input type="text" id="name" required [(ngModel)]="user.name" name="name" #spy #name="ngModel">
    <br>{{spy.className}}
  </div>
  <div [hidden]="name.valid || name.pristine" class="alert alert-danger">
    Name is required
  </div>
```

## Validadores

Los validadores existentes en Angular son los siguientes: https://angular.io/api/forms/Validators

También se pueden crear validadores personalizados. (Se verán más adelante.)

```html
<input id="name" name="name" required minlength="4" appForbiddenName="bob"
      [(ngModel)]="user.name" #name="ngModel" >

<div *ngIf="name.invalid && (name.dirty || name.touched)" class="alert alert-danger">

  <div *ngIf="name.errors.required">
    Name is required.
  </div>
  <div *ngIf="name.errors.minlength">
    Name must be at least 4 characters long.
  </div>
  <div *ngIf="name.errors.forbiddenName">
    Name cannot be Bob.
  </div>

</div>
```

A través de la propiedad **errors** podemos averiguar si un control tiene o no un error concreto

## Hacer submit del formulario con el evento onSubmit

```html
  <form (ngSubmit)="onSubmit()">
  ...
  <button type="submit">Submit</button>
```

```typescript
  onSubmit() {
    //Hacer lo que sea
    //Luego limpiar el formulario
    this.user.name = '';
    this.user.username = '';
    this.user.email = '';
    this.user.address = new Address();
  }
```

## Desactivar el botón de submit hasta que el formulario sea válido

Vamos a poner otro template reference variable al formulario, ahora de tipo ngForm

```html
  <form (ngSubmit)="onSubmit()" #userForm="ngForm">
```

Un objeto ngForm tiene una propiedad *form* que es a su vez otro objeto. Este último objeto tiene una 
propiedad booleana *valid* que indica si el formulario es válido o no.

Así pues, podemos desactivar el botón de submit y no activarlo hasta que el formulario sea válido.

```html
  <form (ngSubmit)="onSubmit()" #userForm="ngForm">
  ...
  <button type="submit" [disabled]="!userForm.valid">Submit</button>
```

## Limpiar el formulario

El objeto ngForm tiene también un método *reset()* que limpia completamente el formulario.

```html
  <form (ngSubmit)="onSubmit(); userForm.reset()" #userForm="ngForm">
```

De esta forma, el componente no necesita ocuparse de esa tarea

```typescript
  onSubmit() {
    //Hacer lo que sea
  }
```

## Mostrar mensaje cuando se envíe el formulario

Ya no fomra parte de los formularios, pero es muy típico mostrar un mensaje al enviar el formulario.

```html
<div [hidden]="!userForm.submitted">
  <h2>¡Gracias!</h2>
</div>
```

[Índice](index.md)
