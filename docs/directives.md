# Directivas

Las templates de angular son dinámicas; cuando angular las renderiza
se modifica el DOM de acuerdo a las instrucciones dadas en ellas. Una directiva es una clase decorada con @Directive.

Existen 3 tipos de directivas en angular:

- Directivas de componente.
- Directivas estructurales.
- Directivas de atributo.

## Directivas de componente.

Los componentes de angular son directivas especializadas que usan el decorador @Component, el cual
deriva del decorador @Directive. Los componentes tienen asociados una template y una hoja de estilos.
Las directivas de componente permiten incluir un componente en el HTML (plantilla) de otro componente. Podemos decir que un componente es una directiva con un template.

```html
<div>
    <app-calculadora></app-calculadora>
</div>
```

## Directivas estructurales

Las directivas estructurales alteran la estructura del DOM, añadiendo,
eliminando o manipulando elementos del DOM. Son fáciles de reconocer, un
asterisco (\*) precede el nombre de atributo de la directiva.

Es importante tener en cuenta que a un elemento solo se puede aplicar una directiva estructural.

### ngIf

Añade o elimina un elemento del DOM basándose en una condición.

```html
<div *ngIf="hero" class="name">{{hero.name}}</div>
```

### ngFor

Repite una plantilla por cada elemento de una lista.

```html
<ul>
  <li *ngFor="let hero of heroes">{{hero.name}}</li>
</ul>
```

Dentro del \*ngFor existen 5 variables locales:

- index: number: El índice del elemento actual.
- first: boolean: True cuando el item actual es el primero.
- last: boolean: True cuando el item actual es el último.
- even: boolean: True cuando el índice del item actual es par.
- odd: boolean: True cuando el índice del item actual es impar.

Forma de uso:

```html
<div *ngFor="let hero of heroes; let i=index; let odd=odd" [class.odd]="odd">
  ({{i}}) {{hero.name}}
</div>
```

Además existe la posibilidad de "cachear" elementos del array con trackBy.

```html
<div *ngFor="let hero of heroes; let i=index; let odd=odd; trackBy: trackById" [class.odd]="odd">
  ({{i}}) {{hero.name}}
</div>
```

### NgSwitch

Un conjunto de directivas que permiten cambiar entre vistas alternativas.

```html
<div [ngSwitch]="componente">
    <app-texto *ngSwitchCase="'texto'" ></app-texto>
    <app-imagen *ngSwitchCase="'imagen'"></app-imagen>
    <app-tree *ngSwitchCase="'tree'"></app-tree>
</div>  
```

CUIDADO: Solamente se puede poner una directiva por elemento.

Existe la etiqueta &lt;ng-container> que no se introduce en el DOM y que puede resultar útil cuando
deseamos aplicar más de una directiva estructural sobre un mismo elemento como en el siguiente 
ejemplo.

```html
<div>
  Elige a tu héroe favorito
  (<label><input type="checkbox" checked (change)="showSad = !showSad">ocultar héroes tristes</label>).
</div>
<select [(ngModel)]="hero">
  <ng-container *ngFor="let h of heroes">
    <ng-container *ngIf="showSad || h.emotion !== 'sad'">
      <option [ngValue]="h">{{h.name}} ({{h.emotion}})</option>
    </ng-container>
  </ng-container>
</select>
```

### Ng-Template

Esta notación de las directivas estructurales consistente en usar el asterisco es distinta a lo que
hasta ahora hemos visto sobre el data binding de Angular. En realidad se trata de un "sintactic sugar"
que simplifica la sintaxis real de la directiva estructural. Internamente Angular convierte la expresión
anterior en algo más complejo que tiene esta pinta:

```html
<ng-template [ngIf]="hero">
  <div class="name">{{hero.name}}</div>
</ng-template>
```

Es decir usa un elemento `ng-template`. Cada directiva estructural hace algo diferente con el
código contenido en este `ng-template`.

### Directivas estructurales personalizadas

Ver [ejercicio 2](ejercicio_2.md)

## Directivas de atributo

Cambian el aspecto o el comportamiento de un elemento, componente u otra directiva.

Las directivas de atributo se usan como si fueran atributos de los elementos HTML.

Se pueden aplicar varias directivas de atributo a un mismo elemento.

Ejemplos de directivas de atributo de angular:

- NgClass
- NgModel
- NgForm

Ejemplo:

```html
<div [class.my-class1]="step==1" [class.my-class2]="step==2"></div>
<div [ngClass]="{'my-class1': step==1,'my-class2': step==2}"></div>
<div [ngClass]="{1:'my-class1',2:'my-class2',3:'my-class3'}[step]"></div>
<div [ngClass]="(step==1)?'my-class1':'my-class2'"></div>
```

Iremos viendo muchas directivas de atributo durante el curso.

### Directivas de atributo personalizadas

Construir una directiva de atributo es muy sencillo. Basta con crear una clase
decorada con @Directive donde se especificará el selector que identifica a la
directiva. Dicha clase definirá el comportamiento de la directiva.

```typescript
import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[appHighlight]"
})
export class HighlightDirective {
  constructor(el: ElementRef) {}
}
```

No hay que olvidarse de declarar la directiva en el _declarations_ del módulo.

En vez de crearla a mano, podemos generarla con el CLI de Angular:

> ng generate directive highlight

Cuando se haga uso de esta directiva, el framework angular construirá la clase
asociada y le pasará al constructor un objeto _ElementRef_ que es el elemento sobre el que se está aplicando la directiva.

Es decir, para el ejemplo anterior, cuando angular encuentre _appHighlight_ en un HTML, aplicará la directiva definida en la clase _HighlightDirective_.

Ejemplo:

```html
<p appHighlight>Highlight me!</p>
```

```typescript
import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[appHighlight]"
})
export class HighlightDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = "yellow";
  }
}
```

Esto hace que el elemento sobre el que se aplica la directiva tenga color de fondo amarillo.

#### El decorador @HostListener

El decorador @HostListener permite que la directiva responda a eventos que ocurran en el elemento:

```typescript
import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "[appHighlight]"
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}

  @HostListener("mouseenter")
  onMouseEnter() {
    this.highlight("yellow");
  }

  @HostListener("mouseleave")
  onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

#### El decorador @Input

El decorador @Input permite pasar variables a la directiva.

Hagamos un ejemplo en el que al aplicar la directiva _appHighlight_ a un elemento, tengamos la posibilidad de elegir el color

```html
<p appHighlight [highlightColor]="color">Texto del párrafo</p>
```

```typescript
import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[appHighlight]"
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}

  @Input() highlightColor: string;

  @HostListener("mouseenter")
  onMouseEnter() {
    this.highlight(this.highlightColor || "red");
  }

  @HostListener("mouseleave")
  onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

Se puede abreviar la directiva si se utiliza el alias de @Input.

```html
<p [appHighlight]="color">Texto del párrafo</p>
```

```typescript
import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[appHighlight]"
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}

  @Input("appHighlight") highlightColor: string;

  @HostListener("mouseenter")
  onMouseEnter() {
    this.highlight(this.highlightColor || "red");
  }

  @HostListener("mouseleave")
  onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

[Índice](index.md)
