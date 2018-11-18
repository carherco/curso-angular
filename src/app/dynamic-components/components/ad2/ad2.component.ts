import { Component, OnInit } from '@angular/core';
import { AdComponent } from '../../model/AdComponent';

@Component({
  selector: 'ad2',
  templateUrl: './ad2.component.html',
  styleUrls: ['./ad2.component.css']
})
export class Ad2Component implements AdComponent {
  data: any;

  constructor() { }

  ngOnInit() {
  }

}
