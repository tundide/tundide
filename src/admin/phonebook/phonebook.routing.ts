import { Routes, RouterModule } from '@angular/router';
import { PhonebookListComponent } from './phonebook.list.component';
import { ClientNewComponent } from './client.new.component';
import { AuthGuard } from '../../auth/auth-guard.service';

const routes: Routes = [
    {
        canActivate: [AuthGuard],
        component: PhonebookListComponent,
        path: 'list'
    },
    {
        canActivate: [AuthGuard],
        component: ClientNewComponent,
        path: 'new'
    }
];

export const routing = RouterModule.forChild(routes);

