import { Http, Response, Headers } from '@angular/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../../@core/utils/http.service';
import { SocketService } from '../../shared/socket.service';

/**
 * Manage stock.
 * @module StockService
 */
@Injectable()
export class StockService {
    constructor(private httpService: HttpService
    ) { }

    /**
     * Get stock
     */
    list() {
        return this.httpService.get('/stock/list')
            .map((response: Response) => {
                return this.httpService.response(response);
            })
            .catch((error: Response) => {
                return this.httpService.catch(error);
            });
    }
}