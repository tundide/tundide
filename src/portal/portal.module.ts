import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routing } from './portal.routing';
import { PortalComponent } from './portal.component';

@NgModule({
    declarations: [PortalComponent],
    exports: [PortalComponent],
    imports: [routing,
        FormsModule,
        RouterModule,
        CommonModule]
})

export class PortalModule { }