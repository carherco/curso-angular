# Ejercicio 1

1.  Crea un proyecto Angular
2.  Crea dos componentes denominados `imagen` y `texto`
3.  Añadelos a la vista raíz (componente AppComponent) y comprueba que todo va bien
4.  Añade estilos a las css's de ambos componentes para que se muestre un border
    sólido que marque los límites del componente. Pon distintos colores a los marcos de cada componente para distinguirlos. El siguiente código CSS te puede
    ayudar.

```css
.border {
  border-style: solid;
  border-color: aquamarine;
  float: left;
}
```

5.  Prueba a añadir varias veces el mismo componente.
6.  Prueba a insertar uno o varios componentes `texto` dentro del componente `imagen`
7.  Prueba a insertar uno o varios componentes `imagen` dentro del componente `texto`
8.  Ahora vamos a añadir funcionalidad al componente `imagen`. Haz que el
    componente muestre una imagen aleatoria de entre las siguientes:

    - "https://image.freepik.com/free-vector/vector-illustration-cosmonaut_1441-11.jpg"
    - "https://image.freepik.com/free-vector/polygonal-lion-head_23-2147495868.jpg"
    - "https://image.freepik.com/free-vector/hand-painted-steampunk-man-illustration_23-2147537528.jpg"
    - "https://image.freepik.com/free-vector/analytical-and-creative-brain_23-2147506845.jpg"
    - "https://image.freepik.com/free-vector/abstract-floral-background_1005-10.jpg"
    - "https://image.freepik.com/free-vector/thank-you-composition-in-comic-style_23-2147831785.jpg"
    - "https://media.giphy.com/media/3ornk2zKMUgETO4aMo/giphy.gif"

9.  Haz que cuando se haga click en el componente imagen se cambie aleatoriamente la imagen mostrada
10. Ahora vamos a añadir funcionalidad al componente `texto`. Añade dos textos que pillen su contenido
    mediante interpolación de dos atributos del componente.
11. Aplica la CSS que incluimos al final del ejercicio que da un efecto de NEON al texto
12. Añade dos cajas de texto (elemento `<input />`) para editar cada uno de los dos textos anteriores
13. Crea un nuevo módulo denominado `FractalModule` y un componente denominado `TreeComponent`` que
    pertenezca a dicho módulo.
14. Define los metadatos del módulo principal `AppModule` y del módulo recien creado `FractalModule`
    para que aquel importe a este y pueda utilizar el componente `TreeComponent`. Añade este componente al
    componente raíz `AppComponent` y comprueba que funciona.
15. Ahora añade el código necesario para que el componente dibuje un árbol fractal      en un elemento canvas. Usa el código que mostramos más abajo.
16. Añade dos cajas de texto para que el usuario pueda cambiar interactivamente los     valores de los parámetros que aparecen en las líneas:
    ```javascript
        this.draw(0, -len, len*0.8, -15);
        this.draw(0, -len, len*0.8, 15);
    ```
    de la función draw. Haz que se repinte el árbol únicamente cuando el usuario presiona la tecla  `enter`. Ten en cuenta que:
    - el evento `keyup` envía en su atributo `key` el valor de la tecla pulsada,
    que en el caso de `enter` es "Enter"
    - que el canvas se borra con la instrucción: 
    ```javascript
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    ```
    `ctx` es el contexto 2D del canvas


## CSS texto NEON

```css
.body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: table;
  background-color: black;
}
@font-face {
  font-family: neon;
  src: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/707108/neon.ttf");
}

.container {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

.neon {
  font-family: neon;
  color: #fb4264;
  font-size: 9vw;
  line-height: 9vw;
  text-shadow: 0 0 3vw #f40a35;
}

.flux {
  font-family: neon;
  color: #426dfb;
  font-size: 9vw;
  line-height: 9vw;
  text-shadow: 0 0 3vw #2356ff;
}

.neon {
  animation: neon 1s ease infinite;
  -moz-animation: neon 1s ease infinite;
  -webkit-animation: neon 1s ease infinite;
}
@keyframes neon {
  0%,
  100% {
    text-shadow: 0 0 1vw #fa1c16, 0 0 3vw #fa1c16, 0 0 10vw #fa1c16, 0 0 10vw
        #fa1c16, 0 0 0.4vw #fed128, 0.5vw 0.5vw 0.1vw #806914;
    color: #fed128;
  }

  50% {
    text-shadow: 0 0 0.5vw #800e0b, 0 0 1.5vw #800e0b, 0 0 5vw #800e0b, 0 0 5vw
        #800e0b, 0 0 0.2vw #800e0b, 0.5vw 0.5vw 0.1vw #40340a;
    color: #806914;
  }
}

.flux {
  animation: flux 2s linear infinite;
  -moz-animation: flux 2s linear infinite;
  -webkit-animation: flux 2s linear infinite;
  -o-animation: flux 2s linear infinite;
}
@keyframes flux {
  0%,
  100% {
    text-shadow: 0 0 1vw #1041ff, 0 0 3vw #1041ff, 0 0 10vw #1041ff, 0 0 10vw
        #1041ff, 0 0 0.4vw #8bfdfe, 0.5vw 0.5vw 0.1vw #147280;
    color: #28d7fe;
  }

  50% {
    text-shadow: 0 0 0.5vw #082180, 0 0 1.5vw #082180, 0 0 5vw #082180, 0 0 5vw
        #082180, 0 0 0.2vw #082180, 0.5vw 0.5vw 0.1vw #0a3940;
    color: #146c80;
  }
}
```

Y se aplica así:

```html
<div class="container">
    <div class="flux"> Hola</div>
    <div class="neon">Mundo</div>
</div>
```

## Código para árbol fractal

```javascript
draw(startX, startY, len, angle) {
    this.ctx.beginPath();
    this.ctx.save();

    this.ctx.translate(startX, startY);
    this.ctx.rotate(angle * Math.PI/180);
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, -len);
    this.ctx.stroke();

    if(len < 10) {
      this.ctx.restore();
      return;
    }

    this.draw(0, -len, len*0.8, -15);
    this.draw(0, -len, len*0.8, 15);

    this.ctx.restore();
  }
```

## Código para obtener una referencia al contexto 2D de un canvas

En el componente:

```javascript
  ngOnInit() {
      this.canvas = document.createElement("canvas");
      this.canvas.width = 700;
      this.canvas.height = 600;
      document.getElementById("canvas").appendChild(this.canvas);
      this.ctx = this.canvas.getContext("2d");
      this.draw(350, 600, 120, 0);
    }
```
Y en la plantilla:

```html
<div id="canvas"></div>
```


[Índice](index.md)