# Introducción

Las animaciones de angular están basadas en la funcionalidad de las transiciones CSS, por lo que cualquier cosa que pueda ser transformado con CSS puede ser animado de la misma manera en Angular.

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
    // ...
  ]
})
```

## Estados

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

Los identificadores de estado pueden ser también booleanos y numéricos.

## Transiciones

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

### :increment y :decrement

Si los estados son numéricos, podemos utilizar :increment y :decrement para hacer referencia a cuando un estado incrementa o decrementa su valor.

### La función animate()

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

https://easings.net/es

## Triggers

Una animación requiere de un disparador (trigger) para que Angular sepa en qué momento empezar la animación. La función **trigger()** recoge los estados y las transiciones, dándole un nombre a la animación para poder asociarla en la plantilla HTML.

```ts
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
```

## Cómo utilizar las animaciones

Las animaciones se asocian a elementos de la plantilla con binding de atributo de la siguiente forma:

```html
<div [@triggerName]="state">...</div>;
```

Por ejemplo:

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

## Animation callbacks

La función trigger() emite callbacks cuando la animación empieza y cuando termina. Podemos por lo tanto hacer binding con dichos eventos y ejecutar el código que queramos.

```html
<div [@openClose]="isOpen ? 'open' : 'closed'"
    (@openClose.start)="onAnimationEvent($event)"
    (@openClose.done)="onAnimationEvent($event)"
    class="open-close-container">
</div>
```

## Keyframes

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

## Animaciones reutilizables

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

## Animaciones de routing

Poner animaciones al routing es fácil. En el componente que aloja al router-outlet, ponemos un trigger y nos aseguramos de alguna forma que su valor cambia en cada navegación.

```ts
<div [@routeAnimations]="outlet.activatedRouteData" >
  <router-outlet #outlet="outlet"></router-outlet>
</div>
```

y en el componente definimos la animación que deseemos. Por ejemplo:

```ts
export const slideInAnimation =
  trigger('routeAnimations', [
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ], { optional: true } ),
      query(':enter', [
        style({ left: '-100%'})
      ], { optional: true } ),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '100%'}))
        ], { optional: true } ),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%'}))
        ], { optional: true })
      ]),
      query(':enter', animateChild(), { optional: true }),
    ]),
  ]);
```

El código anterior realiza lo siguiente:

- Pone el elemento div con position: 'relative' y los elementos entrantes y salientes (el router-outlet) con position: 'absolute', top: 0, left: 0, width: '100%'.

- Posiciona la vista entrante un 100% a la izquierda (left: '-100%') de forma que al comienzo de la animación NO será visible.

- Llama a animateChild() en la vista saliente, para ejecutar las animaciones que tenga dicha vista.

- Utiliza la función group() para que las animaciones tengan lugar en paralelo. Dentro del group():

  - Anima la vista saliente para que se desplace a la derecha hasta que desaparezca por completo ( left: '+100%')

  - Anima la vista entrante para que se desplace desde el -100% al 0.

- Llama a la función animateChild() en la nueva vista para ejecutar sus animaciones cuando el desplazamiento termine.
