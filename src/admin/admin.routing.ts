import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    {
        component: HomeComponent, path: '', pathMatch: 'full',
        data: {
            breadcrumbs: true,
            text: 'Principal'
        }
    },
    {
        loadChildren: '../auth/auth.module#AuthModule',
        path: 'auth'
    },
    {
        canActivate: [AuthGuard],
        component: ProfileComponent, // TODO: Sacar esto y llevarlo al modulo de Profile
        path: 'profile'
    },
    {
        canActivate: [AuthGuard],
        loadChildren: './admin.module#AdminModule',
        path: 'admin',
        data: {
            breadcrumbs: true,
            text: 'Administracion'
        }
    },
    {
        canActivate: [AuthGuard],
        loadChildren: './billing/billing.module#BillingModule',
        path: 'billing',
        data: {
            breadcrumbs: true,
            text: 'Facturacion'
        }
    },
    {
        canActivate: [AuthGuard],
        loadChildren: './price/price.module#PriceModule',
        path: 'price'
    },
    {
        canActivate: [AuthGuard],
        loadChildren: './budget/budget.module#BudgetModule',
        path: 'budget'
    },
    {
        canActivate: [AuthGuard],
        loadChildren: './message/message.module#MessageModule',
        path: 'message',
        data: {
            breadcrumbs: true,
            text: 'Mensajes'
        }
    },
    {
        canActivate: [AuthGuard],
        loadChildren: './appointment/appointment.module#AppointmentModule',
        path: 'appointment',
        data: {
            breadcrumbs: true,
            text: 'Calendario'
        }
    },
    {
        canActivate: [AuthGuard],
        loadChildren: './phonebook/phonebook.module#PhonebookModule',
        path: 'phonebook',
        data: {
            breadcrumbs: true,
            text: 'Agenda'
        }
    },
    {
        canActivate: [AuthGuard],
        loadChildren: './record/record.module#RecordModule',
        path: 'record'
    },
    {
        canActivate: [AuthGuard],
        loadChildren: './stock/stock.module#StockModule',
        path: 'stock',
        data: {
            breadcrumbs: true,
            text: 'Stock'
        }
    },
    {
        canActivate: [AuthGuard],
        loadChildren: './subsidiary/subsidiary.module#SubsidiaryModule',
        path: 'subsidiary',
        data: {
            breadcrumbs: true,
            text: 'Sucursales'
        }
    },
    {
        canActivate: [AuthGuard],
        loadChildren: './settings/settings.module#SettingsModule',
        path: 'settings',
        data: {
            breadcrumbs: true,
            text: 'Configuracion'
        }
    },
    {
        canActivate: [AuthGuard],
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        path: 'dashboard',
        data: {
            breadcrumbs: true,
            text: 'Tablero'
        }
    }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
