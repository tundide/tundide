import { Http, Response, Headers } from '@angular/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../../@core/utils/http.service';
import { SocketService } from '../../shared/socket.service';
import { Record } from './record.model';

/**
 * Manage phonebook.
 * @module RecordService
 */
@Injectable()
export class RecordService {
    private host: string = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;

    constructor(public http: Http,
        private httpService: HttpService
    ) { }

    /**
     * Get contact
     */
    list() {
        let token = localStorage.getItem('token');
        const headers = new Headers({ 'Authorization': token, 'Content-Type': 'application/json' });
        return this.http.get(this.host + '/contact/list', { headers: headers }) // TODO: Listar los contactos del usuario
            .map((response: Response) => {
                return this.httpService.response(response);
            })
            .catch((error: Response) => {
                return this.httpService.catch(error);
            });
    }

    /**
    * Save the contact
    */
    save(contact: Record) {
        const body = JSON.stringify(contact);
        let token = localStorage.getItem('token');
        const headers = new Headers({ 'Authorization': token, 'Content-Type': 'application/json' });
        return this.http.post(this.host + '/contact/', body, { headers: headers })
            .map((response: Response) => {
                return this.httpService.response(response);
            })
            .catch((error: Response) => {
                return this.httpService.catch(error);
            });
    }
}