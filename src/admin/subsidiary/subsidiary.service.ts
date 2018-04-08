import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SocketService } from '../../shared/socket.service';
import { Subsidiary } from './subsidiary.model';

/**
 * Manage subsidiary.
 * @module SubsidiaryService
 */
@Injectable()
export class SubsidiaryService {
    constructor(private http: HttpClient
    ) { }

    /**
     * Get subsidiary
     */
    list() {
        return this.http.get<Array<Subsidiary>>('/subsidiary/list');
    }

    /**
    * Save the subsidiary
    */
    save(subsidiary: Subsidiary) {
        return this.http.post('/subsidiary/', subsidiary);
    }
}