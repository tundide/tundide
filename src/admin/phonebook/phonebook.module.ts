import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routing } from './phonebook.routing';
import { AuthGuard } from '../../auth/auth-guard.service';
import { ContactNewComponent } from './contact.new.component';
import { ContactEditComponent } from './contact.edit.component';
import { PhonebookListComponent } from './phonebook.list.component';
import { PhonebookService } from './phonebook.service';
import { LocationService } from '../../shared/location.service';
import { SharedModule } from '../../shared/shared.module';
import { ToastyModule } from 'ng2-toasty';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

@NgModule({
    declarations: [ContactNewComponent, ContactEditComponent, PhonebookListComponent],
    exports: [ContactNewComponent, ContactEditComponent, PhonebookListComponent],
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
        PhonebookService,
        LocationService]
})

export class PhonebookModule { }