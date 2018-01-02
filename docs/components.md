# Components

Un componente controla un trozo de la pantalla llamado *vista* (*view*).

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

La función decoradora @Component recibe un Objeto con las siguientes propiedades:

- **selector:** Selector CSS que le dice a Angular en qué lugar del HTML debe insertar este componente. En nuestro ejemplo, cada vez que angular encuentre la etiqueta &lt;events-list>&lt;/events-list>, insertará una instacia de la vista de EventsListComponent en esa etiqueta.
- **template:** El código HTML del template de este componente.
- **templateUrl:** La ruta relativa al componente del archivo donde se encuenta el HTML del template de este componente. Si se utiliza *templateUrl* NO se utiliza *template*
- **providers:** array de proveedores de inyección de dependecias (dependency injection providers) para servicios que este componente necesite. Es una de las maneras de informar a Angular que el constructor de este componente necesita una instancia de un servicio concreto. No obstante durante el curso utilizaremos inyección de dependencias directamente en los constructores del componente.
- **styles:** array de strings con estilos CSS exclusivos para este componente.
- **styleUrls:** array de ficheros css exclusivos para este componente.

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

Ejercicio: Crear dos componentes distintos e insertarlos dentro de la vista/componente raíz.

Ejercicio: Insertar uno de los componentes dentro del otro.


## CSS en los componentes

Los estilos especificados en los metadatos de un componente, solamente aplican a dicho componente.

Hay varias formas de añadir estilos a un componente:

- Mediante las propiedades styles y/o styleUrls de los metadatos del componente.
- En el propio código HTML del componente.
- Con CSS imports.

### Estilos en la propiedad *styles*

```typescript
@Component({
  selector: 'app-root',
  template: `
    <h1>Tour of Heroes</h1>
    <app-hero-main [hero]="hero"></app-hero-main>
  `,
  styles: ['h1 { font-weight: normal; }','h2 { color: red; }']
})
export class HeroAppComponent {
/* . . . */
}
```

Angular CLI crea la propiedad *styles* vacía si generamos el componente con el modificador *--inline-style*:

> ng generate component hero-app --inline-style

### Estilos en la propiedad *styleUrls*

```typescript
@Component({
  selector: 'app-root',
  template: `
    <h1>Tour of Heroes</h1>
    <app-hero-main [hero]="hero"></app-hero-main>
  `,
  styleUrls: ['./hero-app.component.css']
})
export class HeroAppComponent {
/* . . . */
}
```

Angular CLI crea un fichero .css vacío y una propiedad styleUrls si se crea el componente sin modificador de estilo:

> ng generate component hero-app

Las propiedades styles y styleUrls pueden coexistir en el mismo componente sin ningún problema.

### Template inline styles

```typescript
@Component({
  selector: 'app-hero-controls',
  template: `
    <style>
      button {
        background-color: white;
        border: 1px solid #777;
      }
    </style>
    <h3>Controls</h3>
    <button (click)="activate()">Activate</button>
  `
})
```

o 

```typescript
@Component({
  selector: 'app-hero-team',
  template: `
    <link rel="stylesheet" href="assets/hero-team.component.css">
    <h3>Team</h3>
    <ul>
      <li *ngFor="let member of hero.team">
        {{member}}
      </li>
    </ul>`
})
```

NOTA: El link es relativo al *application root*.

Las CSS indicadas en el HTML NO son exclusivas de este componente.

### CSS @imports

Dentro de un archivo css, se pueden importar otros archivos css mediante la regla @import propia del lenguaje CSS:

```css
@import 'hero-details-box.css';
```

Las CSS importadas mediante la regla @import NO son exclusivas del componente.

### Archivos .scss, .less y .styl

Si el proyecto está configurado para trabajar con .scss, .less o .styl, aplican las mismas normas.

```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
```

En el proceso de compilación, angular compilará las CSS automáticamente.

## View encapsulation

As discussed earlier, component CSS styles are encapsulated into the component's view and don't affect the rest of the application.

To control how this encapsulation happens on a per component basis, you can set the view encapsulation mode in the component metadata. Choose from the following modes:

Native view encapsulation uses the browser's native shadow DOM implementation (see Shadow DOM on the MDN site) to attach a shadow DOM to the component's host element, and then puts the component view inside that shadow DOM. The component's styles are included within the shadow DOM.

Emulated view encapsulation (the default) emulates the behavior of shadow DOM by preprocessing (and renaming) the CSS code to effectively scope the CSS to the component's view. For details, see Appendix 1.

None means that Angular does no view encapsulation. Angular adds the CSS to the global styles. The scoping rules, isolations, and protections discussed earlier don't apply. This is essentially the same as pasting the component's styles into the HTML.

To set the components encapsulation mode, use the encapsulation property in the component metadata:

```typescript
//src/app/quest-summary.component.ts
// warning: few browsers support shadow DOM encapsulation at this time
encapsulation: ViewEncapsulation.Native
```

Native view encapsulation only works on browsers that have native support for shadow DOM (see Shadow DOM v0 on the Can I use site). The support is still limited, which is why Emulated view encapsulation is the default mode and recommended in most cases.


## Inspecting generated CSS
When using emulated view encapsulation, Angular preprocesses all component styles so that they approximate the standard shadow CSS scoping rules.

In the DOM of a running Angular application with emulated view encapsulation enabled, each DOM element has some extra attributes attached to it:

```html
<hero-details _nghost-pmm-5>
  <h2 _ngcontent-pmm-5>Mister Fantastic</h2>
  <hero-team _ngcontent-pmm-5 _nghost-pmm-6>
    <h3 _ngcontent-pmm-6>Team</h3>
  </hero-team>
</hero-detail>
```

There are two kinds of generated attributes:

An element that would be a shadow DOM host in native encapsulation has a generated _nghost attribute. This is typically the case for component host elements.
An element within a component's view has a _ngcontent attribute that identifies to which host's emulated shadow DOM this element belongs.
The exact values of these attributes aren't important. They are automatically generated and you never refer to them in application code. But they are targeted by the generated component styles, which are in the <head> section of the DOM:

content_copy
[_nghost-pmm-5] {
  display: block;
  border: 1px solid black;
}

h3[_ngcontent-pmm-6] {
  background-color: white;
  border: 1px solid #777;
}
These styles are post-processed so that each selector is augmented with _nghost or _ngcontent attribute selectors. These extra selectors enable the scoping rules described in this page.








[Índice](index.md)
