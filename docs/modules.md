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
- **entryComponents:** Esta es la lista de componentes cargados dinámicamente. En angular hay 3 formas de cargar componentes de forma dinámica. La primera es el componente raíz o componente de bootstraping. La segunda son los componentes cargados a través del routing en los router-outlet. Y la tercera son los componentes cargados dinámicamente con ViewComponentRef.createComponent(). Angular es capaz de descubrir y añadir implícitamente el componente de bootstrap y los de routing en la sección entryComponents por lo que a día de hoy únicamente es necesario indicar aquí los componentes que se cargarán a través de ViewComponentRef.createComponent().
- **schemas:** El conjunto de *schemas* que declaran elementos permitidos en el HTML del NgModule. Elementos y propiedades que no sean Directivas, Componentes, deberían ser declarados en un schema. Los valores permitidos son *NO_ERRORS_SCHEMA* (no genera errores por tags desconocidos en el HTML) y *CUSTOM_ELEMENTS_SCHEMA*. NO_ERRORS_SCHEMA es útil para testear componentes que dependen de otros.
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

En el siguiente enlace, se puede consultar la lista de todas las propiedades de @NgModule:

[Propiedades de @NgModule](https://angular.io/api/core/NgModule)

[Índice](index.md)
