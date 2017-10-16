import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Appointment } from './appointment.model';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    selector: 'appointment',
    styleUrls: ['appointment.new.component.scss'],
    templateUrl: 'appointment.new.component.html'
})

export class AppointmentNewComponent implements OnInit {
    @Output()
    changeAppointment: EventEmitter<Appointment> = new EventEmitter<Appointment>();

    private appointment: Appointment;
    private roles: Array<String>;

    constructor(private authService: AuthService) {
        this.appointment = new Appointment();
    }

    ngOnInit() {
        this.appointment.startDate = moment().toDate();
        this.appointment.endDate = moment().add(1, 'hours').toDate();
        this.roles = this.authService.getUserCredentials().roles;
    }

    hasRole(role) {
        return _.some(this.roles, function (_role) {
            return _role === role;
        });
    }

    appointmentChange() {
        this.changeAppointment.emit(this.appointment);
    }
}