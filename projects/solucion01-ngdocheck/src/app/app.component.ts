import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ejercicio01';

  constructor(public auth: AuthService){

  }

  isLogged(): Observable<boolean> {
    return this.auth.isLogged();
  }
}
