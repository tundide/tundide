import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    {
        component: HomeComponent, path: '', pathMatch: 'full'
    },
    { path: 'auth', loadChildren: '../auth/auth.module#AuthModule' },
    {
        canActivate: [AuthGuard],
        component: ProfileComponent, // TODO: Sacar esto y llevarlo al modulo de Profile
        path: 'profile'
    },
    {
        canActivate: [AuthGuard],
        loadChildren: './admin.module#AdminModule',
        path: 'admin'
    },
    {
        canActivate: [AuthGuard],
        loadChildren: './billing/billing.module#BillingModule',
        path: 'billing'
    },
    {
        canActivate: [AuthGuard],
        loadChildren: './price/price.module#PriceModule',
        path: 'price'
    },
    { path: 'budget', loadChildren: './budget/budget.module#BudgetModule' },
    {
        loadChildren: './message/message.module#MessageModule',
        path: 'message'
    },
    {
        loadChildren: './appointment/appointment.module#AppointmentModule',
        path: 'appointment'
    }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
