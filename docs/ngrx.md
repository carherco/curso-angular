# NgRx


## Instalación

> npm install @angular-devkit/schematics --save-dev

> npm install @ngrx/schematics --save-dev

> ng config cli.defaultCollection @ngrx/schematics

> npm install @ngrx/store --save

> npm install @ngrx/store-devtools --save

## Comandos

- Generar el store raíz:

> ng g st State ‐‐root ‐m app.module.ts ‐‐spec false


- Generar el reductor y las acciones y el interface para una funcionalidad concreta: 

> cd .\src\app\reducers\

> ng g r Car ‐‐spec false ‐r index.ts 

> ng g a Car ‐‐spec false
