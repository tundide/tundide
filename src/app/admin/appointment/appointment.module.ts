import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routing } from './appointment.routing';
import { AuthGuard } from '../auth/auth-guard.service';
import { AppointmentNewComponent } from './appointment.new.component';
import { AppointmentViewComponent } from './appointment.view.component';
import { ToastyModule } from 'ng2-toasty';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [AppointmentNewComponent, AppointmentViewComponent],
    exports: [AppointmentNewComponent, AppointmentViewComponent],
    imports: [routing,
        FormsModule,
        RouterModule,
        CommonModule,
        NgbModule,
        ToastyModule.forRoot()],
    providers: [AuthGuard]
})

export class TicketModule { }