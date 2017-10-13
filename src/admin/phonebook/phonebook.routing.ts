import { Routes, RouterModule } from '@angular/router';
import { PhonebookListComponent } from './phonebook.list.component';
import { AuthGuard } from '../../auth/auth-guard.service';

const routes: Routes = [
    {
        canActivate: [AuthGuard],
        component: PhonebookListComponent,
        path: 'list'
    }
];

export const routing = RouterModule.forChild(routes);

