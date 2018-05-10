# Sintaxis de plantillas y data binding

El componente se "comunica" con su plantilla a través de lo que se denomina *data-binding*.

Desde la plantilla se puede acceder a cualquier propiedad pública del componente. (Recordemos que por defecto las propiedades de una clase son públicas)

## One way data binding (del componente a la template)

Se utiliza para:
  - Interpolación
  - Propiedades
  - Atributos
  - Clases
  - Estilos

  ``` html
    <h1>{{expression}}</h1>
    <img src="{{expression}}" />
    <img [src]="expression" />
    <img bind-src="expression" />
  ```

Las expresiones pueden ser una variable a secas, una operación, una llamada a una función...

La interpolación se indica con {{}}: 

  ``` html
    <div>El resultado de {{varA}} + {{varB}} es {{varA + varB}}</div>
    <div>El resultado de {{varA}} + {{varB}} es {{suma1(varA,varB)}}</div>
    <div>La persona se llama {{persona.nombre}}</div>
  ```

El binding en propiedades, atributos, clases, estilos... se realiza con [] o con el prefijo bind-:

  ``` html
    <!-- Atributo (HTML) -->
    <option [selected]="isCarSelected" value="BMW">BMW</option>
    <div [class]="miClase">Elemento con una clase dinámica</div>

    <!-- Propiedad (DOM) -->
    <div [hidden]="isHidden">Este elemento puede estar o no estar</div>

    <!-- Clase -->
    <div [class.special]="isSpecial">Special</div>

    <!-- Estilos -->
    <p [style.color]=”miColor”>Párrafo de color dinámico</p>
  ```

NOTA: Atributos vs. Propiedades: https://angular.io/guide/template-syntax#html-attribute-vs-dom-property

Las expresiones que tienen *efectos colaterales* están prohibidas como expresiones en las plantillas de angular: 

- asignaciones (=, +=, -=, ...)
- new
- encadenar expresiones con ; or ,
- operadores de incremento o decremento (++ y --)

Tampoco son válidos en expresiones de plantilla de angular los operadores | y &.

Por otro lado, angular tiene algunos operadores que no existen en JavaScript/TypeScript: |, ?, y !.


## One way data binding (de la template al componente)

Se utiliza para:
  - Eventos

  ``` html
    <button (click)="statement">Hello</button>
    <button on-click="statement">Hello</button>
  ```
Un statement puede ser una llamada a una función, una asignación...

  ``` html
    <button (click)="enviar()">Hello</button>
    <button (click)="resultado = var1 + var2; mostrarResultado();">Hello</button>
  ```

En el contexto del evento, se crea una variable $event con información del mismo.

  ``` html
    <input (keyUp)="onKeyUp($event)">
  ```

## Two way data binding

Se utiliza en formularios template-driven

  ``` html
    <input [(ngModel)]="variable" />
    <input bindon-ngModel="variable" />
  ```

Nota: Para utilizar *ngModel* necesitamos importar FormsModule.

[()] es una "abreviatura" de: 

  ``` html
    <input [ngModel]="variable" (ngModel)="variable=$event"/>
  ```

```typescript
//src/app/app.moudle.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
...

@NgModule({

  declarations: [
    AppComponent,
    ...
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ...
  ],
  providers: [
    ...
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


Ejemplos: 
 - click-me
 - calculadora
 - incluir &lt;app-calculadora&gt; varias veces


https://blog.angular-university.io/how-does-angular-2-change-detection-really-work/

[Índice](index.md)



