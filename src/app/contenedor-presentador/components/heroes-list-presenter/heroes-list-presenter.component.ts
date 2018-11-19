import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from '../../../model/hero';

@Component({
  selector: 'app-heroes-list-presenter',
  templateUrl: './heroes-list-presenter.component.html',
  styleUrls: ['./heroes-list-presenter.component.css']
})
export class HeroesListPresenterComponent implements OnInit {

  @Input() heroes: Hero[];
  @Input() selectedHero: Hero;
  @Output() eventSelectHero: EventEmitter<Hero> = new EventEmitter();
  @Output() eventDeleteHero: EventEmitter<Hero> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  select(hero: Hero) {
    this.eventSelectHero.emit(hero);
  }

  delete(hero: Hero) {
    this.eventDeleteHero.emit(hero);
  }

}
