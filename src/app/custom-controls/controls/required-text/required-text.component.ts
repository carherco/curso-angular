import { Component, ViewChild, ElementRef, Self, Optional } from '@angular/core';
import { NgControl, ControlValueAccessor } from '@angular/forms';
import { RequiredTextValidator } from '../../validators/required-text-validator/required-text-validator.component';

// Si necesito desde este Componente acceso a la instancia formControl,
// entonces no uso el providers sino que le pido a angular que me inyecte
// la instancia en el contructor y a la propiedad .valueAccessor de esa instancia
// le pongo como valor este componente:
/*
constructor(@Self() public controlDirective: NgControl) {
  controlDirective.valueAccessor = this;
}
*/

// Si no necesito desde este Componente acceso a la instancia formControl,
// entonces simplemente me proveo con provide: NG_VALUE_ACCESOR:
// const MY_CUSTOM_VALUE_ACCESSOR = {
//   provide: NG_VALUE_ACCESSOR,
//   multi: true,
//   //useExisting: RequiredTextControl
//   useExisting: forwardRef(() => RequiredTextControl),
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

  @ViewChild('input', {static: true}) input!: ElementRef;
  onChange!: (value: number) => void;
  onTouched!: () => void;
  disabled: boolean = false;
  constructor(@Self() @Optional() public controlDirective: NgControl) {
    controlDirective.valueAccessor = this;
  }

  ngOnInit() {
    const control = this.controlDirective.control!;
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
