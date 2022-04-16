import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { User } from '../../model/TypicodeUser';
import { USERS } from '../../data/users';


@Component({
  selector: 'user-form-reactive',
  templateUrl: './user-form-reactive.component.html',
  styleUrls: ['./user-form-reactive.component.css']
})
export class UserFormReactiveComponent implements OnInit {

  user: User = USERS[0];
  userForm: FormGroup;
  nameControl: FormControl;
  arrayControl: FormArray;

  constructor(private fb: FormBuilder) {
    this.buildForm2();
  }


  buildForm1() {
    // FormControl, FormGroup, FormArray <= AbstractControl
    this.nameControl = new FormControl('Carlos', Validators.required);
    const usernameControl = new FormControl('carherco', Validators.required);
    const emailControl = new FormControl('', [Validators.email, Validators.required]);
    const streetControl = new FormControl();
    const cityControl = new FormControl();
    const zipcodeControl = new FormControl();
    const addressControl = new FormGroup({});

    addressControl.addControl('street', streetControl);
    addressControl.addControl('city', cityControl);
    addressControl.addControl('zipcodeControl', zipcodeControl);
    this.userForm = new FormGroup({});

    this.userForm.addControl('name', this.nameControl);
    this.userForm.addControl('username', usernameControl);
    this.userForm.addControl('email', emailControl);
    this.userForm.addControl('address', addressControl)
  }

  buildForm2() {
    this.userForm = this.fb.group({
      name: [this.user.name, Validators.required ],
      username: [this.user.username, [Validators.required] ],
      email: [this.user.email, [Validators.email, Validators.required] ],
      address: this.fb.group({
        street: this.user.address.street,
        city: 'Benalmádena',
        zipcode: ''
      })
    }, { updateOn: 'blur' });

    this.userForm.get('address').valueChanges.subscribe(
      newValue => console.log(newValue)
    );
  }

  ngOnInit() {
    //this.userForm.setValue(this.user);
    // this.userForm.patchValue(this.user);


  }

  submit() {
    this.user = this.userForm.value;
  }
}
