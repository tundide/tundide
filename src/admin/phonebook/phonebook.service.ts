import { Http, Response, Headers } from '@angular/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../../@core/utils/http.service';
import { SocketService } from '../../shared/socket.service';
import { Contact } from './contact.model';

/**
 * Manage phonebook.
 * @module PhonebookService
 */
@Injectable()
export class PhonebookService {
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
     * Find appointments
     */
    find(search: string) {
        return this.httpService.get('/contact/find?search=' + search)
            .map((response: Response) => {
                return this.httpService.response(response).data;
            })
            .catch((error: Response) => {
                return this.httpService.catch(error);
            });
    }

    /**
    * Save the contact
    */
    save(contact: Contact) {
        return this.httpService.post('/contact/', contact)
            .map((response: Response) => {
                return this.httpService.response(response);
            })
            .catch((error: Response) => {
                return this.httpService.catch(error);
            });
    }
}