import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAgrandar]',
})
export class AgrandarDirective {
  constructor(private el: ElementRef) { }

  @HostListener('click') onClick() {

  }

  @HostListener('mouseleave') onMouseLeave() { }

  private cambiar(d: string) {
    this.el.nativeElement.style.display = d;
    this.el.nativeElement.style.color = '';
  }
}
