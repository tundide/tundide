import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions } from 'ng2-toasty';
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

interface IAppointment {
    _id: string;
    startDate: Date;
    endDate: Date;
    appointmentId: string;
    shortId: string;
    description: string;
    status: number;
}

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
            // this.reservationService.cancel(event.meta.publication, { 'reservation': event.meta.reservation }).subscribe(res => {
            //     if (event.meta.myPub) {
            //         event.actions = [];
            //         event.color = colors.red;
            //     } else {
            //         event.actions = [];
            //         event.color = colors.red;
            //     }
            //     this.toastyService.success({
            //         msg: 'Se cancelo el turno solicitado',
            //         showClose: true,
            //         theme: 'bootstrap',
            //         timeout: 5000,
            //         title: 'Solicitud de cancelacion de turno.'
            //     });
            // });
        }
    };

    public approveButton = {
        label: '<i class="fa fa-fw fa-check" title="Aprobar turno"></i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
            if (event.meta.myPub) {
                event.actions = [this.changeReservationButton, this.cancelButton];
                event.color = colors.green;
            } else {
                event.actions = [this.changeReservationButton, this.cancelButton];
                event.color = colors.green;
            }
        }
    };

    public changeReservationButton = {
        label: '<i class="fa fa-fw fa-clock-o" title="Solicitar cambio de horario"></i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {

            this.modalService.open(this.modal).result.then((result) => {
                if (result) {
                    this.appointmentService.update(event.meta.appointment._id, {
                        'description': event.meta.appointment.description,
                        'endDate': event.end,
                        'id': event.meta.appointment._id,
                        'startDate': event.start
                    })
                        .subscribe(data => {
                            this.toastyService.success({
                                msg: data.message,
                                showClose: true,
                                theme: 'bootstrap',
                                timeout: 5000,
                                title: 'Reserva solicitada con exito.'
                            });
                        });
                }
            });
        }
    };

    private appointment: Appointment;

    constructor(private router: Router,
        private toastyService: ToastyService,
        private appointmentService: AppointmentService,
        private modalService: NgbModal,
        private toastyConfig: ToastyConfig) {
        this.toastyConfig.theme = 'bootstrap';
    }

    addReservation() {
        this.appointment = new Appointment();
        this.modalService.open(this.modal).result.then((result) => {
            if (result) {
                this.appointmentService.save(this.appointment)
                    .subscribe(data => {
                        this.toastyService.success({
                            msg: data.message,
                            showClose: true,
                            theme: 'bootstrap',
                            timeout: 5000,
                            title: 'Reserva solicitada con exito.'
                        });
                    });
            }
        });
    }

    eventClick(event) {
        this.router.navigate(['/view', event.meta.publication]);
    }

    eventTimesChanged(event) {
        this.appointmentService.update(event.meta.appointment._id, {
            'description': event.meta.appointment.description,
            'endDate': event.end,
            'id': event.meta.appointment._id,
            'startDate': event.start
        }).subscribe(res => {
            if (res.status === 200) {
                event.actions = [this.cancelButton];
                event.color = colors.yellow;
                this.toastyService.info({
                    msg: res.data.message,
                    showClose: true,
                    theme: 'bootstrap',
                    timeout: 10000,
                    title: 'Solicitud de cambio de turno generada.'
                });
            }
        });
    }

    ngOnInit() {
        this.appointmentService.list()
            .subscribe(res => {
                if (res) {
                    _.forEach(<Array<IAppointment>>res.data, (appointment, key) => {
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
                            title: appointment.shortId + ' - (' + startDate.format('HH:mm') + '-'
                            + endDate.format('HH:mm') + ') ' + appointment.description
                        };
                        evento.actions = [this.approveButton, this.changeReservationButton, this.cancelButton];
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