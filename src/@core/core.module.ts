import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AnalyticsService } from './utils/analytics.service';
import { LoggerService } from './utils/logger.service';
import { GrowlService } from './utils/growl.service';
import { StorageService } from './utils/storage.service';
import { CryptService } from './utils/crypt.service';
import { AuthInterceptor } from './utils/auth.interceptor';
import { HttpRequestInterceptor } from './utils/httprequest.interceptor';
import { ErrorHandlerInterceptor } from './utils/errorhandler.interceptor';
import { RequestOptions } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastyModule } from 'ng2-toasty';

@NgModule({
    imports: [
        NgbModule.forRoot(),
        HttpClientModule,
        ToastyModule.forRoot()
    ],
    providers: [
        AnalyticsService,
        LoggerService,
        GrowlService,
        StorageService,
        CryptService,
        // TODO: Revisar si es necesario el interceptor para agregar la primer parte de la ruta en los httprequest
        // { provide: RequestOptions, useClass: HttpRequestInterceptor },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: ErrorHandler, useClass: ErrorHandlerInterceptor }
    ]
})

export class CoreModule { }