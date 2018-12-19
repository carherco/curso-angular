# Decorators

Elementos de Angular:

- NgModule
- Component  
- Directive
- Pipe
- Injectable

Comunicación entre componentes:

- Input
- Output
- Attribute

Comunicación entre componente y plantilla:

- ViewChild  
- ViewChildren

Otros:

- ContentChild  
- ContentChildren  
- Host  
- HostBinding
- HostListener  
- Inject  
- Optional  
- Self  
- SkipSelf  

## @attribute

El decorador @attribute devuelve el valor especificado en el host del atributo indicado.

```typescript
export type ButtonType = 'primary' | 'secondary';

@Component({
  selector: 'app-button',
  template: `
    <button [ngClass]="type">
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent {
  @Input() type: ButtonType = 'primary';
}
```

```html
<app-button type="secondary" (click)="click()">Click</app-button>
```

Con @attribute

```typescript
import { Component, Attribute } from '@angular/core';

export type ButtonType = 'primary' | 'secondary';

@Component({
  selector: 'app-button',
  template: `
    <button [ngClass]="type">
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent {

  constructor(@Attribute('type') public type: ButtonType = 'primary') { }

}
```

Si utilizamos @attribute en vez de @Input, Angular evaluará el atributo una única vez y se olvidará de él.

Si utilizamos @Input, en cada detección de cambios Angular evaluará el atributo.

