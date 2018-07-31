import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exp'
})
export class ExponentePipe implements PipeTransform {

  transform(valor: number, exponente:number): number {
    return Math.pow(valor,exponente);
  }

}
