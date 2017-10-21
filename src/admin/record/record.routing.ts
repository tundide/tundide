import { Routes, RouterModule } from '@angular/router';
import { RecordListComponent } from './record.list.component';
import { RecordNewComponent } from './record.new.component';
import { AuthGuard } from '../../auth/auth-guard.service';

const routes: Routes = [
    {
        canActivate: [AuthGuard],
        component: RecordListComponent,
        path: 'list'
    },
    {
        canActivate: [AuthGuard],
        component: RecordNewComponent,
        path: 'new'
    }
];

export const routing = RouterModule.forChild(routes);

