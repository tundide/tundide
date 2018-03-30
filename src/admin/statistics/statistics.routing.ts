import { Routes, RouterModule } from '@angular/router';
import { CustomersServedComponent } from './customersserved.component';
import { PollsComponent } from './polls.component';
import { AuthGuard } from '../../auth/auth-guard.service';

const routes: Routes = [
    {
        canActivate: [AuthGuard],
        component: CustomersServedComponent,
        path: 'customersserved'
    },
    {
        canActivate: [AuthGuard],
        component: PollsComponent,
        path: 'polls'
    }
];

export const routing = RouterModule.forChild(routes);

