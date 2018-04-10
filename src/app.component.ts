import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-admin',
    styleUrls: ['app.component.scss'],
    template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
}
