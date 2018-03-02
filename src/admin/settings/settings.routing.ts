import { Routes, RouterModule } from '@angular/router';
import { AlertComponent } from './alert.component';
import { GeneralComponent } from './general.component';
import { AuthGuard } from '../../auth/auth-guard.service';

const routes: Routes = [
    {
        canActivate: [AuthGuard],
        component: AlertComponent,
        data: {
            breadcrumbs: true,
            text: 'Alertas'
        },
        path: 'alert'
    },
    {
        canActivate: [AuthGuard],
        component: GeneralComponent,
        path: 'general'
    }
];

export const routing = RouterModule.forChild(routes);

