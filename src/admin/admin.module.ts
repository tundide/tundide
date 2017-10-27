import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { APP_CONFIG, AppConfig } from '../app.config';

@NgModule({
    bootstrap: [AdminComponent],
    declarations: [AdminComponent, ProfileComponent],
    imports: [
        routing,
        MainModule,
        BrowserAnimationsModule,
        NgbModule.forRoot(),
        ToastyModule.forRoot(),
        CoreModule
    ],
    providers: [
        AuthGuard,
        AuthService,
        SocketService,
        { provide: APP_CONFIG, useValue: AppConfig }
    ]
})

export class AdminModule { }