import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routing } from './dashboard.routing';
import { AuthGuard } from '../../auth/auth-guard.service';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { ToastyModule } from 'ng2-toasty';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocationService } from '../../shared/location.service';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { GridsterModule } from 'angular-gridster2';

@NgModule({
    declarations: [DashboardComponent],
    exports: [DashboardComponent],
    imports: [routing,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        CommonModule,
        NgbModule,
        NgxErrorsModule,
        GridsterModule,
        SharedModule.forRoot(),
        ToastyModule.forRoot()],
    providers: [
        AuthGuard
    ]
})

export class DashboardModule { }