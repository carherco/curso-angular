import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {

  imagenes = [
    'https://mmtstock.com/wp-content/uploads/2017/09/P7040338.jpg',
    'https://mmtstock.com/wp-content/uploads/2017/09/P6290012.jpg',
    'https://mmtstock.com/wp-content/uploads/2015/08/IMG_0903150810.jpg'
  ];

  index: number;
  imagenActual: string;

  constructor() {
    this.imagenActual = this.imagenes[0];
    this.index = 0;
   }

  ngOnInit() {
  }

  next() {
    this.index += 1;
    this.imagenActual = this.imagenes[this.index];
  }

  prev() {
    this.index -= 1;
    this.imagenActual = this.imagenes[this.index];
  }


}
