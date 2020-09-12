import { Component } from '@angular/core';
import { AppSandbox } from "./app.sandbox";

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`,
    providers: [AppSandbox]
})
export class AppComponent {

}
