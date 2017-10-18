import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions } from 'ng2-toasty';
import { PhonebookService } from './phonebook.service';
import { Client } from './client.model';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
    selector: 'phonebook',
    styleUrls: ['phonebook.list.component.scss'],
    templateUrl: 'phonebook.list.component.html'
})
export class PhonebookListComponent implements OnInit {
    private client: Client;

    constructor(private router: Router,
        private toastyService: ToastyService,
        private phonebookService: PhonebookService,
        private toastyConfig: ToastyConfig) {
        this.toastyConfig.theme = 'bootstrap';
    }

    ngOnInit() {
        this.phonebookService.list()
            .subscribe(res => {
                if (res) {
                    alert('');
                }
            });
    }
}