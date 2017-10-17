import { Http, Response, Headers } from '@angular/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ErrorService } from '../../shared/errors/error.service';
import { SocketService } from '../../shared/socket.service';
import { Appointment } from './appointment.model';

/**
 * Manage appointment.
 * @module AppointmentService
 */
@Injectable()
export class AppointmentService {
    private host: string = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;

    constructor(public http: Http,
        private errorService: ErrorService
    ) { }

    /**
     * Get appointments
     */
    list() {
        let token = localStorage.getItem('token');
        const headers = new Headers({ 'Authorization': token, 'Content-Type': 'application/json' });
        return this.http.get(this.host + '/appointment/list', { headers: headers }) // TODO: Listar los turnos del usuario
            .map((response: Response) => {
                const result = response.json();
                return result;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    /**
    * Save the appointment
    */
    save(appointment: Appointment) {
        const body = JSON.stringify(appointment);
        console.log(body);
        let token = localStorage.getItem('token');
        const headers = new Headers({ 'Authorization': token, 'Content-Type': 'application/json' });
        return this.http.post(this.host + '/appointment/', body, { headers: headers })
            .map((response: Response) => {
                const result = response.json();
                return result;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    /**
    * Update the appointment
    */
    update(id: string, appointment: any) {
        const body = JSON.stringify(appointment);
        let token = localStorage.getItem('token');
        const headers = new Headers({ 'Authorization': token, 'Content-Type': 'application/json' });
        return this.http.patch(this.host + '/appointment/' + id, body, { headers: headers })
            .map((response: Response) => {
                const result = response.json();
                return result;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
    
    /**
    * Delete the appointment
    */
    delete(id: string) {
        let token = localStorage.getItem('token');
        const headers = new Headers({ 'Authorization': token, 'Content-Type': 'application/json' });
        return this.http.delete(this.host + '/appointment/' + id, { headers: headers })
            .map((response: Response) => {
                const result = response.json();
                return result;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
}