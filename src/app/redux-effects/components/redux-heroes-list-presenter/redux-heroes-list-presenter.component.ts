import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Hero } from 'src/app/model/Hero';

@Component({
  selector: 'app-redux-heroes-list-presenter',
  templateUrl: './redux-heroes-list-presenter.component.html',
  styleUrls: ['./redux-heroes-list-presenter.component.css']
})
export class ReduxHeroesListPresenterComponent implements OnInit {

  @Input() heroes: Hero[] = [];
  @Input() selectedHero!: Hero;
  @Output() onSelect= new EventEmitter<Hero>();
  @Output() onDelete= new EventEmitter<Hero>();

  constructor() { }

  ngOnInit() {
  }

  select(hero: Hero): void {
    this.onSelect.emit(hero);
  }

  delete(hero: Hero): void {
    this.onDelete.emit(hero);
  }

}
