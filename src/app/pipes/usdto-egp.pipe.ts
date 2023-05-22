import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'USDToEGP'
})
export class USDToEGPPipe implements PipeTransform {

  transform(value: number, factor: number = 33): number {
    return value * factor;
  }

}
