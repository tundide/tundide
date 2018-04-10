import { Routes, RouterModule } from '@angular/router';
import { PortalComponent } from './portal.component';

const routes: Routes = [
    {
        component: PortalComponent,
        path: ''
    }
];

export const routing = RouterModule.forChild(routes);

