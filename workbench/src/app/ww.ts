import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ww',
})
export class MultiplierPipe implements PipeTransform {
  transform(value: any, multiply: any): number {
    const index = 2;
    const symbl: any = "'";
    let newString = value.slice(0, index) + symbl + value.slice(index);
    return newString;
  }
}
