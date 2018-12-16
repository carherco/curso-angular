# Formularios model-driven (formularios reactivos)

El módulo de formularios reactivos ofrecen facilidad de utilizar patrones, testeo y validaciones directamente desde el componente en lugar de hacerlo desde la plantilla.

Utilizaremos el mismo formulario de partida de antes:

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

El mismo componete de partida,

```typescript
import { Component } from '@angular/core';
import { USERS } from 'app/data/users';
import { User } from 'app/model/TypicodeUser';

@Component({
  selector: 'hero-form',
  templateUrl: './hero-form.component.html'
})
export class ReactiveFormComponent {

  user: User = USERS[0];
}
```

Y esta vez importamos el módulo ReactiveFormsModule de *@angular/forms*.

```typescript
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ...
    ReactiveFormsModule,
    ...
  ],
```

Al contrario de lo que ocurría con los formularios *template-driven*, en esta ocasión prácticamente toda la programación estará en el componente.

## Clases esenciales

Conviene echar un vistazo a las clases que nos proporciona *ReactiveFormsModule*

- **AbstractControl:** Es la clase base abstracta de las otras 3 clases: FormControl, FormGroup, y FormArray.
- **FormControl:** Controla el valor y estado de validez de un control de formulario individual. Se corresponede con un control de formulario HTML como un input o un select.
- **FormGroup:** Controla el valor y validez de un grupo de instancias AbstractControl. Todo formulario es un único FormGroup. Ya dentro de ese FormGroup puede haber cualquier cantidad de FormControl, FormGroup o FormArray
- **FormArray:** Controla el valor y estado de validez de un array de instancias AbstractControl.

## FormGroup básico

```typescript
  export class ReactiveFormComponent {
    userForm: FormGroup;

    constructor(private fb: FormBuilder) {
      this.createForm();
    }

    createForm() {
      this.userForm = this.fb.group({
        name: ['', [Validators.required] ],
        username: ['', [Validators.required] ],
        email: ['', [Validators.email] ],
        street: '',
        city: '',
        zipcode: ''
      });
    }
  }
```

En este ejemplo, el formulario heroForm consta de un FormGroup con 7 FormControls.

Prácticamente lo único que tendremos que hacer en el html es asociar el form con el FormGroup heroForm

```html
  <form [formGroup]="userForm">
```

y cada control HTML con su control correspondiente FormControl.

```html
  <input class="form-control" formControlName="name">
```

## Anindando FormGroup

```typescript
  createForm() {
    this.heroForm = this.fb.group({
      name: ['', Validators.required ],
      username: ['', [Validators.required] ],
      email: ['', [Validators.email] ],
      address: this.fb.group({
        street: '',
        city: '',
        zipcode: ''
      })
    });
```

Y en el html, una pequeña modificación

```html
<h4>Address</h4>
<div formGroupName="address">
```

## AbstractControl

Llegados hasta aquí, merece la pena echar un vistazo a las propiedades y los métodos de la clase AbstractControl: https://angular.io/api/forms/AbstractControl

## FormControl

```typescript
  this.usernameControl = new FormControl('Valor por defecto', Validators.required);

  this.userForm = this.fb.group({
      name: 'Nombre por defecto',
      username: this.usernameControl
  });
```

- setValue()
- patchValue()
- reset()
- registerOnChange()
- registerOnDisabledChange()

## FormGroup

Con el método **get** de FormGroup (en realidad, de AbstractControl) podemos acceder a un control concreto

```typescript
const nameControl = this.userForm.get('name');
```

O en el html

```html
  <p>Name value: {{ userForm.get('name').value }}</p>
  <p>Street value: {{ userForm.get('address.street').value}}</p>
```

Métodos y propiedades específicos de FormGroup:

- controls
- addControl(name: string, control: AbstractControl): void
- removeControl(name: string): void
- setControl(name: string, control: AbstractControl): void
- contains(controlName: string): boolean
- setValue(value: { [key: string]: any; }, options: { onlySelf?: boolean; emitEvent?: boolean; } = {}): void
- patchValue(value: { [key: string]: any; }, options: { onlySelf?: boolean; emitEvent?: boolean; } = {}): void
- reset(value: any = {}, options: { onlySelf?: boolean; emitEvent?: boolean; } = {}): void
- getRawValue(): any

## FormGroup.setValue()

Podemos establecer valores en cualquier momento al formulario completo con setValue. Se pueden asociar los valores de un objeto completo si las propiedades del objeto y del formulario coinciden.

```typescript
  this.heroForm.setValue({
    name:    this.hero.name,
    address: this.hero.addresses[0] || new Address()
  });
```

## FormGroup.reset()

También podemos resetear el formulario

```typescript
  this.heroForm.reset();
```

O un control

```typescript
control.reset('Drew');
control.reset({ value: 'Drew', disabled: true });
```

## FormControl.setValidators()

También tenemos una función para establecer validadores dinámicamente:

```typescript
this.nameController.setValidators([Validators.required, Validators.minLength(5)]);
```

```typescript
this.nameController.setValidators(null);
```

## FormArray

```typescript
this.userForm = this.fb.group({
  name: ['', Validators.required ],
  addresses: this.fb.array([]),
  power: '',
  sidekick: ''
});
```

El array se podrá recorrer mediante la propiedad .controls

```html
<div formArrayName="addresses" class="well well-lg">
  <div *ngFor="let address of addresses.controls; let i=index" [formGroupName]="i" >
    <!-- The repeated address template -->
  </div>
</div>
```

Y se pueden añadir utilizando el método push como en un array normal y corriente.

```html
<button (click)="addAddress()" type="button">Add address</button>
```

```typescript
addAddress() {
  this.userForm.get('addresses').push(this.fb.group(new Address()));
}
```

Métodos y propiedades específicos de FormArray

- controls: AbstractControl[]
- length: number
- at(index: number): AbstractControl
- push(control: AbstractControl): void
- insert(index: number, control: AbstractControl): void
- removeAt(index: number): void
- setControl(index: number, control: AbstractControl): void
- setValue(value: any[], options: { onlySelf?: boolean; emitEvent?: boolean; } = {}): void
- patchValue(value: any[], options: { onlySelf?: boolean; emitEvent?: boolean; } = {}): void
- reset(value: any = [], options: { onlySelf?: boolean; emitEvent?: boolean; } = {}): void
- getRawValue(): any[]

## Validadores

https://angular.io/api/forms/Validators

## Observar cambios en un control

Los formularios reactivos tienen algunas características que funcionan con Observables. Por ejemplo la clase FormControl tiene un método *valueChanges* que devuelve un Observable cada vez que el valor cambia.

```typescript
  nameChangeLog: string[] = [];

  constructor(private fb: FormBuilder) {
    this.createForm();
    this.logNameChange();
  }

  logNameChange() {
    const nameControl = this.userForm.get('name');
    nameControl.valueChanges.subscribe(
      (value: string) => this.nameChangeLog.push(value)
    );
  }
```

## updateOn

El valor por defecto de updateOn es 'change' pero puede tomar uno de estos 3 valores:

- 'change'
- 'blur'
- 'submit'

En un control individual

```typescript
const control = new FormControl('Initial Value', { validators: Validators.required, updateOn: 'blur' });
```

O en un grupo entero o en un array

```typescript
this.formControl = new FormGroup({
    name: ['', { validators: Validators.required }],
    addresses: this.fb.array([]),
  }, { updateOn: 'blur' });
```

```typescript
this.formControl = new FormGroup({
    name: ['', { validators: Validators.required }],
    addresses: this.fb.array([]),
  }, { updateOn: 'submit' });
```
