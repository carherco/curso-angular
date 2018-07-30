import { Injectable } from '@angular/core';
import { Hero } from 'app/hero';
import { HEROES } from 'app/mock-heroes';
import { Observable } from 'rxjs';

@Injectable()
export class MockHeroService {

  constructor() { }

  getHeroes(): Hero[] {
    return HEROES;
  }

  /*
  getHeroes(): Promise<Hero[]> {
    return Promise.resolve(HEROES);
  }
  */

  /*
  getHeroes(): Observable<Hero[]> {
    return Observable.create(function (observer) {
      observer.next(HEROES);
      observer.complete();
    });
  }
  */

}
