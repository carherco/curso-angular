import { Component, OnInit } from '@angular/core';
import { Hero } from '../src/app/model/Hero';
import { MockHeroeService } from '../../../services/mock-heroe.service';

@Component({
  selector: 'app-heroes-container',
  templateUrl: './heroes-container.component.html',
  styleUrls: ['./heroes-container.component.css']
})
export class HeroesContainerComponent {

  heroes: Hero[] = [];
  emotions: string[] = ['','happy','sad','confused'];

  newHero: Hero;
  selectedHero?: Hero;

  constructor(hs: MockHeroeService) {
    this.heroes = hs.get();
    this.newHero = new Hero(21, '');
  }

  add(hero: Hero) {
    this.heroes.push(hero);
    this.newHero = new Hero(22, '');
  }

  select(hero: Hero) {
    this.selectedHero = {...hero};
  }

  update(hero: Hero) {
    //this.heroes.find()
  }

  delete(hero: Hero) {
    //console.log('delete del padre ejecutado', hero);
    this.heroes = this.heroes.filter( function(el) { return el.id != hero.id; } );
    this.selectedHero = null;
    //this.heroes = this.heroes.filter( el => el.id != hero.id );
  }
}
