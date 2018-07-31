import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { Hero } from '../model/hero';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class HeroService {
  private heroesUrl = 'https://jsonplaceholder.typicode.com/users';  // URL to web API
  // https://reqres.in/
  constructor (private http: HttpClient) {}

  getHeroes(filter = {}): Observable<any> {
  // getHeroes(): Observable<any> {
    return this.http.get(this.heroesUrl + '?' + filter).pipe(
                    retry(1)
    );
  }

}
