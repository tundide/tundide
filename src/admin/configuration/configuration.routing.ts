import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from './start.component';
import { AuthGuard } from '../../auth/auth-guard.service';

const routes: Routes = [
    {
        canActivate: [AuthGuard],
        component: StartComponent,
        path: ''
    }
];

export const routing = RouterModule.forChild(routes);

