import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  myForm: any;
  alterEgoControl: FormControl;

  constructor(private fb: FormBuilder) {

    this.alterEgoControl = new FormControl('Alter Ego por defecto', Validators.required);

    this.myForm = this.fb.group({
      name: 'Nombre por defecto',
      alterEgo: this.alterEgoControl
    });

    // Validadores personalizados
    // Observables: this.nameControl.valueChanges.subscribe(x => console.log(x));

   }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.myForm);
  }

}
