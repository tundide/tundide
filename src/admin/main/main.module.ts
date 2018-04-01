import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TopNavComponent } from './topnav/topnav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarConfigurationComponent } from './sidebar/configuration.component';
import { NotFoundComponent } from './notfound/notfound.component';
import { SidebarSettingsComponent } from './sidebar/settings.component';

// TODO: Por ahora el footer no esta en uso, ver si vale la pena agregarlo
// import { FooterComponent } from './footer/footer.component';

@NgModule({
    declarations: [
        TopNavComponent,
        SidebarConfigurationComponent,
        SidebarComponent,
        SidebarSettingsComponent,
        NotFoundComponent
        // FooterComponent
    ],
    exports: [CommonModule,
        RouterModule,
        TopNavComponent,
        SidebarComponent,
        SidebarSettingsComponent,
        NotFoundComponent], // FooterComponent
    imports: [
        CommonModule,
        RouterModule,
    ]
})

export class MainModule { }