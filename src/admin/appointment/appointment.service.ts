import { Response, Headers } from '@angular/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { SocketService } from '../../shared/socket.service';
import { Appointment } from './appointment.model';
import { HttpService } from '../../@core/utils/http.service';

/**
 * Manage appointment.
 * @module AppointmentService
 */
@Injectable()
export class AppointmentService {
    constructor(private httpService: HttpService
    ) { }

    /**
     * Get appointments
     */
    list() {
        return this.httpService.get('/appointment/list')
            .map((response: Response) => {
                return this.httpService.response(response);
            })
            .catch((error: Response) => {
                return this.httpService.catch(error);
            });
    }

    /**
    * Save the appointment
    */
    save(appointment: Appointment) {
        return this.httpService.post('/appointment/', appointment)
            .map((response: Response) => {
                return this.httpService.response(response);
            })
            .catch((error: Response) => {
                return this.httpService.catch(error);
            });
    }

    /**
    * Update the appointment
    */
    update(id: string, appointment: any) {
        return this.httpService.patch('/appointment/' + id, appointment)
            .map((response: Response) => {
                return this.httpService.response(response);
            })
            .catch((error: Response) => {
                return this.httpService.catch(error);
            });
    }

    /**
    * Delete the appointment
    */
    delete(id: string) {
        return this.httpService.delete('/appointment/' + id)
            .map((response: Response) => {
                return this.httpService.response(response);
            })
            .catch((error: Response) => {
                return this.httpService.catch(error);
            });
    }
}