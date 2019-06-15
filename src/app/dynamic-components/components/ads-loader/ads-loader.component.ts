import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
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
  //@ViewChild('adhost') adHost: ElementRef; // Si adhost está aplicada a un elemento HTML, sería un ElementRef
  //@ViewChild('adhost') adHost: XXXXXComponent; // Si adhost está aplicada a un componente, sería la instancia del componente
  //@ViewChild('adhost', {read: ElementRef}) adHost: AdDirective; // Si adhost está aplicada a un componente, sería un ElementRef
  //@ViewChild(AdDirective) adHost: AdDirective; // Es la instancia de la directiva
  @ViewChild('adhost', {read: ViewContainerRef, static: false}) viewContainerRef: ViewContainerRef;
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
