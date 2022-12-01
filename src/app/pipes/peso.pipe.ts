import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'peso'
})
export class PesoPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    let retorno;
    if (value) {
      retorno = value + " " + " Kg";
    }
    return retorno;
  }
}
