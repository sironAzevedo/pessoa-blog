import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textLength'
})
export class TextLengthPipe implements PipeTransform {

  transform(value: string, maxLength: number): any {
    if (value.length > maxLength) {
      return value.substring(0, maxLength) + '...';
    }

    return value;
  }

}