import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'exce-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {

  negrita: boolean;
  colortexto: string;

  constructor() { 
    this.negrita = true;
    this.colortexto = "#457698";
  }

  ngOnInit() {
  }

  suma(a,b) {
    return a+b;
  }

}
