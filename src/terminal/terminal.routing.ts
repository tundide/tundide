import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    { path: 'ticket', loadChildren: './ticket/ticket.module#TicketModule' }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
