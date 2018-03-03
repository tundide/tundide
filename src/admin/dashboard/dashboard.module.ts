import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routing } from './dashboard.routing';
import { AuthGuard } from '../../auth/auth-guard.service';
import { DashboardComponent } from './dashboard.component';
import { AppointmentComponent } from './appointment.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GridsterModule } from 'angular-gridster2';

@NgModule({
    declarations: [AppointmentComponent, DashboardComponent],
    exports: [AppointmentComponent, DashboardComponent],
    imports: [routing,
        RouterModule,
        CommonModule,
        NgbModule,
        GridsterModule],
    providers: [
        AuthGuard
    ]
})

export class DashboardModule { }