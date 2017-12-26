# Built-in structural directives

## ngIf

Añade o elimina un elemento del DOM basándose en una condición.

```html
<div *ngIf="hero" >{{hero.name}}</div>
```

## ngFor

Repite una plantilla por cada elemento de una lista.

```html
<ul>
  <li *ngFor="let hero of heroes">{{hero.name}}</li>
</ul>
```

## NgSwitch

Un conjunto de directivas que permiten cambiar entre vistas alternativas.

```html
<div [ngSwitch]="hero.emotion">
  <happy-hero    *ngSwitchCase="'happy'"    [hero]="hero"></happy-hero>
  <sad-hero      *ngSwitchCase="'sad'"      [hero]="hero"></sad-hero>
  <confused-hero *ngSwitchCase="'confused'" [hero]="hero"></confused-hero>
  <unknown-hero  *ngSwitchDefault           [hero]="hero"></unknown-hero>
</div>
```

CUIDADO: Solamente se puede poner una directiva por elemento.

Existe la etiqueta &lt;ng-container> que no se introduce en el DOM.

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


[Índice](index.md)
