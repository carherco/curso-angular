import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Hero } from '../model/hero';
import { map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroeService {

  private heroesUrl = 'https://jsonplaceholder.typicode.com/users';
  //Url con filtro: https://jsonplaceholder.typicode.com/users?email=Sincere@april.biz
  //private heroesUrl = 'https://reqres.in/users';
  constructor(private http: HttpClient) { }

  get(filter = ''): Observable<any> {
    return this.http.get(this.heroesUrl+'?'+ filter );
  }

  getHeroes(filter = {}): Observable<any> {
    // getHeroes(): Observable<any> {
      return this.http.get(this.heroesUrl + '?' + filter).pipe( retry(1) );
    }
}
