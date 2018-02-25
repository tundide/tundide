import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    {
        component: HomeComponent,
        data: {
            breadcrumbs: true,
            text: 'Principal'
        },
        path: '',
        pathMatch: 'full'
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
        data: {
            breadcrumbs: true,
            text: 'Administracion'
        },
        loadChildren: './admin.module#AdminModule',
        path: 'admin'
    },
    {
        canActivate: [AuthGuard],
        data: {
            breadcrumbs: true,
            text: 'Facturacion'
        },
        loadChildren: './billing/billing.module#BillingModule',
        path: 'billing'
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
        data: {
            breadcrumbs: true,
            text: 'Mensajes'
        },
        loadChildren: './message/message.module#MessageModule',
        path: 'message'
    },
    {
        canActivate: [AuthGuard],
        data: {
            breadcrumbs: true,
            text: 'Calendario'
        },
        loadChildren: './appointment/appointment.module#AppointmentModule',
        path: 'appointment'
    },
    {
        canActivate: [AuthGuard],
        data: {
            breadcrumbs: true,
            text: 'Agenda'
        },
        loadChildren: './phonebook/phonebook.module#PhonebookModule',
        path: 'phonebook'
    },
    {
        canActivate: [AuthGuard],
        loadChildren: './record/record.module#RecordModule',
        path: 'record'
    },
    {
        canActivate: [AuthGuard],
        data: {
            breadcrumbs: true,
            text: 'Stock'
        },
        loadChildren: './stock/stock.module#StockModule',
        path: 'stock'
    },
    {
        canActivate: [AuthGuard],
        data: {
            breadcrumbs: true,
            text: 'Sucursales'
        },
        loadChildren: './subsidiary/subsidiary.module#SubsidiaryModule',
        path: 'subsidiary'
    },
    {
        canActivate: [AuthGuard],
        data: {
            breadcrumbs: true,
            text: 'Configuracion'
        },
        loadChildren: './settings/settings.module#SettingsModule',
        path: 'settings'
    },
    {
        canActivate: [AuthGuard],
        data: {
            breadcrumbs: true,
            text: 'Tablero'
        },
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        path: 'dashboard'
    },
    {
        canActivate: [AuthGuard],
        loadChildren: './configuration/configuration.module#StartModule',
        path: 'start'
    },
    {
        canActivate: [AuthGuard],
        data: {
            breadcrumbs: true,
            text: 'Medicamentos'
        },
        loadChildren: './database/database.module#DatabaseModule',
        path: 'medicine'
    }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
