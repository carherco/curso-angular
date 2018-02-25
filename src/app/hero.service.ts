import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';

import { Hero } from './hero';

@Injectable()
export class HeroService {
  private heroesUrl = 'https://jsonplaceholder.typicode.com/users';  // URL to web API
  // https://reqres.in/

  constructor (private http: Http) {}

  getHeroes(filter = {}): Observable<Hero[]> {
  // getHeroes(): Observable<any> {
    return this.http.get(this.heroesUrl + '?' + filter).retry(1)
                    .map((x) => x.json());
  }

}
