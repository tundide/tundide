import { Routes, RouterModule } from '@angular/router';
import { AppointmentNewComponent } from './appointment.new.component';
import { AuthGuard } from '../../../auth/auth-guard.service';

const routes: Routes = [
    {
        canActivate: [AuthGuard],
        component: AppointmentNewComponent,
        path: ''
    }
];

export const routing = RouterModule.forChild(routes);

