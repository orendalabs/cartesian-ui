import { Component } from '@angular/core';

@Component({
  templateUrl: 'collapses.component.html',
})
export class CollapsesComponent {
  constructor() {}

  isCollapsed = false;

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }
}
