import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthenticationService } from 'app/authentication.service';
import { User } from 'app/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService {
  private url = 'https://reqres.in/api/';

    constructor(private http: Http) {
    }

    getAll(): Observable<User[]> {
        // get users from api
        return this.http.get(this.url + 'users')
            .map((response: Response) => response.json().data);
    }

    getUsers() {
      return this.getAll();
    }
}
