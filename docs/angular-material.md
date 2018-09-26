# Angular Material

Requiere al menos la versión 5.1.1 de Angular.

1) Instalar @angular/material y @angular/cdk

> npm install --save @angular/material @angular/cdk

2) Instalar @angular/animations (opcional)

> npm install --save @angular/animations

2) Incluir un tema. Podemos utilizar uno de los que vienen por defecto

```css
@import "~@angular/material/prebuilt-themes/indigo-pink.css";
```

3) Instalar soporte de gestos (opcional)

> npm install --save hammerjs

Después de instalar hammerjs, hay que importarlo en nuestro main.ts (e.g. src/main.ts).

```js
import 'hammerjs';
```

4) Añadir los iconos de Material (opcional)

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```



## Ejercicios:

1) Poner Angular Material en el componente GaleriaComponent.

2) Poner Angular Material en algún CRUD.


https://material.angular.io/components/categories
