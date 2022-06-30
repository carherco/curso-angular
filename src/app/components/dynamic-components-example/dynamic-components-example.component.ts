import { Component, OnInit } from '@angular/core';
import { AdItem } from 'src/app/dynamic-components/model/AdItem';
import { AdService } from 'src/app/dynamic-components/services/ad-service';

@Component({
  selector: 'dynamic-components-example',
  templateUrl: './dynamic-components-example.component.html',
  styleUrls: ['./dynamic-components-example.component.css']
})
export class DynamicComponentsExampleComponent implements OnInit {

  ads: AdItem[] = [];

  constructor(private adService: AdService) {}

  ngOnInit() {
    this.ads = this.adService.getAds();
  }
}
