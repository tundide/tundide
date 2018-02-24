import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './configuration.routing';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { SocketService } from '../../shared/socket.service';
import { AuthService } from '../../auth/auth.service';
import { StartComponent } from '../configuration/start.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [StartComponent],
    exports: [CommonModule,
        FormsModule,
        RouterModule,
        StartComponent],
    imports: [
        routing,
        CommonModule,
        HttpModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [SocketService,
        AuthService]
})

export class StartModule { }