import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SocketService } from '../../shared/socket.service';
import { Contact } from './contact.model';

/**
 * Manage phonebook.
 * @module PhonebookService
 */
@Injectable()
export class PhonebookService {
    constructor(private http: HttpClient
    ) { }

    /**
     * Get contact
     */
    list() {
        return this.http.get<Array<Contact>>('/contact/list');
    }

    /**
     * Find contact
     */
    find(search: string) {
        return this.http.get('/contact/find?search=' + search);
    }

    /**
     * Get contact
     */
    get(id: string) {
        return this.http.get<Contact>('/contact/id/' + id);
    }

    /**
    * Save the contact
    */
    save(contact: Contact) {
        return this.http.post('/contact/', contact);
    }

    /**
    * Update the contact
    */
    update(contact: Contact) {
        return this.http.patch('/contact/', contact);
    }
}