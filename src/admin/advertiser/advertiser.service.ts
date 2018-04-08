import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SocketService } from '../../shared/socket.service';

/**
 * Manage advertiser.
 * @module AdvertiserService
 */
@Injectable()
export class AdvertiserService {
    /**
     * Event fired when the client wants to advertise to the advertiser
     * @event      onContactAdvertiser.
     */
    @Output() onContactAdvertiser: EventEmitter<any> = new EventEmitter();

    private socketService: SocketService;
    private host: string = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;

    constructor(public http: HttpClient) {
        this.onContactAdvertiser = new EventEmitter();

        this.socketService = new SocketService();
    }

    /**
     * Send Messageto the advertiser
     */
    sendMessage(message: string) {
        return this.http.patch(this.host + '/message/', {});
        // WebSocket
        // TODO: Revisar el manejo de WebSockets
        // this.socketService.socket.emit('create', 'crear mensaje');
    }
}