import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxVirtualKeyboardModule }  from 'ngx-virtual-keyboard';
import { routing } from './ticket.routing';
import { AuthGuard } from '../auth/auth-guard.service';
import { TicketNewComponent } from './ticket.new.component';
import { TicketViewComponent } from './ticket.view.component';
import { ToastyModule } from 'ng2-toasty';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [TicketNewComponent, TicketViewComponent],
    exports: [TicketNewComponent, TicketViewComponent],
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