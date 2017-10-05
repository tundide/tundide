import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    { path: 'index', loadChildren: './index.module#IndexModule' }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
