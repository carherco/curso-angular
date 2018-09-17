# Angular Universal: server-side rendering

Angular Uinversal es una librería para generar páginas en el servidor utilizando un proceso denominado **server-side rendering** (SSR).


## ¿Para qué queremos SSR?

Las razones principales para crear una versión *Universal* de nuestra aplicación son:

- Facilitar el SEO a los web crawlers.
- Mejorar el rendimiento en móvil.
- Mostrar la primera página muy rápido.

## Facilitar el SEO a los web crawlers

Angular Universal puede generar una versión estática de nuestra aplicación que sea fácilmente *searchable*, *enlazable* y navegable sin javascript.

También hace disponible un site-preview ya que cada URL devuelve una página completamente renderizada.

## Mejorar el rendimiento en móvil

Algunos dispositivos no soportan JavaScript o lo ejecutan de manera tan pobre, que la experiencia de los usuarios es inaceptable. Para estos casos, es bueno contar con una versión server-rendered de nuestra app. Es una versión limitada, pero en algún caso la única alternativa práctica para usuarios que de otra forma no podrían utilizar nuestra web.

## Mostrar la primera página muy rápido

Con Angular Universal, se pueden generar páginas de inicio para la aplicación que se parecen a la aplicación completa. Las páginas son HTML puro, y pueden mostrarse incluso si JavaScript está desactivado. Las páginas no manejan los eventos del navegador, pero sí admiten la navegación a través del sitio usando routerLink.

En la práctica, se sirve una versión estática de las páginas de inicio para mantener la atención del usuario. Al mismo tiempo, se cargará en background la aplicación angular completa. 

El usuario percibe un rendimiento casi instantáneo desde la página de inicio y obtiene la experiencia interactiva completa después de que se cargue la aplicación completa.


## Instalar las herramientas de Angular Universal

- @angular/platform-server: Componentes de Universal server-side.
- @nguniversal/module-map-ngfactory-loader: Para manejar el lazy-loading.
- @nguniversal/express-engine - Un motor para el servidor Express para aplicaciones Universal.
- ts-loader: Para transpilar la aplicación del servidor.

Install them with the following commands:

> npm install --save @angular/platform-server @nguniversal/module-map-ngfactory-loader ts-loader @nguniversal/express-engine

## Modificar el módulo raíz AppModule

En el módulo raíz, localizamos el import de BrowserModule y lo cambiamos por: 

```ts
BrowserModule.withServerTransition({ appId: 'curso-de-angular' }),
```

Angular añade el valor de appId a los estilos de las páginas server-rendered para que puedan ser identificadas y eliminadas cuando la aplicación real esté lista.

Podemos obtener la información del **appId** y del **platform** que se está ejecutando:

```ts
//src/app/app.module.ts (platform detection)
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
```


## URLs absolutas

En la aplicación universal, las URLs deben ser absolutas, por ejemplo: 
https://my-server.com/api/heroes mientras que las URLs en el cliente serán relativas.

Tenemos por lo tanto que adecuar nuestros servicios para funcionar de una forma o de la otra según en la aplicación que nos encontremos.

La solución normalmente es inyectar el token **APP_BASE_HREF** en el servicio y añadirlo (si existe) como prefijo de las urls:

```ts
//src/app/hero.service.ts (constructor with optional origin)
content_copy
constructor(
  private http: HttpClient,
  private messageService: MessageService,
  @Optional() @Inject(APP_BASE_HREF) origin: string) {
    this.heroesUrl = `${origin}${this.heroesUrl}`;
  }
```

APP_BASE_HREF en el cliente tiene el valor que hayamos puesto en &lt;base href="/"> en el index.html.



## Compilar la app cliente

Una aplicación Universal se distribuye en dos partes: el código del lado del servidor que sirve la aplicación inicial y el código del lado del cliente que se carga dinámicamente.

Podemos modificar el fichero angular.json para no equivocarnos con qué compilación es cada una.


```js
"build": {
  "builder": "@angular-devkit/build-angular:browser",
  "options": {
    "outputPath": "dist/browser",
    ...
  }
}
```


## Server code

Para ejecutar la aplicación Universal, necesitamos un servidor que sea capaz de manejar peticiones y devolver páginas renderizadas.

### App server module

Crearemos un módulo *AppServerModule* (llamada convencionalmente AppServerModule) que envolverá al módulo raíz para que Universal pueda mediar entre la aplicación y el servidor. AppServerModule también le dice a Angular cómo iniciar su aplicación cuando se ejecuta como una aplicación Universal.

```ts
//src/app/app.server.module.ts
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
 
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
 
@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule
  ],
  providers: [
    // Add universal-only providers here
  ],
  bootstrap: [ AppComponent ],
})
export class AppServerModule {}
```

En este módulo importamos:

- El módulo raíz del cliente: AppModule
- El módulo de Angular de Universal: ServerModule
- El módulo ModuleMapLoaderModule que permite lazy-loading en el seridor.


### App server entry point

Crearemos también el ts de entrada para la aplicación en el servidor:

```ts
//src/main.server.ts
export { AppServerModule } from './app/app.server.module';
```

El fichero main.server.ts será referenciado más tarde para añadir un *server target* en la configuración de angular cli.


### Filter request URLs

El servidor web debe distinguir las requests de la aplicación del resto de requests.

Por ejemplo:
data request: URLs que empiezan por */api*
app navigation: URLs sin extensión
static asset: URLs con extensión


Ejemplo de configuración en servidor Express:

```ts
//server.ts (data URL)
app.get('/api/*', (req, res) => {
  res.status(404).send('data requests are not supported');
});

//server.ts (navigation)
// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

//server.ts (static files)
// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));
```



## Configuración para la app Universal

La aplicación del lado del servidor requiere su propia configuración

## Universal TypeScript configuration

Crearemos un fichero tsconfig.server.json en el directorio raíz del proyecto para configurar TypeScript y la compilación AOT para la app Universal.

```ts
src/tsconfig.server.json
content_copy
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "../out-tsc/app",
    "baseUrl": "./",
    "module": "commonjs",
    "types": []
  },
  "exclude": [
    "test.ts",
    "**/*.spec.ts"
  ],
  "angularCompilerOptions": {
    "entryModule": "app/app.server.module#AppServerModule"
  }
}
```


## Angular CLI configuration

```ts
//angular.json
"architect": {
  ...
  "server": {
    "builder": "@angular-devkit/build-angular:server",
    "options": {
      "outputPath": "dist/server",
      "main": "src/main.server.ts",
      "tsConfig": "src/tsconfig.server.json"
    }
  }
  ...
}
```

## Build and run with universal

Para facilitar las tareas de compilación, nos crearemos los siguientes comandos y configuración para npm:

```json
//package.json:
"scripts": {
    ...
    "build:ssr": "npm run build:client-and-server-bundles && npm run webpack:server",
    "serve:ssr": "node dist/server",
    "build:client-and-server-bundles": "ng build --prod && ng run angular.io-example:server",
    "webpack:server": "webpack --config webpack.server.config.js --progress --colors"
    ...
}
```

## Build

> npm run build:ssr

Nos generará dos directorios: *browser* y *server*.


> npm run serve:ssr

El servidor se quedará escucando en http://localhost:4000


## Universal en acción

Tenemos una app en el navegador que parece la real, pero no lo es.

La navegación vía routerLinks funciona correctamente, pero los clicks, eventos de ratón y eventos de teclado, no hacen nada... hasta que la aplicación real se carga completamente.
