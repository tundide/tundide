import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { GrowlService } from '../../@core/utils/growl.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from '../../shared/components/calendar/calendar.component';
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment.model';
import * as moment from 'moment';
import * as _ from 'lodash';

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
// FIXME: No se usa mas creo
// interface IAppointment {
//     _id: string;
//     startDate: Date;
//     endDate: Date;
//     appointmentId: string;
//     shortId: string;
//     description: string;
//     contact: string;
//     status: number;
// }

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
                    title: 'Solicitud de cancelaci&oacute;n de turno.',
                    msg: 'Se cancelo el turno solicitado.'
                });

                _.remove(this.calendar.events, {
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
                                title: 'Solicitud de modificaci&oacute;n de turno.',
                                msg: 'Se modifico el turno solicitado.'
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
        private growlService: GrowlService) {

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
                title: 'Solicitud de cambio de turno generada.',
                msg: 'Se solicito un cambio de turno correctamente.'
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
                    _.forEach(res, (appointment, key) => {
                        console.log(appointment);
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

                        evento.actions = [this.changeReservationButton, this.cancelButton];
                        evento.color = colors.blue;

                        this.calendar.addEvent(evento);
                    });
                }
            });
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