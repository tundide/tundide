import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './database.routing';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { SocketService } from '../../shared/socket.service';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../auth/auth.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MedicineComponent } from './medicine.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [MedicineComponent],
    exports: [CommonModule,
        FormsModule,
        RouterModule,
        MedicineComponent],
    imports: [
        routing,
        CommonModule,
        NgbModule,
        HttpModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule.forRoot()
    ],
    providers: [SocketService,
        AuthService]
})

export class DatabaseModule { }