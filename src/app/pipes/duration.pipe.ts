import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationPipe implements PipeTransform {

  transform(value: number | undefined): string {
    return value ? `${Math.floor(value / 60)}h ${value % 60}min` : '';
  }

}
