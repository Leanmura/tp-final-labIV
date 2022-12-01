import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperatura'
})
export class TemperaturaPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    let retorno;
    if (value) {
      retorno = value + " " + "°C";
    }
    return retorno;
  }

}
