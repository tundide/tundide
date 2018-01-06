import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { SocketService } from '../../shared/socket.service';
import { Record } from './record.model';

/**
 * Manage phonebook.
 * @module RecordService
 */
@Injectable()
export class RecordService {
    constructor(private http: HttpClient
    ) { }

    /**
     * Get contact
     */
    list() {
        return this.http.get<Array<Record>>('/contact/list');
    }

    /**
    * Save the contact
    */
    save(contact: Record) {
        return this.http.post('/contact/', contact);
    }
}