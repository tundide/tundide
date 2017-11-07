import { Http, Response, Headers } from '@angular/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../../@core/utils/http.service';
import { SocketService } from '../../shared/socket.service';
import { Subsidiary } from './subsidiary.model';

/**
 * Manage subsidiary.
 * @module SubsidiaryService
 */
@Injectable()
export class SubsidiaryService {
    constructor(private httpService: HttpService
    ) { }

    /**
     * Get subsidiary
     */
    list() {
        return this.httpService.get('/subsidiary/list')
            .map((response: Response) => {
                return this.httpService.response(response);
            })
            .catch((error: Response) => {
                return this.httpService.catch(error);
            });
    }

    /**
    * Save the subsidiary
    */
    save(subsidiary: Subsidiary) {
        return this.httpService.post('/subsidiary/', subsidiary)
            .map((response: Response) => {
                return this.httpService.response(response);
            })
            .catch((error: Response) => {
                return this.httpService.catch(error);
            });
    }
}