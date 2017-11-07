import { Routes, RouterModule } from '@angular/router';
import { SubsidiaryListComponent } from './subsidiary.list.component';
import { SubsidiaryNewComponent } from './subsidiary.new.component';
import { AuthGuard } from '../../auth/auth-guard.service';

const routes: Routes = [
    {
        canActivate: [AuthGuard],
        component: SubsidiaryListComponent,
        path: 'list'
    },
    {
        canActivate: [AuthGuard],
        component: SubsidiaryNewComponent,
        path: 'new'
    }
];

export const routing = RouterModule.forChild(routes);
