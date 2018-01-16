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
    'https://mmtstock.com/wp-content/uploads/2015/08/IMG_0903150810.jpg',
    'https://mmtstock.com/wp-content/uploads/2017/12/P8310900.jpg',
    'https://mmtstock.com/wp-content/uploads/2017/12/P8310865.jpg',
    'https://mmtstock.com/wp-content/uploads/2017/12/P6290042.jpg',
    'https://mmtstock.com/wp-content/uploads/2017/11/P9031121.jpg'
  ];

  title = "Galería";
  index: number;
  imagenActual: string;
  tamano:number;
  paginator_ini: number = 0;
  paginator_fin: number = 3;
  paginator_num: number = 3;

  constructor() {
    this.imagenActual = this.imagenes[0];
    this.index = 0;
    this.tamano = 400;
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

  select(i) {
    this.index = i;
    this.imagenActual = this.imagenes[this.index];
  }


}
