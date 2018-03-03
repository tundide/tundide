import { Routes, RouterModule } from '@angular/router';
import { AppointmentComponent } from './appointment.component';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../../auth/auth-guard.service';

const routes: Routes = [
    {
        canActivate: [AuthGuard],
        children: [
            {
                component: AppointmentComponent,
                outlet: 'appointment',
                path: ''
            }
        ],
        component: DashboardComponent,
        path: ''
    }
];

export const routing = RouterModule.forChild(routes);

