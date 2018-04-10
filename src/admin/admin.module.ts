import { NgModule } from '@angular/core';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from './admin.component';
import { ProfileComponent } from './profile/profile.component';
import { routing } from './admin.routing';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth-guard.service';
import { SocketService } from '../shared/socket.service';
import { MainModule } from './main/main.module';
import { CoreModule } from '../@core/core.module';
import { ToastyModule } from 'ng2-toasty';
import { McBreadcrumbsModule } from 'ngx-breadcrumbs';

@NgModule({
    bootstrap: [AdminComponent],
    declarations: [AdminComponent, ProfileComponent],
    imports: [
        routing,
        MainModule,
        // FIXME: Borrar esto cuando este seguro que no va mas
    //    BrowserAnimationsModule,
        NgbModule.forRoot(),
        ToastyModule.forRoot(),
        McBreadcrumbsModule.forRoot(),
        CoreModule
    ],
    providers: [
        AuthGuard,
        AuthService,
        SocketService
    ]
})

export class AdminModule { }