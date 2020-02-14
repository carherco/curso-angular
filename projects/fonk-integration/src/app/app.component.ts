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

  constructor() {
    this.userForm = new FormGroup({
      name: new FormControl('Carlos', [Validators.required({trim: false}), Validators.maxLength({length: 20})]),
      email: new FormControl('carlos@fonk.es', [Validators.required({trim: true}), Validators.email()])
    });

    console.log(this.userForm.valid);
    console.log(this.userForm.get('name').errors);
    console.log(this.userForm.get('email').errors);

    this.userForm.get('name').setValue('Un nombre demasiado largo');
    console.log(this.userForm.valid);
    console.log(this.userForm.get('name').errors);

    this.userForm.get('email').setValue('Un email no valido@fonk');
    console.log(this.userForm.valid);
    console.log(this.userForm.get('email').errors);

    console.log(this.userForm.errors);
  }
}
