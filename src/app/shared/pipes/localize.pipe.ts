import { Injector, Pipe, PipeTransform } from '@angular/core';
import { BaseComponent } from '@shared/ui';

@Pipe({
  name: 'localize',
})
export class LocalizePipe extends BaseComponent implements PipeTransform {
  constructor(injector: Injector) {
    super(injector);
  }

  transform(key: string, ...args: any[]): string {
    return this.l(key, args);
  }
}
