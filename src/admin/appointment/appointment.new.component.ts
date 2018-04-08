import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { GrowlService } from '../../@core/utils/growl.service';
import { StorageService } from '../../@core/utils/storage.service';
import { AuthService } from '../../auth/auth.service';
import { PhonebookService } from '../phonebook/phonebook.service';
import { AppointmentService } from './appointment.service';
import { SubsidiaryService } from '../subsidiary/subsidiary.service';
import { Appointment } from './appointment.model';
import { NgOption } from '@ng-select/ng-select';
import { ElementRef, ComponentRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
const _some = require('lodash/some');
const _forEach = require('lodash/forEach');
import * as moment from 'moment';

interface ISubsidiary {
    _id: string;
    code: string;
    description: string;
}

@Component({
    selector: 'appointment',
    styleUrls: ['appointment.new.component.scss'],
    templateUrl: 'appointment.new.component.html'
})

export class AppointmentNewComponent implements OnInit {

    private roles: Array<String>;
    private appointmentGroup: FormGroup;
    private subsidiaryOptions: Array<NgOption>;
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

    searchParticipant = (text$: Observable<string>) =>
        text$
            .debounceTime(200)
            .distinctUntilChanged()
            .switchMap(term => this.phonebookService.find(term))

    formatterParticipant = (x: { firstName: string, lastName: string }) => x.firstName + ' ' + x.lastName;

    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private appointmentService: AppointmentService,
        private subsidiaryService: SubsidiaryService,
        private growlService: GrowlService,
        private storageService: StorageService,
        private phonebookService: PhonebookService) {

        let startDate = moment();
        let endDate = moment().add(1, 'h');
        let contact = '';

        let startDateSession = storageService.getAndRemove('appointment.startDate');
        let contactSession = storageService.getAndRemove('appointment.contact');

        if (startDateSession) {
            startDate = moment(startDateSession);
            endDate = moment(startDateSession).add(1, 'h');
        }

        if (contactSession) {
            contact = contactSession;
        }

        let ngbDateStructStartDate = {
            day: startDate.date(),
            hour: startDate.hour(),
            minute: startDate.minutes(),
            month: startDate.month() + 1,
            second: startDate.seconds(),
            year: startDate.year()
        };

        let ngbDateStructEndDate = {
            day: endDate.date(),
            hour: endDate.hour(),
            minute: endDate.minutes(),
            month: endDate.month() + 1,
            second: endDate.seconds(),
            year: endDate.year()
        };

        this.appointmentGroup = this.formBuilder.group({
            contact: this.formBuilder.control(contact),
            description: this.formBuilder.control(''),
            endDate: this.formBuilder.control(ngbDateStructEndDate, Validators.required),
            endTime: this.formBuilder.control(ngbDateStructEndDate, Validators.required),
            participant: this.formBuilder.control(''),
            startDate: this.formBuilder.control(ngbDateStructStartDate, Validators.required),
            startTime: this.formBuilder.control(ngbDateStructStartDate, Validators.required),
            subsidiary: this.formBuilder.control('')
        });
    }

    ngOnInit() {
        this.roles = this.authService.getUserCredentials().roles;

        this.subsidiaryService.list().subscribe(
            data => {
                this.subsidiaryOptions = new Array<NgOption>();
                console.log(data);

                _forEach(data, (subsidiary, key) => {
                    this.subsidiaryOptions.push({
                        label: subsidiary.code + ' - ' + subsidiary.description,
                        value: subsidiary._id
                    });
                });

            }, (error: HttpErrorResponse) => {
                if (error.status === 400) {
                    this.growlService.badRequest();
                } else if (error.status === 500) {
                    this.growlService.internalServerError();
                }
            }
        );
    }

    hasRole(role) {
        return _some(this.roles, function (_role) {
            return _role === role;
        });
    }

    saveAppointment() {
        let app = new Appointment();
        app.contact = this.appointmentGroup.get('contact').value._id;
        app.description = this.appointmentGroup.get('description').value;

        let ngbDateStart = this.appointmentGroup.get('startDate').value;
        let ngbTimeStart = this.appointmentGroup.get('startTime').value;

        app.startDate = new Date(ngbDateStart.year, ngbDateStart.month - 1, ngbDateStart.day,
            ngbTimeStart.hour, ngbTimeStart.minute, ngbTimeStart.second);

        let ngbDateEnd = this.appointmentGroup.get('endDate').value;
        let ngbTimeEnd = this.appointmentGroup.get('endTime').value;

        app.endDate = new Date(ngbDateEnd.year, ngbDateEnd.month - 1, ngbDateEnd.day,
            ngbTimeEnd.hour, ngbTimeEnd.minute, ngbTimeEnd.second);

        app.subsidiary = this.appointmentGroup.get('subsidiary').value;

        this.appointmentService.save(app)
            .subscribe(response => {
                this.growlService.success({
                    msg: 'Se dio de alta el turno exitosamente.',
                    title: 'Alta de turno.'
                });
                this.router.navigate(['/appointment']);
            });
    }
}