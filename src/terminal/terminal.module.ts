import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TerminalComponent } from './terminal.component';
import { routing } from './terminal.routing';

@NgModule({
    bootstrap: [TerminalComponent],
    declarations: [TerminalComponent],
    imports: [routing,
        NgbModule.forRoot()
    ]
})

export class TerminalModule { }