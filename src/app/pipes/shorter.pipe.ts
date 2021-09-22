import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorter'
})
export class ShorterPipe implements PipeTransform {

  transform(name): string { //460
    let shorterName: string;
    
    if (name.length > 6) {
      shorterName = name.substring(0,6);
      return shorterName + "~ ";
    }
    return name;
  }

}
