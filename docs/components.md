# Components

Un componente controla un trozo de la pantalla llamado *vista* (*view*)

Por ejemplo, en un momento concreto, en el navegador:

- El componente raíz habría dibujado los links de navegación o menú de la aplicación.

- Otro componente podría estar dibujando un listado ordenado y paginado de elementos de nuestro negocio.

- Otro compenente habría pintado un calendario del mes actual en el que están resaltados los días en los que el usuario tiene algún evento.

Angular crea, actualiza y destryue componentes mientras el usuario se mueve por la aplicación.


Ejemplo de componente:

```typescript
@Component({
  selector:    'events-list',
  templateUrl: './events-list.component.html',
  providers:  [ EventsService ]
})
export class EventsListComponent implements OnInit {
/* . . . */
}
```

Un componente es una clase que implementa el método OnInit y decorada con el decorador @Component.

La función decorador @Component recibe un Objeto con las siguientes propiedades:

- **selector:** Selector CSS que le dice a Angular en qué lugar del HTML debe insertar este componente. En nuestro ejemplo, cada vez que angular encuentre la etiqueta &lt;events-list>&lt;/events-list>, insertará una instacia de la vista de EventsListComponent en esa etiqueta.
- **template:** El código HTML del template de este componente.
- **templateUrl:** La ruta relativa al componente del archivo donde se encuenta el HTML del template de este componente. Si se utiliza *templateUrl* NO se utiliza *template*
- **providers:** array de proveedores de inyección de dependecias (dependency injection providers) para servicios que este componente necesite. Es una manera de informar a Angular que el constructor de este componente necestia una instacia de EventsService

El template, los metadatos y el compenente, en conjunto, describen una **vista**.

## Creación de un componente con angular cli

```
ng generate component nombre-componente
```

o bien 

```
ng g c nombre-componente
```

```
installing component
  create src/app/nombre-componente/nombre-componente.component.css
  create src/app/nombre-componente/nombre-componente.component.html
  create src/app/nombre-componente/nombre-componente.component.spec.ts
  create src/app/nombre-componente/nombre-componente.component.ts
  update src/app/app.module.ts
```
