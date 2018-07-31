import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { retry } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  private url = environment.api_url;

  constructor(private http: HttpClient) { }

  get(filter = ''): Observable<any> {
    return this.http.get(this.url+'?'+ filter ).pipe(retry(3));
  }
}
