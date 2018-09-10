import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appRotate]'
})
export class RotateDirective {

  @Input('appRotate') angle: number = 0;
  @Input() step: number = 10;

  constructor(private el: ElementRef) {

  }

  ngOnInit() {
    //El valor pasado por @Input no está listo en el constructor. Hay que usar ngOnInit si queremos tener el valor de this.angle
    this.el.nativeElement.style.transform = `rotate(${this.angle}deg)`;
  }

  @HostListener("click", ['$event']) girar(event: MouseEvent) {
    if(event.shiftKey) {
      this.angle = this.angle - this.step;
    } else {
      this.angle = this.angle + +(this.step);
    }

    this.el.nativeElement.style.transform = `rotate(${this.angle}deg)`;

  }

}
