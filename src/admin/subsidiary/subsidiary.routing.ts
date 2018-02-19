import { Routes, RouterModule } from '@angular/router';
import { SubsidiaryListComponent } from './subsidiary.list.component';
import { SubsidiaryNewComponent } from './subsidiary.new.component';
import { AuthGuard } from '../../auth/auth-guard.service';

const routes: Routes = [
    {
        canActivate: [AuthGuard],
        component: SubsidiaryListComponent,
        data: {
            breadcrumb: 'Lista'
        },
        path: 'list'
    },
    {
        canActivate: [AuthGuard],
        component: SubsidiaryNewComponent,
        data: {
            breadcrumb: 'Nueva'
        },
        path: 'new'
    }
];

export const routing = RouterModule.forChild(routes);

