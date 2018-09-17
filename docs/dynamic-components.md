# Carga dinámica de componentes


components created with componentFactory must be added to entryComponents: 
angular.io/guide/dynamic-component-loader#resolving-components. Otherwise, 
angular would have no idea what YourComponentType1 actually is. 

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
