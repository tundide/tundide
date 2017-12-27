import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routing } from './settings.routing';
import { AlertComponent } from './alert.component';
import { AuthService } from '../../auth/auth.service';
import { SocketService } from '../../shared/socket.service';
import { AuthGuard } from '../../auth/auth-guard.service';
import {ArchwizardModule} from 'ng2-archwizard';

@NgModule({
    declarations: [AlertComponent],
    exports: [AlertComponent],
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