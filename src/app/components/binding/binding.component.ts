import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'exce-binding',
  template: `
    <p>El héroe se llama {{ nombre }}</p>

    <input [(ngModel)]="nombre" />
    <div>{{ mensaje }}</div>

    <button (click)="escribirMensaje()">Haz click</button>

  `,
  styleUrls: ['./binding.component.css']
})
export class BindingComponent implements OnInit {

  nombre: String;
  mensaje: String = '';
  colorresaltado = "red";
  dato: Number = 3;

  constructor() {
    this.nombre = "Batman";

    let that = this;
    setTimeout(function(){
      that.nombre = 'Superman';
    }, 5000);
  }

  ngOnInit() {
  }

  escribirMensaje() {
    this.mensaje = "Binding de evento!!!!";
  }

}
