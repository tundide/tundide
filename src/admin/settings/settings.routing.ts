import { Routes, RouterModule } from '@angular/router';
import { AlertComponent } from './alert.component';
import { AuthGuard } from '../../auth/auth-guard.service';

const routes: Routes = [
    {
        canActivate: [AuthGuard],
        component: AlertComponent,
        path: 'alert',
        data: {
            breadcrumbs: true,
            text: 'Alertas'
        }
    }
];

export const routing = RouterModule.forChild(routes);

