# Directorio raíz

El directorio raíz de un proyecto angular contiene los siguientes elementos:

![Imagen de la estructura de un proyecto](img/estructura.png "Estructura de un proyecto angular")

* **e2e/:** end-to-end tests
* **node_modules/:** módulos de terceros listados en package.json.
* **src/:** Directorio donde reside la aplicación
* **.angular-cli.json:** Fichero de configuración de angular.
* **.editorconfig:** Configuración para el editor (para intentar que todos el equipo de desarrollo utilice la misma configuración). (http://editorconfig.org)
* **.gitignore:** archivos a ignorar por Git
* **karma.conf.js:** Configuración de Karma (para tests unitarios)
* **package.json:** Lista de paquetes de terceros que usa el proyecto.
* **protractor.conf.js:** Configuración para Protactor (para tests end-to-end)
* **README.md:** Pre-relleno con información sobre comandos de angular.
* **tsconfig.json:** Configuración para TypeScript para el IDE
* **tslint.json:** Configuración para TSLint

El directorio src/ tiene la estructura siguiente:

![Imagen de la estructura del directorio src](img/estructura-src.png "Estructura del directorio src")

* **app/app.component.{ts,html,css,spec.ts}:** El componente raíz de la aplicación (archivo typescript, archivo html, archivo css y archivo spec.ts para test).
* **app/app.module.ts:** Define el módulo AppModule, (el módulo raíz) que le dice a angular cómo ensamblar la aplicación.
* **assets/:** Directorio para los assets (se copiará tal cual al construir la aplicación).
* **environments/:** This folder contains one file for each of your destination environments, each exporting simple configuration variables to use in your application. The files are replaced on-the-fly when you build your app. You might use a different API endpoint for development than you do for production or maybe different analytics tokens. You might even use some mock services. Either way, the CLI has you covered.
* **favicon.ico:** El icono favicon.
* **index.html:** El html principal.
* **main.ts:** El punto de entrada principal de la aplicación.
The main entry point for your app. Compiles the application with the JIT compiler and bootstraps the application's root module (AppModule) to run in the browser. You can also use the AOT compiler without changing any code by passing in --aot to ng build or ng serve.
* **polyfills.ts:**
Different browsers have different levels of support of the web standards. Polyfills help normalize those differences. You should be pretty safe with core-js and zone.js, but be sure to check out the Browser Support guide for more information.
* **styles.css:** Your global styles go here. Most of the time you'll want to have local styles in your components for easier maintenance, but styles that affect all of your app need to be in a central place.
* **test.ts:** Punto de entrada principal a los tests unitarios. It has some custom configuration that might be unfamiliar, but it's not something you'll need to edit.
* **tsconfig.app.json:** Configuración del compilador TypeScript para la aplicación angular.
* **tsconfig.spec.json:** Configuración del compilador TypeScript para los tests unitarios(tsconfig.spec.json).
