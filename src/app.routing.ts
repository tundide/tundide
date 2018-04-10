import { Routes, RouterModule } from '@angular/router';
import { PortalComponent } from './portal/portal.component';

const routes: Routes = [
  {
    component: PortalComponent,
    path: ''
  },
  {
    loadChildren: './admin/admin.module#AdminModule',
    path: 'admin'
  },
  {
    loadChildren: './auth/auth.module#AuthModule',
    path: 'auth'
  },
  {
    loadChildren: './terminal/terminal.module#TerminalModule',
    path: 'terminal'
  }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });