import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'app/model/user';

@Pipe({
  name: 'filterAge'
})
export class FilterAgePipe implements PipeTransform {

  transform(value: User[], minage: number): User[] {
    return value.filter( u => u.age >= minage);
  }

}
