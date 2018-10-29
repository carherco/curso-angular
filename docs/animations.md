# Introducción

Angular animations are based on CSS web transition functionality, so anything that can be styled or transformed in CSS can be animated the same way in Angular. Angular animations allow you to: Set animation timings, styles, keyframes, and transitions. Animate HTML elements in complex sequences and choreographies.


Para tener animaciones hay que importar el módulo **BrowserAnimationsModule**

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  declarations: [ ],
  bootstrap: [ ]
})
export class AppModule { }
```

## Incluir animaciones en un componente

Las animaciones se configuran en la propiedad **animations** de los metadatos del componente.

```ts
@Component({
  selector: 'app-open-close',
  templateUrl: 'open-close.component.html',
  styleUrls: ['open-close.component.css']
  animations: [
    // animation triggers go here
  ]
})
```

## Estados

Las animaciones son transiciones entre **estados**. Para definir un estado, simplemente le ponemos un identificador, y le asociamos los estilos que deseemos. Por ejemplo:

```ts
state('open', style({
  height: '200px',
  opacity: 1,
  backgroundColor: 'yellow'
})),
state('closed', style({
  height: '100px',
  opacity: 0.5,
  backgroundColor: 'green'
})),
```

## Transiciones

Para hacer que el cambio de un elemento entre dos estados sea menos abrupto, podemos definir **transiciones**.

La función *transition()* acepta dos argumentos. El primer argumento es una expresión que define la dirección de la transición entre dos estados. El segundo argumento acepta una función *animate()*.

```ts
transition('open => closed', [
  animate('1s')
]),
transition('closed => open', [
  animate('0.5s')
]),
```

Se puede utilizar el wildcard * al denifir transiciones

```ts
transition('* => closed', [
  animate('1s')
]),
transition('* => open', [
  animate('0.5s')
]),
transition('* => *', [
  animate('1.5s')
]),
```

```ts
transition('open <=> closed', [
  animate('0.5s')
]),
```

También admiten sintaxis de flecha doble para indicar bidireccionalidad.

Las transiciones son 'matcheadas' en el orden en el que se hayan definido.

### El estado void

Se pueden combinar wildcards con estados *void*. Los estdos void indicar transiciones al entrar y al salir de la página.

- La transición * => void aplica cuando el elemento deja la vista.

- La transición void => * aplica cuando el elemento entra en la vista.

- El estado *void* se incluye en el wildcard *

### :enter y :leave

:enter y :leave son alias de void => * y * => void respectivamente

```ts
transition ( ':enter', [ ... ] );  // alias for void => *
transition ( ':leave', [ ... ] );  // alias for * => void
```

### La función animate()

La función *animate()* aceptan el timing y el delay de la animación.

El timing se indica con un string en tres partes:

```ts
animate('duration delay easing')
```

La duración es obligatoria. Las otras opcionales. Si en vez de string con unidad, se indica un número, entonces se consideran milisegundos. Estos tres ejemplos serían equivalentes:

```ts
animate(100)
animate('100ms')
animate('0.1s')
```

El delay tieen la misma sintaxis que la duración. Si se indica delay, ya no se puede indicar la duración como un number.

```ts
animate('0.1s 200ms')
```

El tercer argumento es el denomidado easing, que define la curva de aceleración-desaceleración de la animación

```ts
animate('0.1s 200ms ease-in')
animate('0.1s 200ms ease-out')
animate('0.1s 200ms ease-in-out')
```

## Triggers

An animation requires a trigger, so that it knows when to start. The trigger() function collects the states and transitions, and gives the animation a name, so that you can attach it to the triggering element in the HTML template.

The trigger() function describes the property name to watch for changes. When a change occurs, the trigger initiates the actions included in its definition. These actions can be transitions or other functions, as we'll see later on.

In this example, we'll name the trigger openClose, and attach it to the button element. The trigger describes the open and closed states, and the timings for the two transitions.

Note: Within each trigger() function call, an element can only be in one state at any given time. However, it's possible for multiple triggers to be active at once.

https://easings.net/es

## Cómo utilizar las animaciones

Las animaciones se asocian a elementos de la plantilla con la directiva **@triggerName**.

```html
<div [@triggerName]="state">...</div>;
```

Con esta directiva asociamos un estado al elemento. Si el estado cambia, se dispara la transición correspondiente.

```html
<div [@openClose]="isOpen ? 'open' : 'closed'">
  <p>The box is now {{ isOpen ? 'Open' : 'Closed' }}!</p>
</div>
```

Podemos poner un botón que cambie el valor de *isOpen*.

```html
<div [@openClose]="isOpen ? 'open' : 'closed'">
  <p>The box is now {{ isOpen ? 'Open' : 'Closed' }}!</p>
</div>
<button (click)="toggle()">Toggle</button>
```

```ts
import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-open-close',
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
  templateUrl: 'open-close.component.html',
  styleUrls: ['open-close.component.css']
})
export class OpenCloseComponent {
  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
```

## Animation callbacks

The animation trigger() function emits callbacks when it starts and when it finishes. In the example below we have a component that contains an openClose trigger.

```html
<div [@openClose]="isOpen ? 'open' : 'closed'"
    (@openClose.start)="onAnimationEvent($event)"
    (@openClose.done)="onAnimationEvent($event)"
    class="open-close-container">
</div>
```

## Keyframes

Los Keyframes permiten realiar varios cambios de estilo en la misma transición.

```ts
transition('* => active', [
  animate('2s', keyframes([
    style({ backgroundColor: 'blue' }),
    style({ backgroundColor: 'red' }),
    style({ backgroundColor: 'orange' })
  ]))
])
```

En los keyframes se pueden definir offsets

```ts
transition('* => active', [
  animate('2s', keyframes([
    style({ backgroundColor: 'blue', offset: 0}),
    style({ backgroundColor: 'red', offset: 0.8}),
    style({ backgroundColor: 'orange', offset: 1.0})
  ])),
]),
transition('* => inactive', [
  animate('2s', keyframes([
    style({ backgroundColor: 'orange', offset: 0}),
    style({ backgroundColor: 'red', offset: 0.2}),
    style({ backgroundColor: 'blue', offset: 1.0})
  ]))
]),
```

## Animaciones reutilizables

Para definir una animación reutilizable, se utiliza la función **animation()** y se define la animación en un fichero .ts separado.

```ts
import {
  animation, trigger, animateChild, group,
  transition, animate, style, query
} from '@angular/animations';

export const transAnimation = animation([
  style({
    height: '{{ height }}',
    opacity: '{{ opacity }}',
    backgroundColor: '{{ backgroundColor }}'
  }),
  animate('{{ time }}')
]);
```

Se puede utilizar ahora la animación en cualquier componente con la función useAnimation().

```ts
import { Component } from '@angular/core';
import { useAnimation, transition, trigger, style, animate } from '@angular/animations';
import { transAnimation } from './animations';

@Component({
    trigger('openClose', [
      transition('open => closed', [
        useAnimation(transAnimation, {
          params: {
            height: 0,
            opacity: 1,
            backgroundColor: 'red',
            time: '1s'
          }
        })
      ])
    ])
  ],
})
```

## Animaciones de routing

https://angular.io/guide/route-animations
