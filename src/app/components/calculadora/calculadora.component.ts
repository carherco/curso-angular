import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

  title = 'Calculadora';

  varA: number;
  varB: number;
  resultado: number;

  constructor() { }

  ngOnInit() {
  }

  suma() {
    this.resultado = this.varA + this.varB;
  }

  resta() {
    this.resultado = this.varA - this.varB;
  }

  multiplica() {
    this.resultado = this.varA * this.varB;
  }

  divide() {
    if(this.varB !== 0) {
      this.resultado = this.varA / this.varB;
    }
  }

}
