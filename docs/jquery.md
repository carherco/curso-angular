# Añadir librería externa a un proyecto Angular. Ejemplo JQuery

Supongamos que deseamos añadir jquery a nuestro proyecto. La forma más correcta
de hacerlo es indicándolo en la sección `build/scripts` del archivo de 
configuración `angular.json`:

`angular.json`
```javascript
...
"projects": {
    ...
    "nombre_proyecto": {
        ...
        "architect": {
            ...
            "build": {
                ...
                "options": {
                    ...
                    "scripts": ["node_modules/jquery/dist/jquery.min.js"]
                }
            }
        }
    }
}
```

Para que esto funcione debemos instalar jquery:

```bash
> npm install --save jquery
```

Si además queremos tener disponibles los tipos para typescript:

```javascript
> npm install --save-dev @types/jquery
```

Por último, en el componente que deseemos utilizar jquery:

```javascript
import * as $ from 'jquery'
```

Y ya podemos usar la librería en nuestro código.

[Índice](index.md)
