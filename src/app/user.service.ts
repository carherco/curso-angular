import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { User } from "app/user";

@Injectable()
export class UserService {

  url_api: string;
  constructor(private http: HttpClient) {
    this.url_api = environment.api_url+'users';
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url_api);
  }

  getOne(id): Observable<any> {
    return this.http.get<User>(this.url_api+'/'+id);
  }

  add(user: User) {
    return this.http.post(this.url_api, user);
  }

  edit(user: User) {
    return this.http.put(this.url_api+'/'+user.id, user);
  }

  delete(id) {
    return this.http.delete(this.url_api+'/'+id);
  }

}
