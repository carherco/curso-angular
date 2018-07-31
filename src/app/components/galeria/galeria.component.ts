import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'exce-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {

  title = 'Galeria';
  imagenes = [
    'https://mmtstock.com/wp-content/uploads/2017/09/P7040338.jpg',
    'https://mmtstock.com/wp-content/uploads/2017/09/P6290012.jpg',
    'https://mmtstock.com/wp-content/uploads/2015/08/IMG_0903150810.jpg',
    'https://mmtstock.com/wp-content/uploads/2017/12/P8310900.jpg',
    'https://mmtstock.com/wp-content/uploads/2017/12/P8310865.jpg',
    'https://mmtstock.com/wp-content/uploads/2017/12/P6290042.jpg',
    'https://mmtstock.com/wp-content/uploads/2017/11/P9031121.jpg',
    'https://mmtstock.com/wp-content/uploads/2018/02/P7041396.jpg'
  ];
  imagenActual: String;
  indice = 0;

  ini:number = 0;
  fin:number = 3;
  num:number = 3;

  tamano = 300;
  interval: any;

  constructor() {
    this.imagenActual = this.imagenes[this.indice];
  }

  ngOnInit() {
  }

  anteriorImagen(){
    this.indice--;
    this.imagenActual = this.imagenes[this.indice];
  }

  siguienteImagen(){
    this.indice++;
    this.imagenActual = this.imagenes[this.indice];
  }

  seleccionarImagen(i){
    this.indice = i;
    this.imagenActual = this.imagenes[this.indice];
  }

  siguienteGrupo() {
    this.ini += this.num;
    this.fin += this.num;
  }

  play(){
    let that = this;

    this.interval = setInterval(function(){
      that.indice += 1;
      if(that.indice >= that.imagenes.length){
        that.indice = 0;
      }
      that.imagenActual = that.imagenes[that.indice];
    },1000);
  }

  stop() {
    clearInterval(this.interval);
  }



}
