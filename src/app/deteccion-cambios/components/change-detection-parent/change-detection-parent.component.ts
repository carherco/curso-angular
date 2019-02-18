import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-change-detection-parent',
  templateUrl: './change-detection-parent.component.html',
  styleUrls: ['./change-detection-parent.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeDetectionParentComponent implements OnInit {

  objectp = {name: 'parent'}
  objectc1 = {name: 'child1'}
  objectc2 = {name: 'child2'}
  objectc3 = {name: 'child3'}
  constructor() {
    console.log('parent constructor');
    setTimeout(() => {
      console.log('timeout - parent');
      this.objectp.name = 'parent modified by timeout';
      this.objectc1.name = 'child1 modified by timeout';
      this.objectc2.name = 'child2 modified by timeout';
      this.objectc3 = {...this.objectc3, name: 'child3 modified by timeout'};
    },1000);

    of(true).pipe( delay(3000) ).subscribe(
      x => {
        console.log('observable - parent');
        this.objectp.name = 'parent modified by observable in parent';
        this.objectc1.name = 'child1 modified by observable in parent';
        this.objectc2.name = 'child2 modified by observable in parent';
        this.objectc3 = {...this.objectc3, name: 'child3 modified by observable in parent'};
      }
    );
  }

  onClick() {
    console.log('parent (click)');
    this.objectp.name = 'parent modified by click in parent';
    this.objectc1.name = 'child1 modified by click in parent';
    this.objectc2.name = 'child2 modified by click in parent';
    this.objectc3 = {...this.objectc3, name: 'child3 modified by click in parent'};
  }

  ngOnInit() {
    console.log('parent ngOnInit');
  }

  ngOnChanges() {
    console.log('parent ngOnChanges');
  }

  ngDoCheck() {
    console.log('parent ngDoCheck');
  }

  ngAfterContentInit() {
    console.log('parent ngAfterContentInit');
  }

  ngAfterContentChecked() {
    console.log('parent ngAfterContentChecked');
  }

  ngAfterViewInit() {
    console.log('parent ngAfterViewInit');
  }

  ngAfterViewChecked() {
    console.log('parent ngAfterViewChecked');
  }

  ngOnDestroy() {
    console.log('parent ngOnDestroy');
  }

}



/**
 * Observaciones:
 * - ChangeDetectionStrategy.OnPush solamente en parent
 *   Esperar a que ocurran todos los timeouts y observables
 *            => no ocurre nada
 *            => En la consola vemos que se ejecutan ngDoCheck únicamente del padre. Como
 *               no ha ocurrido ningún evento, ni al padre le ha llegado nada por @Input,
 *               el HTML del padre NO se refresca. Si el HTML del padre no se refresca,
 *               la detección de cambios se detiene.
 *
 * - ChangeDetectionStrategy.OnPush en parent
 *   Esperar a que ocurran todos los timeouts y observables
 *            => no ocurre nada
 *   Hacer click en botón de parent
 *            => Es un evento (una de las 3 excepciones)
 *                      => El html de parent se refresca y se ejecutan los ngDoCheck de todos los hijos.
 *            => Como el html del padre cambia, hay que revisar los hijos, que tienen detección
 *               de cambios por defecto, por lo que se actualizan TODOS los hijos.
 *
 * - ChangeDetectionStrategy.OnPush en parent
 *   Esperar a que ocurran todos los timeouts y observables
 *            => no ocurre nada
 *   Hacer click en botón de child1 => Lo mismo que el anterior
 *
 * - ChangeDetectionStrategy.OnPush en parent
 *   Esperar a que ocurran todos los timeouts y observables
 *            => no ocurre nada
 *   Hacer click en botón de child2 => Lo mismo que el anterior
 *
 * - ChangeDetectionStrategy.OnPush en parent
 *   Esperar a que ocurran todos los timeouts y observables
 *            => no ocurre nada
 *   Hacer click en botón de child3 => Lo mismo que el anterior
 *
 * - ChangeDetectionStrategy.OnPush en parent, child2 y child3
 *   Esperar a que ocurran todos los timeouts y observables
 *            => no ocurre nada
 *            => En la consola vemos que se ejecutan ngDoCheck únicamente del padre. Como
 *               no ha ocurrido ningún evento, ni al padre le ha llegado nada por @Input,
 *               el HTML del padre NO se refresca. Si el HTML del padre no se refresca,
 *               la detección de cambios se detiene.
 *
 * - ChangeDetectionStrategy.OnPush en parent, child2 y child3
 *   Esperar a que ocurran todos los timeouts y observables
 *            => no ocurre nada
 *   Hacer click en botón de parent
 *            => Es un evento (una de las 3 excepciones)
 *                  => El html de parent se refresca y se ejecutan los ngDoCheck de todos los hijos.
 *            => Se actualizan todos los datos excepto child2 porque no se le pasó nueva referencia
 *               y no se refresa su html
 *
 * - ChangeDetectionStrategy.OnPush en parent, child2 y child3
 *   Esperar a que ocurran todos los timeouts y observables
 *            => no ocurre nada
 *   Hacer click en botón de child1 => Lo mismo que el anterior
 *
 * - ChangeDetectionStrategy.OnPush en parent, child2 y child3
 *   Esperar a que ocurran todos los timeouts y observables
 *            => no ocurre nada
 *   Hacer click en botón de child2
 *            => Es un evento (una de las 3 excepciones) => Se ejecutan los ngDoCheck de todos.
 *            => Se actualizan todos los datos. Child2 también pq el evento ocurrión en child2.
 *
 * - ChangeDetectionStrategy.OnPush en parent, child2 y child3
 *   Esperar a que ocurran todos los timeouts y observables
 *            => no ocurre nada
 *   Hacer click en botón de child3
 *            => Es un evento (una de las 3 excepciones) => Se ejecutan los ngDoCheck de todos.
 *            => Child2 no se actualiza, ni ha cambiado su @Input ni ha habido un evento en child2.
 *            => ¡Se actualiza child3 con dato de observable en vez de dato de click!
 *                  => El click modifica el name de child3, pero luego el padre al actualizar el html,
 *                     le vuelve a pasar por @Input una copia del child3 que tiene el padre y se machaca
 *                     la del hijo.
 *   Hacer click otra vez en child3
 *            => Ahora el valor sí es el de child3.
 *
 * - ChangeDetectionStrategy.OnPush en parent, child2 y child3
 *   Esperar a que ocurran todos los timeouts y observables
 *   Hacer click en botón de child2
 *   Hacer click en botón de child3
 *
 * - ChangeDetectionStrategy.OnPush en parent, child2 y child3
 *   Esperar a que ocurran todos los timeouts y observables
 *   Hacer click en botón de child3
 *   Hacer click en botón de child2
 *
 * ¡¡¡El resultado es distinto según el orden en el que apretemos los botones!!!
 *
 * - Poner ChangeDetectorRef.detectChanges() en un timeout o en un observable
 *   constructor(private ref: ChangeDetectorRef)
 */
