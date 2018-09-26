# Módulos

Toda aplicación Angular tiene al menos una clase NgModule, **el módulo raíz**, convencionalmente llamado *AppModule*.

En aplicaciones pequeñas, solamente existirá el módulo raíz. En aplicaciones grandes, es recomendable separar la misma en diferentes módulos según funcionalidades, flujo de trabajo, o alguna otra característica.

Un módulo es una clase *NgModule* con un decorador *@NgModule*.

## El decorador @NgModule

@NgModule es una *función decoradora* que toma un único objeto de **metadatos** cuyas propiedades describen dicho módulo. 

Las propiedades más importantes del objeto de metadatos son:

- **declarations:** Las *view classes* que pertenecen a este módulo. Angular tiene 3 tipos de view classes: componentes, directivas, y pipes.
- **exports:** El subconjunto de *declarations* que deben ser visibles y utilizables en las plantillas de componente (*component templates*) de otros módulos que lo importen.
- **imports:** Lista de módulos importados. Tendremos acceso a los elementos incluidos en el *exports* del módulo importado.
- **providers:** Creadores de servicios (*services*) con los que este módulo contribuye en la colección global de servicios. Son accesibles en cualquier parte de la aplicación.
- **bootstrap:** La vista de aplicación principal (el componente raíz) que alberga al resto de vistas. Solamente el módulo raíz utilizará la propiedad bootstrap.
- **entryComponents:** Componentes que se deban compilar con este NgModule para que sean dinámicamente cargados en una vista (o bien por el routing o bien por el ComponentFactory). A partir de Angular 6 ya no es necesario inidcar aquí los componentes del routing.
- **schemas:** El conjunto de *schemas* que declaran elementos permitidos en el HTML del NgModule. Elementos y propiedades que no sean Directivas, Componentes, deberían ser declarados en un schema. Los valores permitidos son *NO_ERRORS_SCHEMA* (no genera errores por tags desconocidos) y *CUSTOM_ELEMENTS_SCHEMA*. NO_ERRORS_SCHEMA es útili para testear componentes que dependen de otros.
- **id:** Un nombre o un path que identifican de forma única a este NgModule. Si no se indica nada, el módulo no será registrado con getModuleFactory.
- **jit:** Si su valor es *true* este módulo serán ignorado por el compilador AOT y por lo tanto siempre se compilará utilizando JIT.

Aquí hay un pequeño ejemplo:

```typescript
    //src/app/app.module.ts
    import { NgModule }      from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    @NgModule({
      imports:      [ BrowserModule ],
      providers:    [ Logger ],
      declarations: [ AppComponent ],
      exports:      [ AppComponent ],
      bootstrap:    [ AppComponent ]
    })
    export class AppModule { }
```

La aplicación se lanza haciendo bootstrapping del módulo raíz. Normalmente está en *src/main.ts*

```typescript
//src/main.ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

//...

platformBrowserDynamic().bootstrapModule(AppModule);
```

En el siguiente enlace, se puede consultar la lista de todas las propiedades de @Component:

[Propiedades de @Module](https://angular.io/api/core/NgModule)

[Índice](index.md)
