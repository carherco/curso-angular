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
    this.resetNewHero();
    this.lastId = this.lastId +1;
  }

  resetNewHero() {
    this.newHero = {
      id: this.lastId + 1,
      name: ''
    };
  }

  delete(index) {
    this.heroes.splice(index, 1);

    // let nuevoArray = [];
    // for (let h of this.heroes) {
    //   if(h.id !== heroe.id) {
    //     nuevoArray.push(h);
    //   }
    // }
    // this.heroes = nuevoArray;
  }

}
