import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DateTimePickerComponent } from './components/calendar/datetimepicker.component';
import { FileUploadComponent } from './components/fileupload/fileupload.component';
import { FileUploadService } from './components/fileupload/fileupload.service';
import { CalendarModule } from 'angular-calendar';
import { CamelCase } from './camelcase.pipe';
import { GoogleAnalyticsEventsService } from './google-analytics-events.service';
import { NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CacheService, CacheStorageAbstract, CacheLocalStorage } from 'ng2-cache/ng2-cache';

@NgModule({
    declarations: [CamelCase,
        CalendarComponent,
        DateTimePickerComponent,
        FileUploadComponent],
    exports: [
        CamelCase,
        CommonModule,
        FormsModule,
        RouterModule,
        CalendarComponent,
        DateTimePickerComponent,
        FileUploadComponent],
    imports: [
        BrowserAnimationsModule,
        CommonModule,
        HttpModule,
        RouterModule,
        FormsModule,
        NgbDatepickerModule.forRoot(),
        NgbTimepickerModule.forRoot(),
        CalendarModule.forRoot()
    ],
    providers: [
        CacheService,
        { provide: CacheStorageAbstract, useClass: CacheLocalStorage },
        FileUploadService,
        GoogleAnalyticsEventsService
    ]
})

export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}