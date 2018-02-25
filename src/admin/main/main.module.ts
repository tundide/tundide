import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TopNavComponent } from './topnav/topnav.component';
// TODO: Por ahora el footer no esta en uso, ver si vale la pena agregarlo
// import { FooterComponent } from './footer/footer.component';

@NgModule({
    declarations: [
        TopNavComponent
        // FooterComponent
        ],
    exports: [CommonModule,
        RouterModule,
        TopNavComponent], // FooterComponent
    imports: [
        CommonModule,
        RouterModule,
    ]
})

export class MainModule { }