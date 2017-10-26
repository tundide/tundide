import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routing } from './appointment.routing';
import { AuthGuard } from '../../auth/auth-guard.service';
import { AppointmentNewComponent } from './appointment.new.component';
import { AppointmentListComponent } from './appointment.list.component';
import { AppointmentService } from './appointment.service';
import { PhonebookService } from '../phonebook/phonebook.service';
import { SharedModule } from '../../shared/shared.module';
import { ToastyModule } from 'ng2-toasty';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OverlayModule } from 'angular-io-overlay';
import { DatePickerModule } from 'angular-io-datepicker';

@NgModule({
    declarations: [AppointmentNewComponent, AppointmentListComponent],
    exports: [AppointmentNewComponent, AppointmentListComponent],
    imports: [
        CommonModule,
        OverlayModule,
        routing,
        FormsModule,
        RouterModule,
        NgbModule,
        DatePickerModule,
        SharedModule.forRoot(),
        ToastyModule.forRoot()
    ],
    providers: [
        AuthGuard,
        AppointmentService,
        PhonebookService]
})

export class AppointmentModule { }