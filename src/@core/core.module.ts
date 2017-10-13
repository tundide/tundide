import { NgModule } from '@angular/core';
import { AnalyticsService } from './utils/analytics.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [BrowserModule,
        BrowserAnimationsModule,
        NgbModule.forRoot()
    ],
    providers: [
        AnalyticsService
    ]
})

export class CoreModule { }