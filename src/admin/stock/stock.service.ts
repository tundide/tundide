import { Http, Response, Headers } from '@angular/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../../@core/utils/http.service';
import { SocketService } from '../../shared/socket.service';

/**
 * Manage stock.
 * @module StockService
 */
@Injectable()
export class StockService {
    private host: string = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;

    constructor(public http: Http,
        private httpService: HttpService
    ) { }

    /**
     * Get stock
     */
    list() {
        let token = localStorage.getItem('token');
        const headers = new Headers({ 'Authorization': token, 'Content-Type': 'application/json' });
        return this.http.get(this.host + '/stock/list', { headers: headers }) // TODO: Listar los stocks del usuario
            .map((response: Response) => {
                return this.httpService.response(response);
            })
            .catch((error: Response) => {
                return this.httpService.catch(error);
            });
    }
}