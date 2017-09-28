import { Routes, RouterModule } from '@angular/router';
import { TicketComponent } from './ticket.component';
import { AuthGuard } from '../auth/auth-guard.service';

const routes: Routes = [
    {
        canActivate: [AuthGuard],
        component: TicketComponent,
        path: ''
    }
];

export const routing = RouterModule.forChild(routes);

