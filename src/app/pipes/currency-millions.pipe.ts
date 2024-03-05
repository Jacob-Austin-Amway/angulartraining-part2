import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyMillions',
  standalone: true
})
export class CurrencyMillionsPipe implements PipeTransform {
  transform(value: string|number|undefined): string {

    return value ? `$${value} million` : '';
  }

}
