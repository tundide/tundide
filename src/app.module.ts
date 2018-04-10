import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PortalComponent } from './portal/portal.component';
import { routing } from './app.routing';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        PortalComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        routing
    ]
})
export class AppModule {
}