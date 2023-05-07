import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    // 16:52
    let result = '';
    let hour = value.split(':')[0].trim();
    let minute = value.split(':')[1].trim();
    if(+hour > 12) {
      result = +hour%12 + ':' + minute + ' pm';
    } else {
      result = hour + ':' + minute + ' am';
    }
    
    return result;
  }
}