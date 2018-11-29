# Carga dinámica de componentes

En este tema veremos cómo utilizar **ComponentFactoryResolver** para añadir componentes a una vista dinámicamente.

## Elementos previos

### Los anuncios

```
ng g c components/ad1
ng g c components/ad2
ng g c components/ad3
ng g c components/ad4
```

```typescript
export class Ad1Component implements AdComponent {

  data: any
  constructor() { }

  ngOnInit() {
  }

}
```

```html
<h2>{{data.headline}}</h2>
<div>{{data.body}}</div>
```

```typescript
import { Type } from '@angular/core';

export class AdItem {
  constructor(public component: Type<any>, public data: any) {}
}
```

### El servicio

```typescript
@Injectable()
export class AdService {
  getAds() {
    return [
      new AdItem(Ad1Component, {headline: 'Bombasto', body: 'Brave as they come'}),

      new AdItem(Ad2Component, {headline: 'Dr IQ', body: 'Smart as they come'}),

      new AdItem(Ad3Component,   {headline: 'Hiring for several positions',
                                        body: 'Submit your resume today!'}),

      new AdItem(Ad4Component,   {headline: 'Openings in all departments',
                                        body: 'Apply today'}),
    ];
  }
}
```

## EntryComponents

Lo primero de todo es que hay que declarar los componentes dinámicos en la propiedad **entryComponents** de los metadatos del decoraddor *@NgModule* de nuestro módulo.



```typescript
import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { AppComponent }         from './app.component';
import { HeroJobAdComponent }   from './hero-job-ad.component';
import { AdBannerComponent }    from './ad-banner.component';
import { HeroProfileComponent } from './hero-profile.component';
import { AdDirective }          from './ad.directive';
import { AdService }            from './ad.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AdsLoaderComponent,
    Ad1Component,
    Ad2Component,
    Ad3Component,
    Ad4Component,
  ],
  entryComponents: [
    Ad1Component,
    Ad2Component,
    Ad3Component,
    Ad4Component
  ],
  providers: [
    AdService
  ],
  exports: [
    AdsLoaderComponent
  ]
})
export class DynamicComponentsModule {
  constructor() {}
}
```

## Paso 1: Incluir ng-template con una template variable

En src/app/ad-banner.component.html:

```html
<div class="ad-banner">
  <h3>Advertisements</h3>
  <ng-template #adhost></ng-template>
</div>
```

El elemento &lt;ng-template> es una buena elección para componentes dinámicos porque no renderiza nada por sí mismo.

## Paso 2: Programar la carga dinámica

```ts
//src/app/ad-banner.component.ts
export class AdsLoaderComponent implements OnInit {

  @Input() ads: AdItem[];
  currentAdIndex = -1;
  @ViewChild('adhost', {read: ViewContainerRef}) viewContainerRef: ViewContainerRef;
  interval: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
    this.getAd();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    let adItem = this.ads[this.currentAdIndex];

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

    this.viewContainerRef.clear();

    let componentRef = this.viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }

  getAd() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 3000);
  }
}
```

Este componente, cada 3 segundos, selecciona un componente y utiliza el servicio **ComponentFactoryResolver** para resolver un **ComponentFactory** por cada componente específico. El ComponentFactory entonces crea una instancia de cada componente.

Obtenemos una referencia al **viewContainerRef** gracias al conocido decorador @ViewChild y llamamos al método **createComponent()**.

https://angular.io/api/core/ViewChild

https://angular.io/api/core/ViewContainerRef

El método createComponent() devuelve una referencia al componente recién cargado. Gracias a esa referencia, podemos acceder a las propiedades y métodos del componente.


## Consejo

Si hacemos que los componentes cargados dinámicamente cumplan un Interface, nos aseguramos que todos ellos tengan las propiedades y/o métodos que necesitemos.

```typescript
export interface AdComponent {
  data: any;
}
```
