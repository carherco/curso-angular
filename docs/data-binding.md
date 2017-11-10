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

## One way data binding (de la template al componente)

Se utiliza para:
  - Eventos

  ``` html
    <button (click)="statement">Hello</button>
    <button on-click="statement">Hello</button>
  ```


## Two way data binding

Se utiliza en formularios template-driven

  ``` html
    <input [(ngModel)]="expression" />
    <input bindon-ngModel="expression" />
  ```


