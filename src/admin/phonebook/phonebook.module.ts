import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routing } from './phonebook.routing';
import { AuthGuard } from '../../auth/auth-guard.service';
import { PhonebookNewComponent } from './phonebook.new.component';
import { PhonebookListComponent } from './phonebook.list.component';
import { PhonebookService } from './phonebook.service';
import { SharedModule } from '../../shared/shared.module';
import { ToastyModule } from 'ng2-toasty';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [PhonebookNewComponent, PhonebookListComponent],
    exports: [PhonebookNewComponent, PhonebookListComponent],
    imports: [routing,
        FormsModule,
        RouterModule,
        CommonModule,
        NgbModule,
        SharedModule.forRoot(),
        ToastyModule.forRoot()],
    providers: [
        AuthGuard,
        PhonebookService]
})

export class PhonebookModule { }