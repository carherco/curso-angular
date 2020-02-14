import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from './validators/fonk-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userForm: FormGroup;
  user: {name: string, email: string} = {name: '', email: ''};

  constructor() {
    this.userForm = new FormGroup({
      name: new FormControl(this.user.name, [Validators.required({trim: false}), Validators.maxLength({length: 20})]),
      email: new FormControl(this.user.email, [Validators.required({trim: true}), Validators.email()])
    });

  }
}
