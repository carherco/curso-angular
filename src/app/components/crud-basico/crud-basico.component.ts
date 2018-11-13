import { Component, OnInit } from '@angular/core';
import { HEROES } from '../../data/mock-heroes';
import { Hero } from '../../model/hero';

@Component({
  selector: 'app-crud-basico',
  templateUrl: './crud-basico.component.html',
  styleUrls: ['./crud-basico.component.css']
})
export class CrudBasicoComponent implements OnInit {

  title = 'CRUD BÁSICO';
  heroes = HEROES;
  emotions = ['','happy','sad','confused'];
  lastId = 20;
  hide_sad: boolean = false;
  newHero: Hero;
  selectedHero: Hero;

  constructor() {
    this.newHero = {
      id: this.lastId + 1,
      name: ''
    };
  }

  ngOnInit() {
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  add(): void {
    console.log(this.newHero);
    this.heroes.push(this.newHero);
    this.lastId = this.lastId +1;
    this.resetNewHero();
  }

  resetNewHero() {
    this.newHero = {
      id: this.lastId + 1,
      name: ''
    };
  }

  /**
   * Función delete recibiendo el índice del héroe que se quiere eliminar
   * @param index
   */
  delete(index) {
    this.heroes.splice(index, 1);
  }

  /**
   * Función delete recibiendo el héroe que se quiere eliminar
   * @param heroe
   */
  delete2(heroe: Hero) {
    // let nuevoArray = [];
    // for (let h of this.heroes) {
    //   if(h.id !== heroe.id) {
    //     nuevoArray.push(h);
    //   }
    // }
    // this.heroes = nuevoArray;

    this.heroes = this.heroes.filter(function(el) { return el.id != heroe.id; });
    this.heroes = this.heroes.filter( el => el.id != heroe.id );
  }

}
