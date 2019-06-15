import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exp'
})
export class ExponentePipe implements PipeTransform {

  transform(valor: number, exponente:number): number {
    console.log('método trasnform de la pipe exp');
    return Math.pow(valor,exponente);
  }

}
