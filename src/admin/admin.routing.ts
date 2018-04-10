import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { AdminComponent } from './admin.component';
import { ProfileComponent } from './profile/profile.component';
import { SidebarComponent } from './main/sidebar/sidebar.component';
import { SidebarSettingsComponent } from './main/sidebar/settings.component';
import { SidebarConfigurationComponent } from './main/sidebar/configuration.component';
import { NotFoundComponent } from './main/notfound/notfound.component';

export const routes: Routes = [
    {
        children: [
            {
                component: SidebarSettingsComponent,
                outlet: 'settings',
                path: ''
            },
            {
                component: SidebarComponent,
                outlet: 'sidebar',
                path: ''
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
                loadChildren: './dashboard/dashboard.module#DashboardModule',
                path: 'dashboard'
            },
            {
                canActivate: [AuthGuard],
                data: {
                    breadcrumbs: true,
                    text: 'Medicamentos'
                },
                loadChildren: './database/database.module#DatabaseModule',
                path: 'medicine'
            },
            {
                canActivate: [AuthGuard],
                loadChildren: './statistics/statistics.module#StatisticsModule',
                path: 'statistics'
            },
            {
                canActivate: [AuthGuard],
                component: ProfileComponent, // TODO: Sacar esto y llevarlo al modulo de Profile
                path: 'profile'
            },
            {
                component: SidebarConfigurationComponent,
                outlet: 'configuration',
                path: ''
            },
            { path: '**', component: NotFoundComponent }
        ],
        component: AdminComponent,
        path: ''
    }
];

export const routing = RouterModule.forChild(routes);