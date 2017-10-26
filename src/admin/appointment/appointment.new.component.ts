import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { PhonebookService } from '../phonebook/phonebook.service';
import { Appointment } from './appointment.model';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
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
    private datepickerOpts = {
        assumeNearbyYear: true,
        autoclose: true,
        format: 'D, d MM yyyy',
        startDate: new Date(2016, 5, 10),
        todayBtn: 'linked',
        todayHighlight: true,
    };

    searchContact = (text$: Observable<string>) =>
        text$
            .debounceTime(200)
            .distinctUntilChanged()
            .switchMap(term => this.phonebookService.find(term))

    formatter = (x: { firstName: string, lastName: string }) => x.firstName + ' ' + x.lastName;

    constructor(private authService: AuthService,
        private phonebookService: PhonebookService) {
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

    appointmentChange(date) {
        this.changeAppointment.emit(this.appointment);
    }
}