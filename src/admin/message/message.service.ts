import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Message } from './message.model';
import { HttpService } from '../../@core/utils/http.service';
import { Observable } from 'rxjs';

/**
 * Manage message
 * @module MessageService
 */
@Injectable()
export class MessageService {
    private host: string = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;

    constructor(private http: Http,
        private httpService: HttpService) {
    }

    /**
     * Send message
     * @param  {Message} message The message object
     */
    send(message: Message) {
        const body = JSON.stringify(Message);
        let token = localStorage.getItem('token');
        const headers = new Headers({ 'Authorization': token, 'Content-Type': 'application/json' });
        return this.http.post(this.host + '/message', body, { headers: headers })
            .map((response: Response) => {
                return this.httpService.response(response);
            })
            .catch((error: Response) => {
                return this.httpService.catch(error);
            });
    }
}