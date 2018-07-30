import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

import { Hero } from './hero';

@Injectable()
export class HeroService {
  private heroesUrl = 'https://jsonplaceholder.typicode.com/users';  // URL to web API
  // https://reqres.in/

  constructor (private http: Http) {}

  getHeroes(filter = {}): Observable<Hero[]> {
  // getHeroes(): Observable<any> {
    return this.http.get(this.heroesUrl + '?' + filter).pipe(
                    retry(1),
                    map((x) => x.json())
    );
  }

}
