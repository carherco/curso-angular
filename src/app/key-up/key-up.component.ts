import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-key-up',
  template: `
  <input (keyup)="onKey($event)">
  <p>{{values}}</p>

  <input (keyup)="onKeyV2($event)">
  <p>{{values2}}</p>

  <input #box (keyup)="onKeyV3(box.value)">
  <p>{{values3}}</p>
`,
  styleUrls: ['./key-up.component.css']
})
export class KeyUpComponent implements OnInit {

  values = '';
  values2 = '';
  values3 = '';

  constructor() { }

  ngOnInit() {
  }

  onKey(event: any) { // without type info
    this.values += event.target.value + ' | ';
  }

  onKeyV2(event: any) { // without type info
    this.values2 += event.key + ' | ';
  }

  onKeyV3(value: string) { // without type info
    this.values3 = value + ' | ';
  }

}
