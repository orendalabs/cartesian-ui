import { Component } from '@angular/core';
import { RootSandbox } from "./root.sandbox";

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`,
    providers: [RootSandbox]
})
export class RootComponent {

}
