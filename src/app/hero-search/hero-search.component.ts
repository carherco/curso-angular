import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Hero } from 'app/hero';
import { HeroService } from 'app/hero.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  errorMessage: string;
  heroes: Hero[];

  @ViewChild('email') email: ElementRef;

  constructor (private heroService: HeroService) {
    this.getHeroes();
  }

  ngOnInit() {
    Observable.fromEvent(this.email.nativeElement, 'keyup')
       .do(x => console.log('Elemento original:', x))
       .map((x: any) => x.target.value)
       .do(x => console.log('Después de .map((x: any) => x.target.value):', x))
       .filter(x => x.length > 3)
       .do(x => console.log('Después de .filter(x => x.length > 3)', x))
       .debounceTime(500)
       .do(x => console.log('Después de .debounceTime(500)', x))
       .distinctUntilChanged()
       .do(x => console.log('Después de .distinctUntilChanged()', x))
       .switchMap((x) => this.getHeroes(x))
       .do(x => console.log('Después de .switchMap((x) => this.getHeroes(x))', x))
       .subscribe(heroes => this.heroes = heroes,
                  error =>  this.errorMessage = <any>error);

      // http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-switchMap
  }

  getHeroes(email?: string) {
    const filter = 'email=' + email;
    // console.log(filter);
    return this.heroService.getHeroes(filter);
  }

}
