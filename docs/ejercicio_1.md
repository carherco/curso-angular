# Ejercicio 1

1. Crea un proyecto Angular
2. Crea dos componentes denominados `imagen` y `texto`
3. Añadelos a la vista raíz (componente AppComponent) y comprueba que todo va bien
4. Añade estilos a las css's de ambos componentes para que se muestre un border 
   sólido que marque los límites del componente. Pon distintos colores a los marcos de cada componente para distinguirlos. El siguiente código CSS te puede
   ayudar.
```css
.border {
    border-style: solid;
    border-color: aquamarine;
    float: left;
}
``` 

5. Prueba a añadir varias veces el mismo componente.
6. Prueba a insertar uno o varios componentes `texto` dentro del componente `imagen`
7. Prueba a insertar uno o varios componentes `imagen` dentro del componente `texto`
8. Ahora vamos a añadir funcionalidad al componente `imagen`. Haz que el
   componente muestre una imagen aleatoria de entre las siguientes:

   - "https://image.freepik.com/free-vector/vector-illustration-cosmonaut_1441-11.jpg"
   - "https://image.freepik.com/free-vector/polygonal-lion-head_23-2147495868.jpg"
   - "https://image.freepik.com/free-vector/hand-painted-steampunk-man-illustration_23-2147537528.jpg"
   - "https://image.freepik.com/free-vector/analytical-and-creative-brain_23-2147506845.jpg"
   - "https://image.freepik.com/free-vector/abstract-floral-background_1005-10.jpg"
   - "https://image.freepik.com/free-vector/thank-you-composition-in-comic-style_23-2147831785.jpg"
   - "https://media.giphy.com/media/3ornk2zKMUgETO4aMo/giphy.gif"
9. Haz que cuando se haga click en el componente imagen se cambie aleatoriamente la imagen mostrada
10. Ahora vamos a añadir funcionalidad al componente `texto`. Añade dos textos que pillen su contenido
    mediante interpolación de dos atributos del componente.
11. Aplica la CSS que incluimos al final del ejercicio que da un efecto de NEON al texto
12. Añade dos cajas de texto (elemento `<input />`) para editar cada uno de los dos textos anteriores 
13. Crea un nuevo módulo denominado `FractalModule` y un componente denominado `TreeComponent`` que 
    pertenezca a dicho módulo.
14. Define los metadatos del módulo principal ``AppModule`` y del módulo recien creado ``FractalModule``
    para que aquel importe a este y pueda utilizar el componente `TreeComponent`. Añade este componente al
    componente raíz `AppComponent` y comprueba que funciona. 
15. Ahora usa el código que incluimos más abajo (tree)

[Índice](index.md)


# CSS texto NEON

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
  color: #FB4264;
  font-size: 9vw;
  line-height: 9vw;
  text-shadow: 0 0 3vw #F40A35;
}

.flux {
  font-family: neon;
  color: #426DFB;
  font-size: 9vw;
  line-height: 9vw;
  text-shadow: 0 0 3vw #2356FF;
}

.neon {
  animation: neon 1s ease infinite;
  -moz-animation: neon 1s ease infinite;
  -webkit-animation: neon 1s ease infinite;
}
@keyframes neon {
  0%,
  100% {
    text-shadow: 0 0 1vw #FA1C16, 0 0 3vw #FA1C16, 0 0 10vw #FA1C16, 0 0 10vw #FA1C16, 0 0 .4vw #FED128, .5vw .5vw .1vw #806914;
    color: #FED128;
  }

  50% {
    text-shadow: 0 0 .5vw #800E0B, 0 0 1.5vw #800E0B, 0 0 5vw #800E0B, 0 0 5vw #800E0B, 0 0 .2vw #800E0B, .5vw .5vw .1vw #40340A;
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
    text-shadow: 0 0 1vw #1041FF, 0 0 3vw #1041FF, 0 0 10vw #1041FF, 0 0 10vw #1041FF, 0 0 .4vw #8BFDFE, .5vw .5vw .1vw #147280;
    color: #28D7FE;
  }

  50% {
    text-shadow: 0 0 .5vw #082180, 0 0 1.5vw #082180, 0 0 5vw #082180, 0 0 5vw #082180, 0 0 .2vw #082180, .5vw .5vw .1vw #0A3940;
    color: #146C80;
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