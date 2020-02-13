import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CustomValidators } from 'src/app/validators/spanishIbanValidator';


@Component({
  selector: 'app-iban-validator-example',
  templateUrl: './iban-validator-example.component.html',
  styleUrls: ['./iban-validator-example.component.css']
})
export class IbanValidatorExampleComponent implements OnInit {

  userForm: FormGroup;
  user: {name: string, iban: string}
  constructor() {
    this.userForm = new FormGroup({
      'name': new FormControl(this.user.name, [Validators.required]),
      'iban': new FormControl(this.user.iban, [Validators.required, CustomValidators.spanishIbanValidator])
    });
  }

  ngOnInit() {
  }

}
