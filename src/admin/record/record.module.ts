import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routing } from './record.routing';
import { AuthGuard } from '../../auth/auth-guard.service';
import { RecordNewComponent } from './record.new.component';
import { RecordListComponent } from './record.list.component';
import { RecordService } from './record.service';
import { LocationService } from '../../shared/location.service';
import { SharedModule } from '../../shared/shared.module';
import { ToastyModule } from 'ng2-toasty';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

@NgModule({
    declarations: [RecordNewComponent, RecordListComponent],
    exports: [RecordNewComponent, RecordListComponent],
    imports: [routing,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        CommonModule,
        NgbModule,
        NgxErrorsModule,
        SharedModule.forRoot(),
        ToastyModule.forRoot()],
    providers: [
        AuthGuard,
        RecordService,
        LocationService]
})

export class RecordModule { }