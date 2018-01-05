import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

  private title = 'Calculadora';

  private varA: number = 4;
  private varB: number = 7;

  constructor() { }

  ngOnInit() {
  }

  suma1(a,b) {
    return a+b;
  }

  suma2() {
    return this.varA + this.varB;
  }

  resta() {
    return this.varA - this.varB;
  }

  incrementaA(){
    this.varA += 1;
  }

  decrementaA(){
    this.varA -= 1;
  }

  incrementaB(){
    this.varB += 1;
  }

  decrementaB(){
    this.varB -= 1;
  }

}
