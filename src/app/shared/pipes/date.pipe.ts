import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';


@Pipe({
  name: 'myDate',
})
export class MyDatePipe implements PipeTransform {
  transform(value: Date): string {
    if (!value) return '';

    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(value, 'HH:mm, dd.MM.yyyy');

    return formattedDate || '';
  }
}
