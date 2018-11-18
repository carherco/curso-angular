import { Component, OnInit } from '@angular/core';
import { AdComponent } from '../../model/AdComponent';

@Component({
  selector: 'ad4',
  templateUrl: './ad4.component.html',
  styleUrls: ['./ad4.component.css']
})
export class Ad4Component implements AdComponent {
  data: any;

  constructor() { }

  ngOnInit() {
  }

}
