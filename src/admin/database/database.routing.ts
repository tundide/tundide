import { Routes, RouterModule } from '@angular/router';
import { MedicineComponent } from './medicine.component';
import { AuthGuard } from '../../auth/auth-guard.service';

const routes: Routes = [
    {
        canActivate: [AuthGuard],
        component: MedicineComponent,
        path: ''
    }
];

export const routing = RouterModule.forChild(routes);

