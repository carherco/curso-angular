import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../model/user';

@Pipe({
  name: 'filterAge'
})
export class FilterAgePipe implements PipeTransform {

  transform(value: User[], minage: number): User[] {
    console.log('método trasnform de la pipe filterAge');
    return value.filter( u => u.age >= minage);
  }

}
