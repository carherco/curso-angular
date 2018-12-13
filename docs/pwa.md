# Progressive Web Applications

Desde la versión 6, podemos lanzar el siguiente comando para dar soporte PWA a nuestra aplicación Angular

> ng add @angular/pwa

El comando anterior realiza lo siguiente:

- Añade el paquete @angular/service-worker al proyecto.
- Habilita soporte para service worker al hacer *ng build*
- Importa y registra el service worker en el módulo raíz.
- Actualiza el fichero *index.html*.
  - Añade un enlace al fichero *manifest.json*
  - Añade meta tags para el *theme-color*
  - Instala ficheros con iconos en diferentes tamaños
  - Crea el fichero de configuración ngsw-config.json para configurar el service worker con diferentes estrategias de cacheo y otras cosas. 

Si hacemos ng build --prod de nuestra aplicación, veremos el fichero del service worker.

