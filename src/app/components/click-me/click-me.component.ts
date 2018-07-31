import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'click-me',
  template: `
    <h1>{{title}}</h1>

    <div>El héroe se llama {{nombre}}</div>

    <button mat-raised-button color="primary" (click)="onClickMe()">Click me!</button>
    <div>{{clickMessage}}</div>

    <input [(ngModel)]="nombre" />
    `
})
export class ClickMeComponent {
  title = 'Data binding';
  clickMessage = '';
  nombre = 'Carlos';

  constructor() {
    setTimeout(() => {
      console.log('timeout');
      this.nombre = 'Pedro';
    }, 5000);
  }

  onClickMe() {
    this.clickMessage = 'You are my hero!';
  }
}
