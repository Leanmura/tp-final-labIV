import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'altura'
})
export class AlturaPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    let retorno;
    if (value) {
      retorno = value + " " + " Cm";
    }
    return retorno;
  }
}
