import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions } from 'ng2-toasty';
import { RecordService } from './record.service';
import { Record } from './record.model';
import * as moment from 'moment';

@Component({
    selector: 'record',
    styleUrls: ['record.list.component.scss'],
    templateUrl: 'record.list.component.html'
})
export class RecordListComponent implements OnInit {
    private contacts: Array<Record>;

    constructor(private router: Router,
        private toastyService: ToastyService,
        private recordService: RecordService,
        private toastyConfig: ToastyConfig) {
        this.toastyConfig.theme = 'bootstrap';
    }

    ngOnInit() {
        this.recordService.list()
            .subscribe(data => {
                if (data) {
                    this.contacts = data;
                }
            });
    }
}