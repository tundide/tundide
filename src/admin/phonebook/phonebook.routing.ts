import { Routes, RouterModule } from '@angular/router';
import { PhonebookListComponent } from './phonebook.list.component';
import { ContactNewComponent } from './contact.new.component';
import { ContactEditComponent } from './contact.edit.component';
import { AuthGuard } from '../../auth/auth-guard.service';

const routes: Routes = [
    {
        canActivate: [AuthGuard],
        component: PhonebookListComponent,
        path: ''
    },
    {
        canActivate: [AuthGuard],
        component: ContactNewComponent,
        data: {
            breadcrumbs: true,
            text: 'Nuevo contacto'
        },
        path: 'new'
    },
    {
        canActivate: [AuthGuard],
        component: ContactEditComponent,
        data: {
            breadcrumbs: true,
            text: 'Modificando contacto'
        },
        path: 'edit/:id'
    }
];

export const routing = RouterModule.forChild(routes);

