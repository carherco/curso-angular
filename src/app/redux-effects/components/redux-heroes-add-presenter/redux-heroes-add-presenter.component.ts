import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Hero } from 'src/app/model/Hero';

@Component({
  selector: 'app-redux-heroes-add-presenter',
  templateUrl: './redux-heroes-add-presenter.component.html',
  styleUrls: ['./redux-heroes-add-presenter.component.css']
})
export class ReduxHeroesAddPresenterComponent implements OnInit {

  @Input() hero!: Hero;
  @Output() onAdd = new EventEmitter<Hero>();

  constructor() { }

  ngOnInit() { }

  add() {
    this.onAdd.emit(this.hero);
  }

}
