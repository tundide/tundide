import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SocketService } from '../../shared/socket.service';
import { Appointment } from './appointment.model';

/**
 * Manage appointment.
 * @module AppointmentService
 */
@Injectable()
export class AppointmentService {
    constructor(private http: HttpClient
    ) { }

    /**
     * Get appointments
     */
    list() {
        return this.http.get<Array<Appointment>>('/appointment/list');
    }

    /**
    * Save the appointment
    */
    save(appointment: Appointment) {
        return this.http.post('/appointment/', appointment);
    }

    /**
    * Update the appointment
    */
    update(appointment: Appointment) {
        return this.http.patch('/appointment/', appointment);
    }

    /**
    * Delete the appointment
    */
    delete(id: string) {
        return this.http.delete('/appointment/' + id);
    }
}