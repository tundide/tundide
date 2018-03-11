import { Routes, RouterModule } from '@angular/router';
import { NotificationsComponent } from './notifications.component';
import { GeneralComponent } from './general.component';
import { AuthGuard } from '../../auth/auth-guard.service';

const routes: Routes = [
    {
        canActivate: [AuthGuard],
        component: NotificationsComponent,
        data: {
            breadcrumbs: true,
            text: 'Alertas'
        },
        path: 'notifications'
    },
    {
        canActivate: [AuthGuard],
        component: GeneralComponent,
        path: 'general'
    }
];

export const routing = RouterModule.forChild(routes);

