import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './configuration.routing';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { SocketService } from '../../shared/socket.service';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../auth/auth.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StartComponent } from './start.component';
import { ConfigurationService } from './configuration.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArchwizardModule } from 'ng2-archwizard';
import { LocationService } from '../../shared/location.service';

@NgModule({
    declarations: [StartComponent],
    exports: [CommonModule,
        FormsModule,
        RouterModule,
        StartComponent],
    imports: [
        routing,
        CommonModule,
        NgbModule,
        ArchwizardModule,
        HttpModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule.forRoot()
    ],
    providers: [SocketService,
        ConfigurationService,
        LocationService,
        AuthService]
})

export class StartModule { }