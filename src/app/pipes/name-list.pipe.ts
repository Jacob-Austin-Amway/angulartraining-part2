import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameList',
  standalone: true
})
export class NameListPipe implements PipeTransform {

  transform(value: string[] | undefined): string {
    return value ? value.join(', ') : '';
  }

}
