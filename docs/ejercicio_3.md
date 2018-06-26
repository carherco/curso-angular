# Ejercicio 3

## Paso de variables entre componentes

En este ejercicio estudiaremos como se pueden pasar variables de un componente
padre a uno hijo y viceversa. Para ello añadiremos al módulo de fractales 
que hemos creado en un ejercicio anterior, un nuevo componente cuyos parámetros 
para la construcción del fractal serán indicados como atributos del propio
componente. Además este nuevo componente tendrá un botón para notificar al componente padre que el usuario desea cerrarlo.

1. Crea un nuevo componente que se llame `mandelbrot` y que pertenezca al modulo
   `fractal`. Usa el comando `ng g c fractals/mandelbrot` y comprueba que es 
   añadido automáticamente  a la sección `declarations` del módulo. Como queremos 
   usarlo en el módulo `AppModule`, añádelo a la sección `exports`.

2. El siguiente código dibuja el conjunto de mandelbrot. Los atributos `this.panX`,
   `this.panY`, `this.magnificationFactor` y `this.maxIterations` son los 
   parámetros con los que se construye dicho fractal. Una combinación de dichos 
   parámetros que da lugar a un bonito dibujo del conjunto es:

   ```javascript
    panX = 2
    panY = 1.5
    magnificationFactor = 200
    maxIterations = 100
   ```
   Usa el código propuesto para construir el componente `mandelbrot`. Ten en cuenta
   que `this.ctx` es el contexto de renderización 2D de un elemento canvas. Para
   obtenerlo puedes usar el mismo código del ejercicio 1. Prueba el componente 
   añadiéndolo a la vista del componente `AppComponent`.

    ```javascript
    checkIfBelongsToMandelbrotSet(x, y) {
        var realComponentOfResult = x;
        var imaginaryComponentOfResult = y;
        for (var i = 0; i < this.maxIterations; i++) {
        var tempRealComponent = realComponentOfResult * realComponentOfResult
            - imaginaryComponentOfResult * imaginaryComponentOfResult
            + x;
        var tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult
            + y;
        realComponentOfResult = tempRealComponent;
        imaginaryComponentOfResult = tempImaginaryComponent;

        if (realComponentOfResult * imaginaryComponentOfResult > 5)
            return (i / this.maxIterations * 100);
        }
        return 0; 
    }

    draw() {
        for (var x = 0; x < this.canvas.width; x++) {
        for (var y = 0; y < this.canvas.height; y++) {
            var belongsToSet =
            this.checkIfBelongsToMandelbrotSet(x / this.magnificationFactor - this.panX,
                y / this.magnificationFactor - this.panY);
            if (belongsToSet == 0) {
            this.ctx.fillStyle = '#000';
            this.ctx.fillRect(x, y, 1, 1);
            } else {
            this.ctx.fillStyle = 'hsl(0, 100%, ' + belongsToSet + '%)';
            this.ctx.fillRect(x, y, 1, 1); // Draw a colorful pixel
            }
        }
        }
    }
    ```
3. Ahora vamos a parametrizar el componente para que se puedan pasar los valores
   de los parámetros de construcción del fractal desde el componente (vista) que lo
   incluye. El decorador `@Input('nombre_parametro')` aplicado sobre un 
   atributo de un componente sirve para indicar a dicho componente que el valor
   del atributo en cuestión se puede obtener desde la plantilla del componente que
   lo está usando. Es decir; si indicamos en el componente `mandelbrot`:

   ```javascript
    @Input('panX') panX: number = 2
   ```

    Y, desde un componente padre, incluimos al componente `mandelbrot` de esta 
    forma:

    ```html
    <app-mandelbrot [panX]="3"></app-mandelbrot>
    ```

    Entonces, cuando Angular construya el componente `mandelbrot`, se usará "3"
    como valor de su atributo `this.panX` en lugar del especificado por defecto en
    la declaración del atributo (es decir "2" en el ejemplo). De esa manera 
    conseguimos pasar datos del componente padre al hijo.

    Observa que esto no es más que un data binding desde el componente (padre)a la plantilla (del componente padre), siendo `panX` un atributo del elemento
    HTML `app-mandelbrot`.

    Usa esta técnica para parametrizar el resto de parámetros de construcción del
    fractal y comprueba su funcionamiento.

4. Los componentes hijos pueden pasar datos al componente padre mediante emisión de
   eventos. La técnica funciona como sigue. En el elemento hijo definimos como
   atributo un EventEmiter que decoramos con el decorador 
   `@Output('nombre_parametro')`.

   ```javascript
   @Output('onMandelbrotDelete') onMandelbrotDelete = new EventEmitter<string>()
   ```

   Ahora podemos usar este EventEmiter para emitir un evento cuando ocurra 
   algo relevante que deseemos notificar al componente padre, por ejemplo cuando el
   usuario pulse en un botón:

   ```html
   <button (click)="delete()">Cerrar</button>
   ``` 

   ```javascript
   delete(){
       this.onMandelbrotDelete.emit("mensaje")
   }
   ```
    Desde el elemento padre tenemos acceso a dicho  evento usando el típico data binding desde la plantilla (del componente padre) al componente (padre):

   ```html
   <app-mandelbrot (onMandelbrotDelete)="removeComponent($event)"></app-mandelbrot>
   ```

   En el argumento `$event` tenemos el valor emitido, es decir `"mensaje"` en 
   nuestro ejemplo.
   
   Usando esta técnica adapta el componente `mandelbrot` para que notifique al
   componente padre cuando el usuario pulse en un botón de borrado.

   Pistas: El componente `mandelbrot` debe incorporar un atributo que lo identifique
   y que se pueda definir desde el componente padre (igual que se hace con `panX`, 
   `panY`, etcétera). Y será el valor de este atributo el que se emita cuando se
   pulse el botón de borrado. Así el componente padre puede saber cual de los 
   componentes `mandelbrot` (en caso de que haya más de uno) debe borrar. 


[Índice](index.md)