# Introducción

Angular es un framework de JavaScript de código abierto, mantenido por Google, que se utiliza para crear y mantener aplicaciones web de una sola página (*single page applications*)

## Versiones

AngularJS (v1)
Angular (v2 y v4)

No existe la versión 3: https://www.infoq.com/news/2016/12/angular-4

## Características Angular

- Basado en HTML + JavaScript
- SPA (Single Page Application)
- Sigue el patrón MVC
- Orientado a la creación de apps móviles.
- Se puede programar con ECMAScript 5 de toda la vida, ES6, TypeScript o incluso Dart (de Google).
- Integrado con npm y node.

### Ejemplo spa - no spa

Ficheros spa.html y no-spa.html
http://localhost:8888/carlos/curso_angular/spa.html

### Url fragments

Angular basa su funcionamiento SPA en utilizar la parte de las URLs denominada fragments (la parte de la URL que va después de #).

Un elemento &lt;a href="#loquesea"> no recarga el navegador al hacer click, ya que se da por hecho que ese elemento es un fragmento del documento que ya está en la pantalla.

Todas las rutas de Angular son en realidad framentos de la misma URL. Angular actúa internamente sobre el evento *onhashchange Event* del DOM y realiza en ese evento las operaciones necesarias para crear, cambiar, destruir los componentes necesarios.

Nota: Recordemos que las partes de una url son:

- Protocol
- Host
- Port
- Path
- Query
- Fragment

