import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ProfileComponent } from './profile/profile.component';
import { AlertComponent } from './settings/alert.component';
import { routing } from './admin.routing';
import { SharedModule } from '../../shared/shared.module';
import { DataTableModule } from 'angular2-datatable';
import { ErrorService } from '../../shared/errors/error.service';
import { SocketService } from '../../shared/socket.service';
import { AuthGuard } from '../../auth/auth-guard.service';
import { BusyModule } from 'angular2-busy';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { AuthService } from '../../auth/auth.service';

@NgModule({
    declarations: [AdminComponent,
        ProfileComponent,
        AlertComponent],
    exports: [AdminComponent],
    imports: [routing,
        FormsModule,
        RouterModule,
        CommonModule,
        DataTableModule,
        BusyModule,
        SharedModule.forRoot(),
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'danger'
        })],
    providers: [AuthGuard,
        AuthService,
        ErrorService,
        SocketService]
})

export class AdminModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AdminModule
        };
    }
}