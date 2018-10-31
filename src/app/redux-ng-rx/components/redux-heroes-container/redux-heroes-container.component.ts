import { Component, OnInit } from '@angular/core';
import { HEROES } from 'app/data/mock-heroes';
import { Hero } from 'app/model/hero';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HeroState } from '../../reducers/hero.store';
import { LoadHeroes, DeleteHero, AddHero } from '../../reducers/hero.actions';
import { Store } from '@ngrx/store';
import { State } from './../../reducers/index';

@Component({
  selector: 'app-redux-ngrx-heroes-container',
  templateUrl: './redux-heroes-container.component.html',
  styleUrls: ['./redux-heroes-container.component.css']
})
export class ReduxNgrxHeroesContainerComponent implements OnInit {

  heroes$: Observable<any>;
  heroes: Hero[] = [];
  lastId = 20;
  newHero: Hero;
  selectedHero: Hero;

  constructor(private store: Store<State>) {
    this.newHero = {
      id: this.lastId + 1,
      name: ''
    };
  }

  ngOnInit() {
    this.heroes$ = this.store.select('hero');
    //this.heroes$ = this.store.select('hero', 'items')

    this.heroes$.subscribe( (state: HeroState) => {
      this.heroes = state.items;
      this.lastId = state.lastId;
    });

    this.store.dispatch(new LoadHeroes(HEROES));
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  add(newHero): void {
    //console.log(newHero);
    //this.heroes.push(newHero);
    this.store.dispatch(new AddHero(newHero));
    //this.lastId = this.lastId +1;
    this.resetNewHero();
  }

  resetNewHero() {
    this.newHero = {
      id: this.lastId + 1,
      name: ''
    };
  }

  delete(hero: Hero) {
    //this.heroes = this.heroes.filter(function(el) { return el.id != hero.id; });
    this.store.dispatch(new DeleteHero(hero));
  }

  onDelete(hero: Hero) {
    //console.log('List component wants to delete the item ' + hero.id);
    //this.heroes = this.heroes.filter(function(el) { return el.id != hero.id; });
    this.store.dispatch(new DeleteHero(hero));
  }
}
