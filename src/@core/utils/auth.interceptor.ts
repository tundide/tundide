import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem('token');

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