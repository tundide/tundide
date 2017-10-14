import { Routes, RouterModule } from '@angular/router';
import { StockListComponent } from './stock.list.component';
import { AuthGuard } from '../../auth/auth-guard.service';

const routes: Routes = [
    {
        canActivate: [AuthGuard],
        component: StockListComponent,
        path: 'list'
    }
];

export const routing = RouterModule.forChild(routes);

