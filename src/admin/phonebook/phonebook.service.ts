import { Http, Response, Headers } from '@angular/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ErrorService } from '../../shared/errors/error.service';
import { SocketService } from '../../shared/socket.service';

/**
 * Manage phonebook.
 * @module PhonebookService
 */
@Injectable()
export class PhonebookService {
    private host: string = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;

    constructor(public http: Http,
        private errorService: ErrorService
    ) { }

    /**
     * Get phonebook
     */
    list() {
        let token = localStorage.getItem('token');
        const headers = new Headers({ 'Authorization': token, 'Content-Type': 'application/json' });
        return this.http.get(this.host + '/phonebook/list', { headers: headers }) // TODO: Listar los turnos del usuario
            .map((response: Response) => {
                const result = response.json();
                return result;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
}