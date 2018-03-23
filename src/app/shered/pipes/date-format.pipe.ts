import { Pipe, PipeTransform } from '@angular/core'
import * as moment from 'moment'

@Pipe({
  name: 'formatDate'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      let date = value instanceof Date ? value : new Date(value);
      return moment(date).format('DD/MM/YYYY')
    }
  }
}