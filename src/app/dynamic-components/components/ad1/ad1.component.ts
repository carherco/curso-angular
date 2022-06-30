import { AdComponent } from 'src/app/dynamic-components/model/AdComponent';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ad1',
  templateUrl: './ad1.component.html',
  styleUrls: ['./ad1.component.css']
})
export class Ad1Component implements AdComponent {

  data: any
  constructor() { }

  ngOnInit() {
  }

}
