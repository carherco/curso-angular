import { AdService } from './services/ad-service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdDirective } from './directives/ad.directive';
import { Ad1Component } from './components/ad1/ad1.component';
import { Ad2Component } from './components/ad2/ad2.component';
import { Ad3Component } from './components/ad3/ad3.component';
import { Ad4Component } from './components/ad4/ad4.component';
import { AdsLoaderComponent } from './components/ads-loader/ads-loader.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AdDirective,
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
    AdDirective,
    AdsLoaderComponent
  ]
})
export class DynamicComponentsModule { }
