import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routing } from './portal.routing';
import { PortalComponent } from './portal.component';
import { AuthService } from '../../auth/auth.service';
import { SocketService } from '../../shared/socket.service';
import { AuthGuard } from '../../auth/auth-guard.service';

@NgModule({
    declarations: [PortalComponent],
    exports: [PortalComponent],
    imports: [routing,
        FormsModule,
        RouterModule,
        CommonModule],
    providers: [AuthService,
        AuthGuard,
        SocketService]
})

export class PortalModule { }