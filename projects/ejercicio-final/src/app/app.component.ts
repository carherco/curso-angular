import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ejercicio-final';

  constructor(public auth: AuthService){

  }

  isLogged(): Observable<boolean> {
    return this.auth.isLogged();
  }
}
