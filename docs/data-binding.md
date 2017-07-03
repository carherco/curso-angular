##Template syntax and data binding

- One way data binding (from component to view)

  - Interpolation
  - Property
  - Attribute
  - Class
  - Style

  ``` [html]

  <h1>{{expression}}</h1>
  <img [src]="expression" />
  <img bind-src="expression" />

  ```


- One way data binding (from view to component)

  - Events

  ``` [html]

  <button (click)="statement">Hello</button>
  <button on-click="statement">Hello</button>

  ```


- Two way data binding

  ``` [html]

  <input [(ngModel)]="expression" />
  <input bindon-ngModel="expression" />

  ```


