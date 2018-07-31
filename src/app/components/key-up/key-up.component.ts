import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-key-up',
  template: `
  <input (keyup)="onKey($event)">
  <p>V1: {{value}}</p>

  <input (keyup)="onKeyV2($event)">
  <p>V2: {{value2}}</p>

  <input #box (keyup)="0">
  <p>Template reference variable: {{box.value}}</p>

  <input #box3 (keyup)="onKeyV3(box3.value)">
  <p>V3: {{value3}}</p>

  <input #box4 (keyup.enter)="onEnterV4(box4.value)">
  <p>V4: {{value4}}</p>

  <input #box5
      (keyup.enter)="updateV5(box5.value)"
      (blur)="updateV5(box5.value)">
  <p>V5: {{value5}}</p>

  <!-- mostrar el valor sin pasar por el componente -->
  <input #box6
      (keyup.enter)="value6 = box6.value"
      (blur)="value6 = box6.value">
  <p>V5: {{value6}}</p>
`,
  styleUrls: ['./key-up.component.css']
})
export class KeyUpComponent implements OnInit {

  value = '';
  value2 = '';
  value3 = '';
  value4 = '';
  value5 = '';
  value6 = '';

  constructor() { }

  ngOnInit() {
  }

  onKey(event: any) {
    console.log(event);
    this.value += event.target.value + ' | ';
  }

  /*
  onKey(event: KeyboardEvent) {
    this.values += (<HTMLInputElement>event.target).value + ' | ';
  }
  */

  onKeyV2(event: any) {
    this.value2 += event.key + ' | ';
  }

  onKeyV3(value: string) {
    this.value3 = value;
  }

  onEnterV4(value: string) {
    this.value4 = value;
  }

  updateV5(value: string) {
    this.value5 = value;
  }

}
