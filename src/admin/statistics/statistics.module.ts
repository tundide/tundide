import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routing } from './statistics.routing';
import { AuthGuard } from '../../auth/auth-guard.service';
import { PollsComponent } from './polls.component';
import { CustomersServedComponent } from './customersserved.component';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

@NgModule({
    declarations: [PollsComponent, CustomersServedComponent],
    exports: [PollsComponent, CustomersServedComponent],
    imports: [routing,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        CommonModule,
        NgbModule,
        NgxErrorsModule,
        SharedModule.forRoot()],
    providers: [
        AuthGuard]
})

export class StatisticsModule { }