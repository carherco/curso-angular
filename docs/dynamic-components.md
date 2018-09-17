# Carga dinámica de componentes

En este tema veremos cómo utilizar **ComponentFactoryResolver** para añadir componentes a una vista dinámicamente.

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
  imports: [ BrowserModule ],
  providers: [AdService],
  declarations: [ AppComponent,
                  AdBannerComponent,
                  HeroJobAdComponent,
                  HeroProfileComponent,
                  AdDirective ],
  entryComponents: [ HeroJobAdComponent, HeroProfileComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor() {}
}
```

## Paso 1: Crear una directiva para indicar dónde cargar los componentes:

```ts
//src/app/ad.directive.ts
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ad-host]',
})
export class AdDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
```

Esta directiva tiene acceso al *view container* del elemento al que se aplique.

## Paso 2: Incluir la directiva en algún html

En src/app/ad-banner.component.html:

```html
<div class="ad-banner">
  <h3>Advertisements</h3>
  <ng-template ad-host></ng-template>
</div>
```

El elemento &lt;ng-template> es una buena elección para componentes dinámicos porque no renderiza nada por sí mismo.

## Paso 3: Programar la carga dinámica

```ts
//src/app/ad-banner.component.ts
export class AdBannerComponent implements OnInit, OnDestroy {
  @Input() ads: AdItem[];
  currentAdIndex = -1;
  @ViewChild(AdDirective) adHost: AdDirective;
  interval: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
    this.getAds();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    let adItem = this.ads[this.currentAdIndex];

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

    let viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }

  getAds() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 3000);
  }
}
```

Este componente, cada 3 segundos, selecciona un componente y utiliza el servicio **ComponentFactoryResolver** para resolver un **ComponentFactory** por cada componente específico. El ComponentFactory entonces crea una instancia de cada componente.

Obtenemos una referencia al **viewContainerRef** gracias al conocido decorador @ViewChild y llamamos al método **createComponent()**.

El método createComponent() devuelve una referencia al componente recién cargado. Gracias a esa referencia, podemos acceder a las propiedades y métodos del componente.


## Consejo

Si hacemos que los componentes cargados dinámicamente cumplan un Interface, nos aseguramos que todos ellos tengan las propiedades y/o métodos que necesitemos.
