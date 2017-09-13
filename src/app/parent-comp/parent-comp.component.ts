import { Component, OnInit } from '@angular/core';
import { Hero } from "app/hero";
import { HEROES } from "app/mock-heroes";

@Component({
  selector: 'app-parent-comp',
  templateUrl: './parent-comp.component.html',
  styleUrls: ['./parent-comp.component.css']
})
export class ParentCompComponent implements OnInit {
  title = 'Paso de datos entre componentes';
  heroes = HEROES;
  lastId = 20;
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
    this.heroes.slice(index, 1);
  }

  onDeleted(hero: Hero) {
    console.log('El child component quiere eliminar el item ' + hero.id);
  }
}
