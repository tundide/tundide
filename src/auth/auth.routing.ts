import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SigninComponent } from './signin.component';
import { SignoutComponent } from './signout.component';
import { ConfirmComponent } from './confirm.component';

// const routes: Routes = [
//     {
//         component: AuthComponent, path: '', pathMatch: 'full'
//     },
//     {
//         children: [
//             { component: SigninComponent, path: 'signin' },
//             { component: SignoutComponent, path: 'signout'},
//             { component: ConfirmComponent, path: 'confirm'},
//         ],
//         path: ''
//     }
// ];

// export const routing = RouterModule.forChild(routes);



export const routes: Routes = [
    {
        component: AuthComponent, path: '', pathMatch: 'full'
    },
    {
        component: SigninComponent,
        path: 'signin'
    },
    {
        component: SignoutComponent,
        path: 'signout'
    },
    {
        component: ConfirmComponent,
        path: 'confirm'
    }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });


