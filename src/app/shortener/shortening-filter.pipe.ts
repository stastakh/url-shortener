import { PipeTransform, Pipe } from '@angular/core';
import { Shortening } from '../models/shortening-response.interface';

@Pipe({
  name: 'shorteningFilter'
})
export class ShorteningFilterPipe implements PipeTransform {
  transform(shortenings: Shortening[], searchName: string): Shortening[] {
    if (!shortenings || !searchName) {
      return shortenings;
    }

    return shortenings.filter(shortening => {
      return shortening.name.toLowerCase() === searchName.toLowerCase()
    });
  }
}