import { Component, Input, HostBinding, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'rating-stars-control',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingStarsControl),
      multi: true
    }
  ]
})
export class RatingStarsControl implements ControlValueAccessor {

  stars: boolean[] = Array(5).fill(false);

  // Allow the input to be disabled, and when it is make it somewhat transparent.
  @Input() disabled = false;
  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.25 : 1;
  }

  onChange = (rating: number) => {};

  onTouched = () => {};

  get value(): number {
    return this.stars.reduce((total, starred) => {
      return total + (starred ? 1 : 0);
    }, 0);
  }

  // Al hacer click, se ejecuta esta función indicando en qué estrella se hizo click
  // La función llama a writeValue para actualizar el array de booleanos this.star y para llamar a this.onChange
  // También informo a Angular de que el control ha sido touched
  rate(rating: number) {
    if (!this.disabled) {
      this.stars = this.stars.map((_, i) => rating > i);
      this.onChange(this.value);
      this.onTouched();
    }
  }

  // Angular llamará a esta función cuando el modelo cambie
  writeValue(rating: number): void {
    this.stars = this.stars.map((_, i) => rating > i);
  }

  registerOnChange(fn: (rating: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
