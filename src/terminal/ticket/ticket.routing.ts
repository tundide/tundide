import { Routes, RouterModule } from '@angular/router';
import { TicketNewComponent } from './ticket.new.component';
import { TicketViewComponent } from './ticket.view.component';
import { AuthGuard } from '../auth/auth-guard.service';

const routes: Routes = [
    {
        canActivate: [AuthGuard],
        component: TicketNewComponent,
        path: ''
    },
    {
        canActivate: [AuthGuard],
        component: TicketViewComponent,
        path: ''
    }
];

export const routing = RouterModule.forChild(routes);

