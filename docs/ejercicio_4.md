# Ejercicio 4

## Servicios e inyección de dependencias (DI)

1. Crea dos componentes, llámalos `azul` y `verde` por ejemplo. Para 
   reconocer sus límites añade una capa (`div`) con una clase CSS con
   borde sólido y color de fondo azul y verde respectivamente. Añade dos
   instancias del componente `AzulComponent` en la vista principal 
   (`app.component.html`)

2. Crea un directorio `services` y en él una clase `GuidService` con un 
   método `guid()` que devolverá una cadena única cada vez que se 
   invoque. Esta cadena puede ser utilizada como identificador único y la
   usaremos para asignar un identificador único a las instancias que se creen de la clase  `GuidService`. Crea un atributo `id` e inicializalo en el constructor de la clase usando la función `guid()`.

3. Registra la clase `GuidService` en la sección `providers` del módulo 
   principal `AppModule`. Inyecta este servicio en el constructor del
   componente `AzulComponent` y añade el siguiente código:

   ```javascript
   ngOnInit() {
    console.log(this.guiService.getId())
   }
   ```
   Donde `this.guiService` es la instancia de `GuidService` inyectada en el 
   componente a través del constructor, y `getId()` es un método que devuelve
   el valor del atributo `id`.

   Ejecuta la aplicación y comprueba que los objetos `GuidService` de ambos 
   componentes son el mismo. Esto es así por que se ha registrado a nivel
   del módulo principal.

4. Ahora registra la clase `GuidService` en la sección `providers` del 
   componente `VerdeComponent`. Inyecta este servicio en el constructor del
   componente `VerdeComponent` y añade el siguiente código:

   ```javascript
   ngOnInit() {
    console.log(this.guiService.getId())
   }
   ```
   Donde `this.guiService` es la instancia de `GuidService` inyectada en el 
   componente a través del constructor, y `getId()` es un método que devuelve
   el valor del atributo `id`.

   Ejecuta la aplicación y comprueba que los objetos `Servicio1` de ambos 
   componentes son distintos. Esto es así por que se ha registrado a nivel
   de componente, y cada componente tiene su propio inyector de dependencia.

5. Crea un nuevo servicio denominado `PrimeService` usando la herramienta
   CLI de Angular:

   ```bash
   ng generate service services/prime
   ```

   Inyecta el servicio `GuidService` en este nuevo servicio como dependencia,
   añade un atributo `id` a `PrimeService` e inicializalo con la función 
   `guid()` del servicio `GuidService`. Así tendremos identificadas de manera
   única a las instancias de `PrimeService`. Añade también un método 
   `getId()`.

6. Inyecta el servicio `PrimeService` en el componente `AzulComponent` y
   añade a la función `ngOnInit()` el siguiente código:

   ```javascript
   console.log(this.guiService.getId())
   ```

   Ejecuta la aplicación y comprueba que las instancias de este nuevo 
   servicio son las mismas en ambos componentes. Esto es así por que se
   realiza el registro del servicio a nivel del inyector root, como se
   indica en los métadatos del servicio.

   Al indicar en los propios metadatos que la clase se va a usar como 
   servicio inyectable a nivel del inyector root, no hay que hacer nada
   en ningún otro fichero y podemos comenzar a inyectar el servicio allá
   donde lo necesitemos.

A continuación vamos a reescribir el código de los componentes del módulo
fractal para que los componentes hagan uso de servicios. De esta manera
conseguiremos un código más desacoplado, reutilizable y testeable.

7. En el directorio `services` crea 3 servicios denominados `canvas`, `tree` 
   y `mandelbrot`. Utiliza la herramienta CLI de Angular.

8. En el módulo `fractal-module` crea 2 componentes denominados 
   `tree-with-service` y `mandelbrot-with-service`

9. Comenzamos con la implementación del servicio `CanvasService` cuya 
responsabilidad será la creación de un canvas y su contexto de renderización
2D.

Inyecta en este servicio el servicio `DOCUMENT` del módulo 
   `'@angular/common'`. Añade la siguiente función para crear un canvas:
   
   ```javascript
   createCanvas(elRef: ElementRef, width=700, height=600){
    let canvas = this.document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    elRef.nativeElement.appendChild(canvas);
    let ctx = canvas.getContext("2d");
    
    return {
      canvas: canvas,
      ctx: ctx
    }
  }
  ```
  A esta función hay que pasarle una referencia al elemento donde queremos que
  se "enganche" el canvas creado.

10. Ahora vamos a implementar el servicio `TreeService`. El servicio tendrá
    3 atributos y 3 métodos. Los atributos serán `canvas`, `p1` y `p2`. Y 
    los métodos serán:

    - setCtx(ctx: CanvasRenderingContext2D)
    - setParams(p1: number, p2: number)
    - draw(startX, startY, len, angle)

    Usa el código del método `draw()` del componente `TreeComponent` para 
    adaptarlo al método `draw()` del servicio.

11. Y ahora implementamos el componente `TreeComponentWithService`. En esta
    reimplementación haremos que los parámetros `p1` y `p2` sean de entrada
    del componente (usando `@Input`) en lugar de obtenerse de elementos 
    `<input>` de formulario como haciamos en el componente `TreeComponent`.
    
    Hay que inyectar los servicios:

    - CanvasService
    - TreeService
    - ElementRef

    Nota: Cuando se inyecta un objeto `ElementRef` en un componente, dicho
    objeto hace referencia al `host` del component, es decir, al elemento
    HTML raíz del componente.

    En el método `ngOnInit()` crea un canvas sobre el elemento `host` del 
    componente, define el contexto de renderización 2D y los parámetros 
    `p1` y `p2` sobre el servicio `TreeComponent` y llama a la función 
    `draw()` de este componente.

    Prueba que todo funcione.

12. Implementa el servicio `MandelbrotService` y el componente 
    `MandelbrotWithServiceComponent` siguiendo la misma estrategia que hemos
    usado en los ejercicios 10 y 11

[Índice](index.md)