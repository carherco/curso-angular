import { Component, OnInit } from '@angular/core';
import { Hero } from "app/hero";
import { HEROES } from "app/mock-heroes";

@Component({
  selector: 'app-crud-basico',
  templateUrl: './crud-basico.component.html',
  styleUrls: ['./crud-basico.component.css']
})
export class CrudBasicoComponent implements OnInit {

  title = 'CRUD BÁSICO';
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

}
