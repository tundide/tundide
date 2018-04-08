import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SocketService } from '../../shared/socket.service';

/**
 * Manage stock.
 * @module StockService
 */
@Injectable()
export class StockService {
    constructor(private http: HttpClient) { }

    /**
     * Get stock
     */
    list() {
        return this.http.get('/stock/list');
    }
}