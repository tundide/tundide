import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import * as _ from 'lodash';

@Component({
    selector: 'appointment',
    styleUrls: ['appointment.component.scss'],
    templateUrl: 'appointment.component.html'
})

export class AppointmentComponent implements OnInit {
    constructor(
        private authService: AuthService) { }

    ngOnInit() {
        console.log('asdasd');
    }
}