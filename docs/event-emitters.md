# EventEmitter

## La clase EventEmitter por dentro

Si echamos un vistazo al código fuente, podemos ver que un EventEmitter no es más que un Subject.

```typescript
export declare class EventEmitter<T> extends Subject<T> {
    __isAsync: boolean;
    constructor(isAsync?: boolean);
    emit(value?: T): void;
    subscribe(generatorOrNext?: any, error?: any, complete?: any): any;
}
```

Al constructor podemos pasarle el modo de funcionamiento (síncrono o asíncrono). Por defecto es síncrono.

## El poder de Rx

Al ser un Subject, podemos aplicar operadores. Por ejemplo, podemos hacer que solamente se emita si tenemos un valor válido

```typescript
export class ReduxUserAddPresenterComponent {

  @Input() user: User;
  @Output() onAdd = new EventEmitter<User>().filter( u => !!u.name);

  constructor() { }

  add() {
    this.onAdd.emit(this.user);
  }

}
```

O utilizar cualquier Subject en vez de EventEmitter

```typescript
export class ReduxUserAddPresenterComponent {

  @Input() user: User;
  @Output() onAdd = new Subject<User>().filter( u => !!u.name);

  constructor() { }

  add() {
    this.onAdd.emit(this.user);
  }

}
```

## EventEmitter vs. DOM Event

Al contrario que los eventos del DOM, los eventos de Angular no tienen la característica de "bubble".  

```typescript
export class TodoComponent {
  @Output() toggle = new EventEmitter<any>();
}

export class TodosComponent {}

export class TodosPageComponent {}
```

Esto funcionaría

```html
<!--todos.component-->
<app-todo [todo]="todo"
          *ngFor="let todo of todos.data"
          (toggle)="toggleTodo($event)">
</app-todo>
```

Pero esto no

```html
<!--todos-page.component-->
<app-todos (toggle)="toggle($event)"></app-todos>
```

### Soluciones

1. Ir pasando el evento hacia arriba

```typescript
export class TodoComponent {
  @Output() toggle = new EventEmitter<any>();
}

export class TodosComponent {
  @Output() toggle = new EventEmitter<any>();
}

export class TodosPageComponent {
  toggle($event) {}
}
```

2. Utilizar un evento nativo del DOM

```typescript
@Component({
  selector: 'app-todo',
  template: `
     <p (click)="toggleTodo(todo)">
      {{todo.title}}
     </p>
   `
})
export class TodoComponent {
  @Input() todo;
  constructor(private el: ElementRef) {}

  toggleTodo(todo) {
    this.el.nativeElement
      .dispatchEvent(new CustomEvent('toggle-todo', {
        detail: todo,
        bubbles: true
      }));
  }
}
```

```html
<app-todos [todos]="todos$ | async"
           (toggle-todo)="toggle($event)"></app-todos>
```

3. Utilizar un servicio

```typescript
@Injectable()
export class TodosService {
  private _toggle = new Subject();
  toggle$ = this._toggle.asObservable();

  toggle(todo) {
    this._toggle.next(todo);
  }
}

export class TodoComponent {
  constructor(private todosService: TodosService) {}
  
  toggle(todo) {
    this.todosService.toggle(todo);
  }
}

export class TodosPageComponent {
  constructor(private todosService: TodosService) {
    todosService.toggle$.subscribe(..);
  }
}
```
