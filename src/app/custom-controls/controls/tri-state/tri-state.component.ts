import { Component, OnInit, ViewChild, ElementRef, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

// const MY_CUSTOM_VALUE_ACCESSOR = {
//   provide: NG_VALUE_ACCESSOR,
//   multi: true,
//   //useExisting: RequiredTextComponent
//   useExisting: forwardRef(() => RequiredTextComponent),
// };

@Component({
  selector: 'tri-state-control',
  templateUrl: './tri-state.component.html',
  styleUrls: ['./tri-state.component.css'],
  // providers: [
  //   MY_CUSTOM_VALUE_ACCESSOR
  // ],
})
export class TriStateControl implements OnInit, ControlValueAccessor {

  // @ViewChild('input') input: ElementRef;
  value: number;
  onChange: (value: number) => void;
  onTouched: () => void;
  disabled: boolean = false;
  constructor(@Self() @Optional() public controlDirective: NgControl) {
    controlDirective.valueAccessor = this;
  }

  ngOnInit() {
    const control = this.controlDirective.control;
    // let validators = control.validator ? [control.validator, RequiredTextValidator.validate] :RequiredTextValidator.validate;
    // control.setValidators(validators);
    control.updateValueAndValidity();
  }

  writeValue(value: any) {
    switch(value) {
      case -1:
        this.value = -1;
        break;
      case 0:
        this.value = 0;
        break;
      case 1:
        this.value = 1;
        break;
      default:
        this.value = 0;
        break;
    }
  }

  registerOnChange(fn: (value: number) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  seleccionarMenos() {
    this.value = -1;
    this.onChange(this.value);
    this.onTouched();
  }

  seleccionarAdecuado() {
    this.value = 0;
    this.onChange(this.value);
    this.onTouched();
  }

  seleccionarMas() {
    this.value = 1;
    this.onChange(this.value);
    this.onTouched();
  }


}
