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
    constructor(private httpService: HttpService
    ) { }

    /**
     * Get contact
     */
    list() {
        return this.httpService.get('/contact/list')
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
        return this.httpService.post('/contact/', contact)
            .map((response: Response) => {
                return this.httpService.response(response);
            })
            .catch((error: Response) => {
                return this.httpService.catch(error);
            });
    }
}