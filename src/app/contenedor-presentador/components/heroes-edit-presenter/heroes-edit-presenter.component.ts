import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from '../../../model/hero';

@Component({
  selector: 'app-heroes-edit-presenter',
  templateUrl: './heroes-edit-presenter.component.html',
  styleUrls: ['./heroes-edit-presenter.component.css']
})
export class HeroesEditPresenterComponent {

  @Input() hero: Hero;
  @Output() eventDelete = new EventEmitter<Hero>();
  @Output() eventUpdate = new EventEmitter<Hero>();
  emotions: string[] = ['','happy','sad','confused'];

  constructor() {
  }

  delete() {
    console.log(this.hero);
    this.eventDelete.emit(this.hero);
  }

  update() {
    this.eventUpdate.emit(this.hero);
  }


}
