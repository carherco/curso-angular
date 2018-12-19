import { Component, OnInit, ViewChild, ElementRef, Self } from '@angular/core';
import { NgControl, ControlValueAccessor } from '@angular/forms';
import { RequiredTextValidator } from '../../validators/required-text-validator/required-text-validator.component';

// const MY_CUSTOM_VALUE_ACCESSOR = {
//   provide: NG_VALUE_ACCESSOR,
//   multi: true,
//   //useExisting: RequiredTextComponent
//   useExisting: forwardRef(() => RequiredTextComponent),
// };

@Component({
  selector: 'required-text-control',
  templateUrl: './required-text.component.html',
  styleUrls: ['./required-text.component.css'],
  // providers: [
  //   MY_CUSTOM_VALUE_ACCESSOR
  // ],
})
export class RequiredTextControl implements ControlValueAccessor {

  @ViewChild('input') input: ElementRef;
  onChange: any;
  onTouched: any;
  disabled: boolean = false;
  constructor(@Self() public controlDirective: NgControl) {
    controlDirective.valueAccessor = this;
  }

  ngOnInit() {
    const control = this.controlDirective.control;
    let validators = control.validator ? [control.validator, RequiredTextValidator.validate] :RequiredTextValidator.validate;
    control.setValidators(validators);
    control.updateValueAndValidity();
  }

  writeValue(value: any) {
    this.input.nativeElement.value = value;
  }

  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  onkeyup() {
    this.onChange(this.input.nativeElement.value)
  }

  onblur() {
    this.onTouched();
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }


}
