import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/model/Hero';
import { MockHeroeService } from '../../services/mock-heroe.service';


@Component({
  selector: 'exce-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  heroes: Hero[] = [];
  emociones = ['','happy','sad','confused'];

  nuevoHeroe: Hero;
  heroeSeleccionado!: Hero;

  ultimoId = 20;

  constructor(private servicioHeroes: MockHeroeService) {
    this.heroes = this.servicioHeroes.get();
    this.nuevoHeroe = new Hero(this.ultimoId++,'');
  }

  ngOnInit() {
    console.log('ngOnInit de master');
  }

  seleccionarHeroe(heroe: Hero){
    this.heroeSeleccionado = heroe;
  }

  addHeroe(){
    this.heroes.push(this.nuevoHeroe);

    this.nuevoHeroe = new Hero(this.ultimoId++,'');
  }

  deleteHeroe(indiceArray: number){
    this.heroes.splice(indiceArray,1);
  }

  deleteDesdeDetalle(heroe: Hero) {
    console.log('Se quiere eliminar el heroe: '+ heroe.id);
    heroe.name = "Carlos";
  }

}
