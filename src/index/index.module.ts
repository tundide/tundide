import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IndexComponent } from './index.component';
import { routing } from './index.routing';

@NgModule({
    bootstrap: [IndexComponent],
    declarations: [IndexComponent],
    imports: [BrowserModule,
        routing,
        BrowserAnimationsModule,
        NgbModule.forRoot()
    ]
})

export class IndexModule { }