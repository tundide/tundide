import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routing } from './settings.routing';
import { NotificationsComponent } from './notifications.component';
import { GeneralComponent } from './general.component';
import { AuthService } from '../../auth/auth.service';
import { SocketService } from '../../shared/socket.service';
import { AuthGuard } from '../../auth/auth-guard.service';
import { ArchwizardModule } from 'ng2-archwizard';

@NgModule({
    declarations: [NotificationsComponent, GeneralComponent],
    exports: [NotificationsComponent, GeneralComponent],
    imports: [routing,
        FormsModule,
        RouterModule,
        ArchwizardModule,
        CommonModule],
    providers: [AuthService,
        AuthGuard,
        SocketService]
})

export class SettingsModule { }