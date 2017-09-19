# Template reference variables

## La variable $event

Recordemos que a cualquier evento que bindeamos le podemos pasar la variable $event, que contiene información específica del evento concreto.

```html
<input (keyup)="onKey($event)">
<p>{{values}}</p>
```

```typescript
export class KeyUpComponent_v1 {
  values = '';

  onKey(event: any) {
    this.values += event.target.value + ' | ';
  }
}
```

```typescript
export class KeyUpComponent_v2 {
  values = '';

  onKey(event: any) {
    this.values += event.key + ' | ';
  }
}
```

Pero pasar $event no es muy buena práctica porque hace que el componente tenga que conocer los detalles de la plantilla.

Una solución sería pasar $event.key al método. Otra solución son las *template reference variables*.


## Template reference variables

Para declarar una *template reference variable*, se utiliza la almohadilla seguida del identificador.

```html
<input #box (keyup)="0">
<p>{{box.value}}</p>
```

La plantilla está completamente autocontenida. No necesita de la intervención del componente.

Tiene una pega. No funciona si no se hace binding de un evento. Hacer binding con el valor 0, no hace nada útil, pero satisface el requerimiento de angular.

Si el componente necesita recibir la tecla, basta con pasarle box.value. El componente recibe directamente el valor, sin necesidad tener conocimiento de $event ni de la estructura.

```typescript
@Component({
  selector: 'key-up3',
  template: `
    <input #box (keyup)="onKey(box.value)">
    <p>{{values}}</p>
  `
})
export class KeyUpComponent_v3 {
  values = '';
  onKey(value: string) {
    this.values += value + ' | ';
  }
}
```

Existe un *pseudo evento* en angular *keyup.enter* que ocurre únicamente si el usuairo pulsa enter.

```typescript
@Component({
  selector: 'key-up4',
  template: `
    <input #box (keyup.enter)="onEnter(box.value)">
    <p>{{value}}</p>
  `
})
export class KeyUpComponent_v4 {
  value = '';
  onEnter(value: string) { this.value = value; }
}
```

Pero el usuario puede salir del input pulsando tabulador, o clickando con el ratón en el siguiente input...

```typescript
@Component({
  selector: 'key-up5',
  template: `
    <input #box
      (keyup.enter)="update(box.value)"
      (blur)="update(box.value)">

    <p>{{value}}</p>
  `
})
export class KeyUpComponent_v5 {
  value = '';
  update(value: string) { this.value = value; }
}
```

### Ejercicio

Utilizando *Template reference variables*, realizar un listado de Héroes y una caja de texto para añadir héroes con un botón de añadir.

Los héroes se añadirán al hacer click en el botón, al pulsar la tecla enter o cuando se haga click fuera de la caja.

Un héroe será en este caso únicamente un string, en vez de un objeto.

Si la caja está vacía, no se añadirá ningún héroe al listado.

El código del componente de partida es el siguiente:

```typescript
@Component({
  selector: 'app-ejercicio-key-up',
  template: `
    <input>
    <button>Añadir</button>

    <ul><li *ngFor="let hero of heroes">{{hero}}</li></ul>
  `
})
export class EjercicioKeyUp {
  heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
  
}
```

### Solución al ejercicio

```typescript
@Component({
  selector: 'little-tour',
  template: `
    <input #newHero
      (keyup.enter)="addHero(newHero.value)"
      (blur)="addHero(newHero.value); newHero.value='' ">

    <button (click)="addHero(newHero.value)">Añadir</button>

    <ul><li *ngFor="let hero of heroes">{{hero}}</li></ul>
  `
})
export class EjercicioKeyUp {
  heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
  addHero(newHero: string) {
    if (newHero) {
      this.heroes.push(newHero);
    }
  }
}
```


