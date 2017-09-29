import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TerminalComponent } from './terminal.component';
import { routing } from './terminal.routing';

@NgModule({
    bootstrap: [TerminalComponent],
    declarations: [TerminalComponent],
    imports: [BrowserModule,
        routing,
        BrowserAnimationsModule,
        NgbModule.forRoot()
    ]
})

export class TerminalModule { }