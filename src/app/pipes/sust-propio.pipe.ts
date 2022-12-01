import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sustPropio'
})
export class SustPropioPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if (value) {
      value = value.toLowerCase();
      value = value[0].toUpperCase() + value.slice(1, value.length);
    }
    return value;
  }

}
