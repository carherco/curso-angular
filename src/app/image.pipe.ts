import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let prefix = 'assets/img/';
console.log(args);
    if(args){
      prefix = args + '/';
    }
    return prefix + value;
  }

}
