import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
    private roles: Array<String>;
    private appointment: Appointment;
    private appointmentGroup: FormGroup;

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

    constructor(private formBuilder: FormBuilder,
        private authService: AuthService,
        private phonebookService: PhonebookService) {

        this.appointmentGroup = this.formBuilder.group({
            reason: this.formBuilder.control(''),
            client: this.formBuilder.control(''),
            doctor: this.formBuilder.control(''),
            startDate: this.formBuilder.control( moment().toDate()),
            endDate: this.formBuilder.control( moment().add(1, 'hours').toDate())
        });

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
}