# Paso de datos entre componentes 

## Input binding (del componente padre al hijo)

En esta sección vamos a ver cómo pasar datos de un componente a otro.

Partiendo del último ejemplo de crud básico, vamos a crear un componente que sea el encargado de presentar los detalles de cada héroe.

Esta era la tabla en la template original (crud-basico.component.html):

```html
  <div *ngIf="selectedHero" class="col-md-6">
    <h3>Detalle de {{selectedHero.name}}</h3>
    <div><label>Id: </label>{{selectedHero.id}}</div>
    <div>
      <label>Nombre: </label>
      <input [(ngModel)]="selectedHero.name" placeholder="name"/>
    </div>
  </div>
```

Creamos un nuevo componente:

````
ng g c child-comp
````

En child-comp.component.html nos llevamos es siguiente html:

```html
    <h3>Detalle de {{selectedHero.name}}</h3>
    <div><label>Id: </label>{{selectedHero.id}}</div>
    <div>
      <label>Nombre: </label>
      <input [(ngModel)]="selectedHero.name" placeholder="name"/>
    </div>
```

En crud-basico.component.html cambiamos todo el html anterior por simplemente el selector de child-comp

```html
  <app-child-comp *ngIf="selectedHero" class="col-md-3"></app-child-comp>
```

Para pasar el dato del héroe seleccionado al componente child-comp, ponemos lo siguiente:

```html
  <app-child-comp *ngIf="selectedHero" class="col-md-3" [variable_para_child]="selectedHero" (onChildDeleted)="onDeleted($event)"></app-child-comp>
```

Y en child-comp.component.ts informamos de que tenemos una variable de entrada con el decorador @Input

```typescript
  @Input('variable_para_child')  hero: Hero;
```

Y ya podemos probar el funcionamiento.

## Output binding (del componente hijo al padre)

Vamos a ampliar child-comp con un botón para eliminar el registro

```html
  <h3>Detalle de {{hero.name}}</h3>
  <div><label>Id: </label>{{hero.id}}</div>
  <div>
    <label>Nombre: </label>
    <input [(ngModel)]="hero.name" placeholder="name"/>
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
  @Input('variable_para_child')  hero: Hero;
  @Output() onChildDeleted = new EventEmitter<Hero>();
```

Cuando queramos lanzar el evento desde child-copm, llamaremos al método *emit*

```typescript
  delete() {
    this.onChildDeleted.emit(this.hero);
  }
```

El componente padre puede bindear el evento:

```html
  <app-child-comp *ngIf="selectedHero" class="col-md-3" [variable_para_child]="selectedHero" (onChildDeleted)="onDeleted($event)"></app-child-comp>
```

En *$event* recibirá lo que el child-comp haya metido como parámetro de entrada de la función *emit*

```typescript
  onDeleted(hero: Hero) {
    console.log('El child component quiere eliminar el item ' + hero.id);
  }
```
