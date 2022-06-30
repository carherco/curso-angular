import { User } from 'src/app/model/TypicodeUser';
import { Component } from '@angular/core';
import { USERS } from 'src/app/data/users';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  states = ['CA', 'MD', 'OH', 'VA'];
  user: User = USERS[0];

  constructor() { }

  onSubmit() {
    //Hacer lo que sea
  }
}
