import { Pipe, PipeTransform } from '@angular/core';
import { LocalizationService } from 'src/modules/app/services/localization.service';

@Pipe({
  name: 'translate',
  pure: true
})
export class TranslatePipe implements PipeTransform {
  
  constructor(private localization: LocalizationService) { }

  transform(key: string, args?: object): string {
    let value = this.localization.translate(key);
    
    for(let property in args){
      value = value.replace(`{{${property}}}`, args[property]);
    };
    
    return value;
  }
}