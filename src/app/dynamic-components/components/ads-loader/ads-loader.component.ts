import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { AdDirective } from 'app/dynamic-components/directives/ad.directive';
import { AdItem } from 'app/dynamic-components/model/AdItem';
import { AdComponent } from 'app/dynamic-components/model/AdComponent';

@Component({
  selector: 'ads-loader',
  templateUrl: './ads-loader.component.html',
  styleUrls: ['./ads-loader.component.css']
})
export class AdsLoaderComponent implements OnInit {

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
