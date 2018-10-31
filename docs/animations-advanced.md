# Complex animation sequences

## query

Permite seleccionar elementos (selectores CSS) dentro del elemento animado y aplicarles animaciones individualmente.

## stagger

Esta función permite difinir un gap temporal entre cada animación. De esta forma se produce un delay entre cada animación.

```ts
import { Component, OnInit, HostBinding } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'app-animation-query-stager',
  templateUrl: './animation-query-stager.component.html',
  styleUrls: ['./animation-query-stager.component.css'],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query('p', [
          style({opacity: 0, transform: 'translateX(-100px)'}),
          stagger(-30, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ])
    ]),
  ]
})
export class AnimationQueryStagerComponent {

  @HostBinding('@pageAnimations') public animatePage = true;
}
```

```html
<p>
  Un párrafo
</p>

<p>
  Otro párrafo
</p>

<p>
  Otro párrafo más
</p>

<p>
  Y un cuarto párrafo
</p>

<p>
  El quinto y último párrafo
</p>
```

## group

https://angular.io/guide/complex-animation-sequences

## sequence

A second function called sequence() lets you run those same animations one after the other. Within sequence(), the animation steps consist of either style() or animate() function calls.

- Use style() to apply the provided styling data immediately.
- Use animate() to apply styling data over a given time interval.
