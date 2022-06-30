import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { tap, map, filter, switchMap, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { HeroeService } from '../../services/heroe.service';
import { Hero } from 'src/app/model/Hero';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';


@Component({
  selector: 'app-animation-search',
  templateUrl: './animation-search.component.html',
  styleUrls: ['./animation-search.component.css'],
  animations: [
    trigger('filterAnimation', [
      transition(':enter, * => -1', []),
      transition(':increment', [
        query(':enter', [
          style({ opacity: 0, width: '0px' }),
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 1, width: '*' })),
          ]),
        ], { optional: true })
      ]),
      transition(':decrement', [
        query(':leave', [
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 0, width: '0px' })),
          ]),
        ])
      ]),
    ]),
  ]
})
export class AnimationSearchComponent implements OnInit {

  errorMessage: string = '';
  heroes: Hero[] = [];

  @ViewChild('email', {static: true}) email!: ElementRef;

  heroTotal = -1;

  constructor (private heroService: HeroeService) {
    this.getHeroes().subscribe(
      heroes => {this.heroes = heroes; this.heroTotal = this.heroes.length;}
    );
  }

  ngOnInit() {
    fromEvent(this.email.nativeElement, 'keyup').
      pipe(
       //.do(x => console.log('Elemento original:', x)),
       map((x: any) => x.target.value),
       //.do(x => console.log('Después de .map((x: any) => x.target.value):', x)),
       filter(x => x.length > 3 || x.length == 0),
       tap(x => console.log('Después de .filter(x => x.length > 3)', x)),
       debounceTime(500),
       tap(x => console.log('Después de .debounceTime(500)', x)),
       distinctUntilChanged(),
       tap(x => console.log('Después de .distinctUntilChanged()', x)),
       switchMap((x) => this.getHeroes(x))
       //.do(x => console.log('Después de .switchMap((x) => this.getHeroes(x))', x))
      )
      .subscribe(heroes => {this.heroes = heroes; this.heroTotal = this.heroes.length;},
                  error =>  this.errorMessage = <any>error
      )

      // http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-switchMap
  }

  getHeroes(email?: string) {
    let filter = '';
    if(email) {
      filter = 'email=' + email;
    }
    // console.log(filter);
    return this.heroService.getHeroes(filter);
  }

}
