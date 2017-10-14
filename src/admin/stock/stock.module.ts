import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routing } from './stock.routing';
import { AuthGuard } from '../../auth/auth-guard.service';
import { StockNewComponent } from './stock.new.component';
import { StockListComponent } from './stock.list.component';
import { StockService } from './stock.service';
import { SharedModule } from '../../shared/shared.module';
import { ToastyModule } from 'ng2-toasty';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [StockNewComponent, StockListComponent],
    exports: [StockNewComponent, StockListComponent],
    imports: [routing,
        FormsModule,
        RouterModule,
        CommonModule,
        NgbModule,
        SharedModule.forRoot(),
        ToastyModule.forRoot()],
    providers: [
        AuthGuard,
        StockService]
})

export class StockModule { }