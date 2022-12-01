import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appColor]'
})
export class ColorDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input() defaultColor = '';
  @Input() appColor = '';

  @HostListener('mouseenter') onMouseEnter() {
    this.cambiar(this.appColor || this.defaultColor || 'aliceblue');
    this.resize('17px');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.cambiar(this.appColor || this.defaultColor || '#BFCACC');
    this.resize('16px');
  }

  private cambiar(color: string) {
    this.el.nativeElement.style.color = color;
  }

  private resize(size: string) {
    this.renderer.setStyle(this.el.nativeElement, 'font-size', size);
  }
}
