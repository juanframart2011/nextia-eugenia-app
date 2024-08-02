import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string): string {
    var datePipe = new DatePipe('en-US');
    var formattedDate = datePipe.transform(value, 'yyyy-MM-dd HH:mm:ss');
    return formattedDate ? formattedDate : '';
  }
}