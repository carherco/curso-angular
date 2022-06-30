import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[resizable]'
})
export class ResizableDirective {

  initialwidth: number;
  initialMouseX!: number;
  resizing: boolean = false;

  constructor(private el: ElementRef) {
    // Normalmente, el elemento no tendrá atributo width.
    // Con estas dos líneas hago que tenga dicho atributo
    // Así en el initResize lo puedo leer.
    this.initialwidth = +this.el.nativeElement.offsetWidth || 100; // No consigo averiguar el width inicial
    this.el.nativeElement.width = ''+this.initialwidth;
  }

  @HostListener('mousedown',['$event'])
  initResize(event: MouseEvent) {
    this.initialwidth = +this.el.nativeElement.width;
    this.initialMouseX = event.x;
    this.el.nativeElement.style.cursor = 'col-resize';
    this.resizing = true;
  }

  @HostListener('mouseup',['$event'])
  finishResize(event: MouseEvent) {
    this.resizing = false;
    this.el.nativeElement.style.cursor = '';
  }

  @HostListener('mousemove',['$event'])
  resize(event: MouseEvent) {
    if(this.resizing) {
      let width = this.initialwidth + (event.x - this.initialMouseX);
      this.el.nativeElement.width = ''+ width;
    }
  }
}
