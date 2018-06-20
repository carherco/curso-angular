# Arquitectura

Angular se ha construido siguiendo una arquitectura modular. Los elementos que conforman una aplicación desarrollada con Angular son:

- Módulos
- Componentes
- Servicios
- Directivas
- Pipes

Toda aplicación Angular tiene al menos un módulo raíz denominado convencionalmente *AppModule* . A su vez este módulo consta al menos de un componente ráiz denominado convencionalmente *AppComponent*.

Cada Módulo puede contener uno o varios componentes, servicios, directivas y pipes. A su vez, cada módulo puede importar otros módulos que exponen parte o todos sus componentes servicios directivas y pipes, y que por tanto pueden ser utilizados por los componentes del módulo que los importa.

El siguiente gráfico, tomado de la documentación oficial de Angular, muestra la arquitectura de un módulo:

![Arquitectura módulo](https://angular.io/generated/images/guide/architecture/overview2.png)

Los componentes llevan asociado una plantilla (template, HTML) y al conjunto componente-template se le llama vista. Un componente puede incoporar en su plantilla otras vistas, por lo que una aplicación Angular define una jerarquía de vistas. 

Cuando se crea un componente, este es asociado directamente a una vista simple, llamada la vista host. La vista host puede ser la raíz de una jerarquía de vistas, la cual puede contener vistas embebidas, que son las vistas hosts de otros componentes. Esos componentes pueden estar en el mismo módulo o importados de otros módulos. Las vistas pueden ser anidadas hasta cualquier profundidad.

La siguiente imagen, tomada de la documentación oficial de Angular muestra esta idea.

![Jerarquía de componentes 1](https://angular.io/generated/images/guide/architecture/compilation-context.png)

![Jerarquía de componentes 2](https://angular.io/generated/images/guide/architecture/view-hierarchy.png)

Angular se distribuye como un conjunto de módulos que pueden ser vistos como liberías de módulos. Cada uno de estos módulos comienza con el prefijo `@angular`. Por ejemplo

  import { BrowserModule } from '@angular/platform-browser';

  En las secciones siguientes estudiaremos en detalle cada uno de estos elementos que conforman una aplicación Angular: módulos, componentes (vistas), servicios, directivas y pipes.