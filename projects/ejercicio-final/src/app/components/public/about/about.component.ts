import { Component, OnInit } from '@angular/core';
import { Autor } from '../../../model/autor';


@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public autor: Autor;

  constructor() {
    this.autor = {
      nombre: 'Carlos',
      apellido: 'Herrera',
      edad: 37
    }
   }

  ngOnInit() {
  }

}
