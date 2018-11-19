import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Hero } from '../../../model/hero';

@Component({
  selector: 'app-heroes-new-presenter',
  templateUrl: './heroes-new-presenter.component.html',
  styleUrls: ['./heroes-new-presenter.component.css']
})
export class HeroesNewPresenterComponent implements OnInit {

  @Input() hero: Hero;
  @Output() eventAddHero: EventEmitter<Hero> = new EventEmitter();
  emotions: string[] = ['','happy','sad','confused'];
  constructor() { }

  ngOnInit() {
  }

  add() {
    console.log(this.hero);
    this.eventAddHero.emit(this.hero);
  }

}
