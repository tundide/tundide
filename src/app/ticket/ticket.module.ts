import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxVirtualKeyboardModule }  from 'ngx-virtual-keyboard';
import { routing } from './ticket.routing';
import { AuthGuard } from '../auth/auth-guard.service';
import { TicketComponent } from './ticket.component';
import { ToastyModule } from 'ng2-toasty';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [TicketComponent],
    exports: [TicketComponent],
    imports: [routing,
        FormsModule,
        RouterModule,
        CommonModule,
        NgbModule,
        NgxVirtualKeyboardModule,
        ToastyModule.forRoot()],
    providers: [AuthGuard]
})

export class TicketModule { }