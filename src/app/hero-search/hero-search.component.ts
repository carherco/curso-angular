import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Hero } from 'app/hero';
import { HeroService } from 'app/hero.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  errorMessage: string;
  heroes: Hero[];
  mode = 'Observable';

  @ViewChild('search') search: ElementRef;

  constructor (private heroService: HeroService) {
    this.getHeroes();
  }

  ngOnInit() {
    Observable.fromEvent(this.search.nativeElement, 'keyup')
      .map((x: any) => x.target.value)
      .filter(x => x.length > 3)
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap((x) => this.getHeroes(x))
      //.subscribe(x => console.log(x));
      .subscribe(heroes => this.heroes = heroes,
                 error =>  this.errorMessage = <any>error);

      // http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-switchMap
  }

  getHeroes(filter?: string) {
    console.log(filter);
    return this.heroService.getHeroes(filter);
  }

}
