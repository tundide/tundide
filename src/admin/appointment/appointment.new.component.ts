import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { PhonebookService } from '../phonebook/phonebook.service';
import { AppointmentService } from './appointment.service';
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

    formatterContact = (x: { firstName: string, lastName: string }) => x.firstName + ' ' + x.lastName;

    searchDoctor = (text$: Observable<string>) =>
        text$
            .debounceTime(200)
            .distinctUntilChanged()
            .switchMap(term => this.phonebookService.find(term))

    formatterDoctor = (x: { firstName: string, lastName: string }) => x.firstName + ' ' + x.lastName;

    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private appointmentService: AppointmentService,
        private phonebookService: PhonebookService) {

        this.appointmentGroup = this.formBuilder.group({
            contact: this.formBuilder.control(''),
            description: this.formBuilder.control(''),
            doctor: this.formBuilder.control(''),
            endDate: this.formBuilder.control(moment().add(1, 'hours').toDate()),
            startDate: this.formBuilder.control(moment().toDate()),
            subsidiary: this.formBuilder.control('')
        });

    }

    ngOnInit() {
        this.roles = this.authService.getUserCredentials().roles;
    }

    hasRole(role) {
        return _.some(this.roles, function (_role) {
            return _role === role;
        });
    }

    saveAppointment() {
        let app = new Appointment();
        app.contact = this.appointmentGroup.get('contact').value._id;
        app.description = this.appointmentGroup.get('description').value;
        app.startDate = this.appointmentGroup.get('startDate').value;
        app.endDate = this.appointmentGroup.get('endDate').value;

        this.appointmentService.save(app)
            .subscribe(response => {
                this.router.navigate(['/appointment/list']);
            });
    }
}