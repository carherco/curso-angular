import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { AdDirective } from 'app/dynamic-components/directives/ad.directive';
import { AdItem } from 'app/dynamic-components/model/AdItem';
import { AdService } from 'app/dynamic-components/services/ad-service';

@Component({
  selector: 'dynamic-components-example',
  templateUrl: './dynamic-components-example.component.html',
  styleUrls: ['./dynamic-components-example.component.css']
})
export class DynamicComponentsExampleComponent implements OnInit {

  ads: AdItem[];

  constructor(private adService: AdService) {}

  ngOnInit() {
    this.ads = this.adService.getAds();
  }
}
