import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'impure-pipe',
  templateUrl: './impure-pipe.component.html',
  styleUrls: ['./impure-pipe.component.css']
})
export class ImpurePipeComponent implements OnInit {

  base = 4;
  exponente = 2;
  otroNumero = 5;

  dataArray = [
    {id: 1, name: 'Carlos', age: 35},
    {id: 2, name: 'Carmen', age: 17},
    {id: 3, name: 'Carolina', age: 25}
  ]

  constructor() { }

  ngOnInit() {
  }

  aumentaBase() {
    this.base += 1;
  }

  aumentaExponente() {
    this.exponente += 1;
  }

  aumentaOtro() {
    this.otroNumero += 1;
  }

  addPerson() {
    this.dataArray.push({id: 4, name: 'Jose', age: 59});
  }

}
