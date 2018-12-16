import { Component, OnInit } from '@angular/core';
import { USERS } from 'app/data/users';
import { User } from 'app/model/TypicodeUser';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'user-form-reactive',
  templateUrl: './user-form-reactive.component.html',
  styleUrls: ['./user-form-reactive.component.css']
})
export class UserFormReactiveComponent implements OnInit {

  user: User = USERS[0];
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required ],
      username: ['', [Validators.required] ],
      email: ['', [Validators.email] ],
      address: this.fb.group({
        street: '',
        city: '',
        zipcode: ''
      })
    });
   }

  ngOnInit() {
    this.userForm.patchValue(this.user);
  }

}
