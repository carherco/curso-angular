# Ejercicio 2

En este ejercicio crearemos algunas directivas y pipes obre el proyecto del ejercicio 1

## 1. Directiva de atributo

Crearemos una directiva de atributo mediante la cual podamos rotar un elemento un ángulo
especificado en la propia directiva.

1. Crea una nueva directiva con `ng generate directive` que se llame `rotar`. Comprueba que
   se ha añadido a la sección `declarations` del módulo `AppModule`, y que el selector es
   `[appRotar]`.

2. Inyecta a través del constructor una referencia al elemento sobre el que se aplicará la
   directiva. Cuando la directiva sea usada en cualquier elemento de una plantilla, se 
   creará una instancia de la clase `RotarDirective` pasándole como argumento del constructor
   una referencia al elemento sobre la que se aplica la directiva.

   Código de ayuda:

   ```javascript
    constructor(private el: ElementRef) { }
   ```
3. En el propio constructor cambia la propiedad style.transform del elemento referenciado por 
   la propiedad this.el de la directiva. Comprueba que la directiva funciona aplicándola sobre 
   algún elemento. 
   
   Código de ayuda:

   ```javascript
    this.el.nativeElement.style.transform = `rotate(45deg)`
   ```

   ```html
    <img appRotar width="300px" [src]="imagenurl" (click)="changeImage()"> 
   ```

4. Ahora vamos a parametrizar la directiva para que se pueda indicar un ángulo arbitrario. Para ello:
   Crea una propiedad que recoja su valor de un atributo de la plantilla denominado `angulo`. Úsala
   como valor del ángulo a rotar.
   Atención. Las propiedades que recogen valores desde la plantilla no están disponible hasta que la
   directiva no se ha iniciado completamente. Por lo que tendrás que realizar la operación de rotación
   en el método `ngOnInit()`. Comprueba su funcionamiento

   Código de ayuda

   ```javascript
    @Input() angulo: number
   ```

   ```javascript
    export class RotarDirective implements OnInit
   ```

   ```html
    <img appRotar [angulo]="30" width="300px" [src]="imagenurl" (click)="changeImage()">
   ```

5. Ahora simplificaremos la forma en que se usa la directiva haciendo que el nombre de la directiva
   y el valor del ángulo coincida. Es decir, que se utilice de la siguiente manera:

   ```html
    <img [appRotar]="30" width="300px" [src]="imagenurl" (click)="changeImage()">
   ```
   Es tan sencillo como pasar como argumento del decorador @Input() una cadena que coincida con el
   nombre de la directiva.

6. Por último haremos que cuando se coloque el ratón encima del elemento al que se aplica esta directiva,
   dicho elemento gire de nuevo un ángulo igual al especificado. Para ello se usa el decorador `@HostListener` aplicado a la función que queremos que se ejecute cuando ocurra el evento. Este 
   decorador permite que la directiva responda a eventos del elemento.

  ```html
    @HostListener("click") girar(){
      ...
    }
  ```

## 2. Directiva estructural

Crearemos una directiva estructural muy sencilla que consista en repetir N veces el elemento sobre
la que se aplica.

1. Crea una nueva directiva con `ng generate directive` que se llame `veces`. Comprueba que
   se ha añadido a la sección `declarations` del módulo `AppModule`, y que el selector es
   `[appVeces]`.

2. Las directivas de estructura necesitan una referencia al elemento sobre la que se aplica y que sirve
   y un contenedor que servirá para crear nuevos elementos que podemos añadir a esa plantilla. Eso 
   se hace inyectando ambas referencias por el constructor.

   Código de ayuda:

  ```javascript
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ```

3. Una vez que tenemos esas referencias, obtenemos la expresión (en realidad es un [microsintax](https://angular.io/guide/structural-directives#microsyntax))
   que servirá, en nuestro caso, para saber el nº de veces que vamos a repetir el elemento, usando
   el decorador @Input() que aplicaremos sobre un setter cuyo nombre coincide con el de la directiva.

   Código de ayuda:

   ```javascript
     @Input() set appVeces(n: Number){
        ...        
      }
   ```

  ```javascript
    this.viewContainer.createEmbeddedView(this.templateRef)
  ```

  Y con esto ya tenemos la directiva lista. Pruébala sobre el componente `imagen`, por ejemplo.

[Índice](index.md)