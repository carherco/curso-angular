# SCHEMAS

Una propiedad de los metadatos de NgModule es **schemas**

En esta propiedad se define el conjunto de *schemas* que declaran elementos permitidos en el HTML del NgModule. 

Elementos y propiedades que no sean Directivas, Componentes, deberían ser declarados en un schema. 

Los valores permitidos son **NO_ERRORS_SCHEMA** y **CUSTOM_ELEMENTS_SCHEMA**. 

NO_ERRORS_SCHEMA es útil para testear componentes que dependen de otros.

CUSTOM_ELEMENTS_SCHEMA es útil para incluir **Web Components** en nuestras plantillas de Angular.


## CUSTOM_ELEMENTS_SCHEMA

Si para testear un componente necesitamos incluir otro componente pero no queremos hacer un mock del segundo componente porque realmente no necesitamos su funcionalidad sino, por ejemplo, contar que el componente padre ha incluído exactamente X veces al componente hijo, el schema NO_ERRORS_SCHEMA hace que no salte error al comilar el módulo de test con una etiqueta desconocida:

```ts
import {NO_ERRORS_SCHEMA} from '@angular/core';

TestBed.configureTestingModule({
  schemas: [NO_ERRORS_SCHEMA]
  // ...
});
```


## CUSTOM_ELEMENTS_SCHEMA

Imaginemos que tenemos un *Web Component* que convierte este elemento HTML en un bloque HTML de varias líneas y personalizado según los valores de los atributos: 

```html
<fancy-counter min="2" value="5" max="30" step="3"></fancy-counter>
```

Declarando shcema de tipo CUSTOM_ELEMENTS_SCHEMA en nuestro módulo de la siguente forma:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import '../../components/fancy-counter';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Podríamos incluir nuestro fancy-counter en cualquier componente:

```html
<label for="min">Min value:</label>
<input id="min" type="number" [(ngModel)]="settings.min">

<label for="max">Max value:</label>
<input id="max" type="number" [(ngModel)]="settings.max">

<label for="step">Step value:</label>
<input id="step" type="number" [(ngModel)]="settings.step">


<fancy-counter
  [min]="settings.min"
  [max]="settings.max"
  [step]="settings.step">
</fancy-counter>
```

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  msg: string;

  settings = {
    min: 0,
    max: 10,
    step: 1
  };
}
```

De esta forma es muy sencillo incorporar Web Components en Angular.

Web Components: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
