import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { StorageService } from './storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private storageService: StorageService
    ) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.storageService.get('token', true);

        if (token) {
            const authReq = req.clone({
                headers: req.headers.set('Authorization', token)
            });

            return next.handle(authReq);
        }

        return next.handle(req);
        // TODO: Si hay error disparar esto
        // this.errorOccurred.emit(res);
    }
}