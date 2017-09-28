import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routing } from './appointment.routing';
import { AuthGuard } from '../../auth/auth-guard.service';
import { AppointmentNewComponent } from './appointment.new.component';
import { AppointmentListComponent } from './appointment.list.component';
import { ToastyModule } from 'ng2-toasty';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [AppointmentNewComponent, AppointmentListComponent],
    exports: [AppointmentNewComponent, AppointmentListComponent],
    imports: [routing,
        FormsModule,
        RouterModule,
        CommonModule,
        NgbModule,
        ToastyModule.forRoot()],
    providers: [AuthGuard]
})

export class TicketModule { }