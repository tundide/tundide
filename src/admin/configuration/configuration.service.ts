import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { SocketService } from '../../shared/socket.service';

/**
 * Manage Configuration.
 * @module ConfigurationService
 */
@Injectable()
export class ConfigurationService {
    constructor(private http: HttpClient
    ) { }

    /**
     * Skip Configuration
     */
    skip(id: string) {
        return this.http.post('/configuration/skip', {
            user: id
        });
    }
}