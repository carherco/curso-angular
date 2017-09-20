import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {
    public token: string;

    constructor(private http: Http) {
        // set token if saved in local storage
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // this.token = currentUser.token;
        this.token = 'adfasdasdfads';
    }

    login(username: string, password: string): Observable<boolean> {
      if (username === 'test' && password === 'test') {
        return Observable.of(true).delay(1000).do(val => this.token = 'savaosals09245valsfjga');
      } else {
        return Observable.of(false).delay(1000).do(val => this.token = null);
      }

    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}
