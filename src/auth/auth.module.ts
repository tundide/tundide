import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
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
import { CoreModule } from '../@core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    bootstrap: [AuthComponent],
    declarations: [AuthComponent, SigninComponent, SignoutComponent, ConfirmComponent],
    exports: [AuthComponent, SigninComponent, SignoutComponent, ConfirmComponent],
    imports: [
        routing,
        RouterModule,
        CommonModule,
        // FIXME: Borrar cunado este seguro
     //   BrowserModule,
        ReCaptchaModule,
        NgxErrorsModule,
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        NgbModule.forRoot()],
    providers: [
        AuthGuard,
        AuthService,
        SocketService
    ]
})

export class AuthModule { }