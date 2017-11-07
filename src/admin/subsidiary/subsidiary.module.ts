import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routing } from './subsidiary.routing';
import { AuthGuard } from '../../auth/auth-guard.service';
import { SubsidiaryNewComponent } from './subsidiary.new.component';
import { SubsidiaryListComponent } from './subsidiary.list.component';
import { SubsidiaryService } from './subsidiary.service';
import { SharedModule } from '../../shared/shared.module';
import { ToastyModule } from 'ng2-toasty';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [SubsidiaryNewComponent, SubsidiaryListComponent],
    exports: [SubsidiaryNewComponent, SubsidiaryListComponent],
    imports: [routing,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        CommonModule,
        NgbModule,
        SharedModule.forRoot(),
        ToastyModule.forRoot()],
    providers: [
        AuthGuard,
        SubsidiaryService]
})

export class SubsidiaryModule { }