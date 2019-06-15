# Directivas estructurales personalizadas

ng-temmplate es un elemento que no se renderiza.

El siguiente html 

```html
<p>Hola</p>
<ng-template>
  <p>¿Qué tal?</p>
</ng-template>
<p>Adiós</p>
```

Acaba renderizándose así

```
<p>Hola</p>
<p>Adiós</p>
```

Aunque parezca un elemento inútil, acaba siendo muy útil por ejemplo para crear directivas estructurales.

Este código: 

```html
<div *ngIf="user" class="name">{{user.name}}</div>
```

Realmente es equivalente a este otro

```html
<ng-template [ngIf]="user">
  <div class="name">{{user.name}}</div>
</ng-template>
```

## Creación de una directiva estructural

Vamos a crear una directiva estructural *appUnless que funcione exactamente a la inversa que *ngIf, es decir, que muestre el elemento cuando la condición sea falsa.

El uso sería el siguiente:

<p *appUnless="condition">Show this sentence unless the condition is true.</p>

Lo primero de todo será crear la directiva

```typescript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[appUnless]'})
export class UnlessDirective {
}
```

A simple structural directive like this one creates an embedded view from the Angular-generated <ng-template> and inserts that view in a view container adjacent to the directive's original <p> host element.

```html
<ng-template [appUnless]="condition">
  <p>Show this sentence unless the condition is true.</p>
</ng-template>
```

Con TemplateRef adquirimos el contenido de ng-template.

Con ViewContainerRef accedemos al contenedor de la Vista.

You inject both in the directive constructor as private variables of the class.

```typescript
constructor(
  private templateRef: TemplateRef<any>,
  private viewContainer: ViewContainerRef) { }
```

The directive consumer expects to bind a true/false condition to [appUnless]. That means the directive needs an appUnless property, decorated with @Input

```typescript
@Input() set appUnless(condition: boolean) {
  if (!condition && !this.hasView) {
    this.viewContainer.createEmbeddedView(this.templateRef);
    this.hasView = true;
  } else if (condition && this.hasView) {
    this.viewContainer.clear();
    this.hasView = false;
  }
}
```

Angular sets the appUnless property whenever the value of the condition changes. Because the appUnless property does work, it needs a setter.

If the condition is falsy and the view hasn't been created previously, tell the view container to create the embedded view from the template.

If the condition is truthy and the view is currently displayed, clear the container which also destroys the view.

Nobody reads the appUnless property so it doesn't need a getter.

El código final quedaría

```typescript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * Add the template content to the DOM unless the condition is true.
 */
@Directive({ selector: '[appUnless]'})
export class UnlessDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  @Input() set appUnless(condition: boolean) {
    if (!condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
```


