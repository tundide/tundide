import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routing } from './appointment.routing';
import { AuthGuard } from '../../auth/auth-guard.service';
import { AppointmentNewComponent } from './appointment.new.component';
import { AppointmentListComponent } from './appointment.list.component';
import { AppointmentService } from './appointment.service';
import { PhonebookService } from '../phonebook/phonebook.service';
import { SubsidiaryService } from '../subsidiary/subsidiary.service';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    declarations: [AppointmentNewComponent, AppointmentListComponent],
    exports: [AppointmentNewComponent, AppointmentListComponent],
    imports: [
        CommonModule,
        routing,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgbModule,
        NgSelectModule,
        SharedModule.forRoot()
    ],
    providers: [
        AuthGuard,
        AppointmentService,
        SubsidiaryService,
        PhonebookService]
})

export class AppointmentModule { }