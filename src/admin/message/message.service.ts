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
    constructor(private httpService: HttpService) {
    }

    /**
     * Send message
     * @param  {Message} message The message object
     */
    send(message: Message) {
        return this.httpService.post('/message', message)
            .map((response: Response) => {
                return this.httpService.response(response);
            })
            .catch((error: Response) => {
                return this.httpService.catch(error);
            });
    }
}