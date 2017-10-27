import { NgModule } from '@angular/core';
import { AnalyticsService } from './utils/analytics.service';
import { HttpService } from './utils/http.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        NgbModule.forRoot()
    ],
    providers: [
        AnalyticsService,
        HttpService
    ]
})

export class CoreModule { }