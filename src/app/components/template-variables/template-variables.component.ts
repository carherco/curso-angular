import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'exce-template-variables',
  template: `
      <input (keyup)="onKeyUp($any($event.target).value)" >
      <p>{{ value }}</p>

      <input (keyup)="onKeyUp(valor.value)" #valor >
      <p>{{ value }}</p>

      <input (keyup)="0" #valor2 >
      <p>{{ valor2.value }}</p>

      <input (keyup.enter)="0" #valor3 >
      <p>{{ valor3.value }}</p>
  `,
  styleUrls: ['./template-variables.component.css']
})
export class TemplateVariablesComponent implements OnInit {

  value: string = '';
  constructor() { }

  ngOnInit() {
  }

  onKeyUp(valor: string) {
    this.value = valor;
  }

}
