import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appSelected]'
})
export class SelectedDirective {

  constructor(private el: ElementRef) { }
  @Input() appSelected = '';
  @Input() tabla = '';

  @HostListener('click') onClick() {
    if (this.tabla == 'ESPECIALISTAS')
      this.selected(this.appSelected || 'white');
    if (this.tabla == 'PACIENTES')
      this.selected(this.appSelected || 'red');
  }
  // @HostListener('mouseleave') onMouseLeave() {
  //   this.selected('');
  // }
  private selected(color: string) {
    this.el.nativeElement.class = 'active';

  }
}
