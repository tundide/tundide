import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ToastyService, ToastyConfig, ToastOptions } from 'ng2-toasty';
import { LoggerService } from '../utils/logger.service';

@Injectable()
export class ErrorHandlerInterceptor implements ErrorHandler {
    constructor(private injector: Injector,
        private toastyService: ToastyService,
        private toastyConfig: ToastyConfig) {
        this.toastyConfig.theme = 'bootstrap';
    }
    handleError(error) {
        const loggingService = this.injector.get(LoggerService);
        const location = this.injector.get(LocationStrategy);
        const message = error.message ? error.message : error.toString();
        const url = location instanceof PathLocationStrategy
            ? location.path() : '';

        if (error.error instanceof Error) {
            // A client-side or network error occurred.
            console.log('An error occurred:', error.error.message);
        } else {
            // Backend returns unsuccessful response codes such as 404, 500 etc.
            if (error.status === 500) {
                this.toastyService.error({
                    msg: 'Ocurrio un error inesperado',
                    showClose: true,
                    theme: 'bootstrap',
                    timeout: 5000,
                    title: 'Ocurrio un error.'
                });

                loggingService.log({ message, url, error }); // TODO: Sumar servicio de logs ejemplo loggify para manejar estos errores
            }
        }
    }

}