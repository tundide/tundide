import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TopNavComponent } from './topnav/topnav.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { SocketService } from '../../shared/socket.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [HomeComponent,
        SidebarComponent,
        TopNavComponent,
        FooterComponent],
    exports: [CommonModule,
        FormsModule,
        RouterModule,
        HomeComponent,
        SidebarComponent,
        TopNavComponent,
        FooterComponent],
    imports: [
        CommonModule,
        HttpModule,
        RouterModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule
    ],
    providers: [SocketService]
})

export class MainModule { }