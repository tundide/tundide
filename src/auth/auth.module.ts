import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SigninComponent } from './signin.component';
import { SignoutComponent } from './signout.component';
import { ConfirmComponent } from './confirm.component';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { routing } from './auth.routing';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth-guard.service';
import { ReCaptchaModule } from 'angular2-recaptcha';
import { SocketService } from '../shared/socket.service';
import { ErrorService } from '../shared/errors/error.service';
import { APP_CONFIG, AppConfig } from '../app.config';

@NgModule({
    bootstrap: [AuthComponent],
    declarations: [AuthComponent, SigninComponent, SignoutComponent, ConfirmComponent],
    exports: [AuthComponent, SigninComponent, SignoutComponent, ConfirmComponent],
    imports: [BrowserModule,
        HttpModule,
        routing,
        RouterModule,
        CommonModule,
        ReCaptchaModule,
        NgxErrorsModule,
        FormsModule,
        ReactiveFormsModule],
        providers: [
            AuthGuard,
            AuthService,
            SocketService,
            ErrorService,
            { provide: APP_CONFIG, useValue: AppConfig }
        ]
})

export class AuthModule { }