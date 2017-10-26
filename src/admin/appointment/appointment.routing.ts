import { Routes, RouterModule } from '@angular/router';
import { AppointmentListComponent } from './appointment.list.component';
import { AppointmentNewComponent } from './appointment.new.component';
import { AuthGuard } from '../../auth/auth-guard.service';

const routes: Routes = [
    {
        canActivate: [AuthGuard],
        component: AppointmentListComponent,
        path: 'list'
    },
    {
        canActivate: [AuthGuard],
        component: AppointmentNewComponent,
        path: 'new'
    }
];

export const routing = RouterModule.forChild(routes);

