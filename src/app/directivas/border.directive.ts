import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBorder]',
})
export class BorderDirective {
  constructor(private el: ElementRef) { }

  @Input() defaultColor = 'blue';
  @Input() defaultStyle = 'solid';
  @Input() defaultWidth = '3px';

  @HostListener('mouseenter') onMouseEnter() {
    this.cambiar(this.defaultColor, this.defaultStyle, this.defaultWidth);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.cambiar('silver', 'solid', '1px');
  }

  private cambiar(color: string, style: string, width: string) {
    this.el.nativeElement.style.borderColor = color;
    this.el.nativeElement.style.borderStyle = style;
    this.el.nativeElement.style.borderWidth = width;
  }
}
