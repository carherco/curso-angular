# NgRx

La librería NgRx nos ayuda a utilizar Redux en nuestro proyecto de Angular.

## Instalación

Para utilizar NgRx, necesitamos isntalar las propias librerías más algunas herramientas de desarrollo que añaden potencia al CLI de Angular.

> npm install @angular-devkit/schematics --save-dev

> npm install @ngrx/schematics --save-dev

> ng config cli.defaultCollection @ngrx/schematics

> npm install @ngrx/store --save

> npm install @ngrx/store-devtools --save


## Comandos

Ahora con el CLI de Angular podemos hacer más cosas: 

- Generar el store raíz:

> ng g st State ‐‐root ‐m app.module.ts ‐‐spec false


- Generar el reductor y las acciones y el interface para una funcionalidad concreta: 

> cd .\src\app\reducers\

> ng g r Hero ‐‐spec false ‐r index.ts 

> ng g a Hero ‐‐spec false

## Ejercicio

Realizar el ejercicio anterior utilizando la librería NgRx
