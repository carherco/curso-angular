import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decodeSource'
})
export class DecodeSourcePipe implements PipeTransform {

  transform(value: string): any[] {
    const cleaned = value.substring(1, value.length);
    let output = [];
    let output_index = 0;
    let is_parentheses_group = false;
    let is_square_brackets_group = false;
    let parentheses_group = '';
    let square_brackets_group = '';
    for(let char of cleaned) {

      if (char === '-') {
        output.push('');
      } else if (char === '(') {
        is_parentheses_group = true;
      } else if (char === ')') {
        output.push(parentheses_group);
        is_parentheses_group = false;
        parentheses_group = '';
      } else if (char === '{') {
        is_square_brackets_group = true;
      } else if (char === '}') {
        output.push(square_brackets_group.split(','));
        is_square_brackets_group = false;
        square_brackets_group = '';
      } else if (char === '>') {
        //doNothing
      } else if (char === '#') {
        output.push(char);
      } else if (char === '#') {
        output.push(char);
      } else {
        if (!is_parentheses_group && ! is_square_brackets_group) {
          output.push(char);
        } else if (is_parentheses_group) {
          parentheses_group += char;
        } else if (is_square_brackets_group) {
          square_brackets_group += char;
        }
      }

    }
    return output;
  }

}
