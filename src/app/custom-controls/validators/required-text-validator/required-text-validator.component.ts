import { Component, OnInit } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Component({
  selector: 'required-text',
  templateUrl: './required-text-validator.component.html',
  providers: [
    {provide: NG_VALIDATORS, multi: true, useExisting: RequiredTextValidator}
  ]
})
export class RequiredTextValidator {

  static validate(ctrl: AbstractControl) {
    return ctrl.value ? null : {customError: true}
  }

}
