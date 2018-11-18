import { Component, OnInit } from '@angular/core';
import { AdComponent } from '../../model/AdComponent';

@Component({
  selector: 'ad3',
  templateUrl: './ad3.component.html',
  styleUrls: ['./ad3.component.css']
})
export class Ad3Component implements AdComponent {
  data: any;

  constructor() { }

  ngOnInit() {
  }

}
