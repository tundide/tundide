import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { GrowlService } from '../../@core/utils/growl.service';
import { StorageService } from '../../@core/utils/storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from '../../shared/components/calendar/calendar.component';
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment.model';
import * as moment from 'moment';
const _remove = require('lodash/remove');
const _forEach = require('lodash/forEach');

import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent
} from 'angular-calendar';

const colors: any = {
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
    },
    green: {
        primary: '#51FF68',
        secondary: '#D2FFE9'
    },
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
    }
};

@Component({
    selector: 'appointments',
    styleUrls: ['appointment.list.component.scss'],
    templateUrl: 'appointment.list.component.html'
})
export class AppointmentListComponent implements OnInit {
    public isActive = false;
    public showMenu = '';
    @ViewChild('calendar') calendar: CalendarComponent;
    @ViewChild('changeReservationModal') modal: NgbModal;
    public events: CalendarEvent[] = [];

    public cancelButton = {
        label: '<i class="fa fa-fw fa-times" title="Cancelar turno"></i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
            this.appointmentService.delete(event.meta.appointment._id).subscribe(res => {
                this.growlService.success({
                    msg: 'Se cancelo el turno solicitado.',
                    title: 'Solicitud de cancelaci&oacute;n de turno.'
                });

                _remove(this.calendar.events, {
                    meta: {
                        appointment: {
                            _id: event.meta.appointment._id
                        }
                    }
                });

                this.calendar.refresh.next();
            });
        }
    };

    public changeReservationButton = {
        label: '<i class="fa fa-fw fa-clock-o" title="Solicitar cambio de horario"></i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {

            this.modalService.open(this.modal).result.then((result) => {
                if (result) {
                    let app = new Appointment();
                    app._id = event.meta.appointment._id;
                    app.description = event.meta.appointment.description;
                    app.endDate = event.end;
                    app.startDate = event.start;
                    this.appointmentService.update(app)
                        .subscribe(data => {
                            this.growlService.success({
                                msg: 'Tambien enviamos un aviso al participante para que este informado.',
                                title: 'Solicitud de modificaci&oacute;n de turno.'
                            });
                        }, (error: HttpErrorResponse) => {
                            if (error.status === 400) {
                                this.growlService.badRequest();
                            } else if (error.status === 500) {
                                this.growlService.internalServerError();
                            }
                        });
                }
            });
        }
    };

    private appointment: Appointment;

    constructor(private router: Router,
        private appointmentService: AppointmentService,
        private modalService: NgbModal,
        private growlService: GrowlService,
        private storageService: StorageService) {

    }

    eventClick(event) {
        this.router.navigate(['/view', event.meta.publication]);
    }

    eventTimesChanged(event) {
        let app = new Appointment();
        app._id = event.meta.appointment._id;
        app.description = event.meta.appointment.description;
        app.endDate = event.end;
        app.startDate = event.start;

        this.appointmentService.update(app).subscribe(res => {
            event.actions = [this.cancelButton];
            event.color = colors.yellow;
            this.growlService.success({
                msg: 'Tambien enviamos un aviso al participante para que este informado.',
                title: 'Solicitud de cambio de turno generada.'
            });
        }, (error: HttpErrorResponse) => {
            if (error.status === 400) {
                this.growlService.badRequest();
            } else if (error.status === 500) {
                this.growlService.internalServerError();
            }
        });
    }

    ngOnInit() {
        this.appointmentService.list()
            .subscribe(res => {
                if (res) {
                    _forEach(res, (appointment, key) => {
                        let startDate = moment(appointment.startDate);
                        let endDate = moment(appointment.endDate);

                        let evento = {
                            actions: [],
                            color: colors.green,
                            draggable: true,
                            end: endDate.toDate(),
                            meta: {
                                appointment: appointment
                            },
                            resizable: {
                                afterEnd: true,
                                beforeStart: true
                            },
                            start: startDate.toDate(),
                            title: '(' + startDate.format('HH:mm') + '-'
                                + endDate.format('HH:mm') + ') ' + appointment.description
                        };

                        switch (appointment.status) {
                            case 1:
                                evento.actions = [this.changeReservationButton, this.cancelButton];
                                evento.color = colors.green;
                                break;
                            case 3:
                                evento.actions = [this.changeReservationButton, this.cancelButton];
                                evento.color = colors.yellow;
                                break;
                        }

                        this.calendar.addEvent(evento);
                    });
                }
            });
    }

    addAppointment(date) {
        this.storageService.set('appointment.startDate', date);
        this.router.navigate(['/appointment/new']);
    }

    changeAppointment(appointment: Appointment) {
        this.appointment = appointment;
    }
    eventCalled() {
        this.isActive = !this.isActive;
    }
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
}