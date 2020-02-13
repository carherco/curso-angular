import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { spanishIbanValidator } from '../../validators/spanishIbanValidator';

@Component({
  selector: 'app-iban-validator-example',
  templateUrl: './iban-validator-example.component.html',
  styleUrls: ['./iban-validator-example.component.css']
})
export class IbanValidatorExampleComponent implements OnInit {

  userForm: FormGroup;
  user: {name: string, iban: string} = {name: '', iban: ''};
  constructor() {
    this.userForm = new FormGroup({
      name: new FormControl(this.user.name, [Validators.required]),
      iban: new FormControl(this.user.iban, [Validators.required, spanishIbanValidator()])
    });
  }

  ngOnInit() {
  }

}
