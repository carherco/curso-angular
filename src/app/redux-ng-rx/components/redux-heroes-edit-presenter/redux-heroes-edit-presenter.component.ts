import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from 'app/model/hero';

@Component({
  selector: 'app-redux-heroes-edit-presenter',
  templateUrl: './redux-heroes-edit-presenter.component.html',
  styleUrls: ['./redux-heroes-edit-presenter.component.css']
})
export class ReduxHeroesEditPresenterComponent implements OnInit {

  @Input() hero: Hero;
  @Output() onDeleted = new EventEmitter<Hero>();
  
  constructor() { }

  ngOnInit() { }

  delete() {
    this.onDeleted.emit(this.hero);
  }

}
