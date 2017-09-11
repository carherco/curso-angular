# Sintaxis de plantillas y data binding

## One way data binding (del componente a la vista)

  - Interpolation
  - Property
  - Attribute
  - Class
  - Style

  ``` html
  <h1>{{expression}}</h1>
  <img src="{{expression}}" />
  <img [src]="expression" />
  <img bind-src="expression" />
  ```

## One way data binding (de la vista al componente)

  - Events

  ``` html
  <button (click)="statement">Hello</button>
  <button on-click="statement">Hello</button>
  ```


## Two way data binding

  ``` html
  <input [(ngModel)]="expression" />
  <input bindon-ngModel="expression" />
  ```


