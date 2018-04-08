import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from './message.model';
import { Observable } from 'rxjs/Observable';

/**
 * Manage message
 * @module MessageService
 */
@Injectable()
export class MessageService {
    constructor(private http: HttpClient) {
    }

    /**
     * Send message
     * @param  {Message} message The message object
     */
    send(message: Message) {
        return this.http.post('/message', message);
    }
}