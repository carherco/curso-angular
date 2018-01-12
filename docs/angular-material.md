Angular Material

Requiere la versión 5.1.1 de Angular.

1) Instalar @angular/material y @angular/cdk

> npm install --save @angular/material @angular/cdk

2) Incluir un tema. Podemos utilizar uno de los que vienen por defecto

```css
@import "~@angular/material/prebuilt-themes/indigo-pink.css";
```

3) Instalar soporte de gestos (opcional)

To install via npm, use the following command:

> npm install --save hammerjs

After installing, import it on your app's entry point (e.g. src/main.ts).

```js
import 'hammerjs';
```

4) Añadir los iconos de Material (opcional)

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

https://material.angular.io/components/categories
