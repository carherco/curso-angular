import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Hero } from 'app/hero';
import { Address } from "app/address";

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  powers = ['Really Smart', 'Super Flexible',
              'Super Hot', 'Weather Changer'];

  states = ['CA', 'MD', 'OH', 'VA'];

  hero = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');

  heroForm: FormGroup;
  alterEgoControl: FormControl;
  addresses: FormArray;

  constructor(private fb: FormBuilder) {

    this.alterEgoControl = new FormControl('Alter Ego por defecto', Validators.required);
    this.createForm();
  }

  createForm() {
    this.heroForm = this.fb.group({
      name: ['Nombre por defecto', Validators.required ],
      alterEgo: this.alterEgoControl,
      power: '',
      //addresses: this.fb.array([])
      addresses: this.fb.array([new Address()])
    });
    this.addresses = this.heroForm.get('addresses') as FormArray;

  }

    // Validadores personalizados
    // Observables: this.alterEgoControl.valueChanges.subscribe(x => console.log(x));

  addAddress() {

    this.addresses.push(this.fb.group(new Address()));
  }

  ngOnInit() {
  }

  onSubmit() {
    //let control = this.heroForm.get('alterEgo');
    console.log(this.heroForm);
  }

}
