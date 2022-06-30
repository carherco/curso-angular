import { Component, OnInit } from '@angular/core';
import { Autor } from 'src/app/model/autor';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public miAutor: Autor;

  constructor() {
    this.miAutor = {
      nombre: 'Carlos',
      apellido: 'Herrera',
      edad: 37
    }
   }

  ngOnInit() {
  }

  nombreCompleto() {
    return this.miAutor.nombre + ' ' + this.miAutor.apellido;
  }

  alertaNombre(nombre: string) {
    console.log('Nombre: ' + nombre);
  }

}
