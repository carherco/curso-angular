import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from "@angular/core";
import { Hero } from 'src/app/model/Hero';

@Component({
  selector: 'exce-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() heroe!: Hero;
  emociones = ['','happy','sad','confused'];
  @Output() onEliminarEvento: EventEmitter<Hero> = new EventEmitter<Hero>();

  constructor() { }

  ngOnInit() {
  }

  eliminar() {
    this.onEliminarEvento.emit(this.heroe);
  }

}
