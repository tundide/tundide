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
import { ArchwizardModule } from 'ng2-archwizard';

@NgModule({
    declarations: [DashboardComponent],
    exports: [DashboardComponent],
    imports: [routing,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        CommonModule,
        NgbModule,
        ArchwizardModule,
        SharedModule.forRoot(),
        ToastyModule.forRoot()],
    providers: [
        AuthGuard
    ]
})

export class DashboardModule { }