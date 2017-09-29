import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AlertComponent } from './settings/alert.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../auth/auth-guard.service';

const routes: Routes = [
    {
        canActivate: [AuthGuard],
        children: [
            {
                canActivate: [AuthGuard],
                loadChildren: './billing/billing.module#BillingModule',
                path: 'billing'
            },
            {
                canActivate: [AuthGuard],
                component: ProfileComponent,
                path: 'profile'
            },
            {
                canActivate: [AuthGuard],
                component: AlertComponent,
                path: 'alert'
            }
        ],
        component: AdminComponent,
        path: ''
    }
];

export const routing =   RouterModule.forChild(routes);

