import { Routes, RouterModule } from '@angular/router';
import { TicketNewComponent } from './ticket.new.component';
import { AuthGuard } from '../auth/auth-guard.service';

const routes: Routes = [
    {
        canActivate: [AuthGuard],
        component: TicketNewComponent,
        path: ''
    }
];

export const routing = RouterModule.forChild(routes);

