import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions } from 'ng2-toasty';
import { SubsidiaryService } from './subsidiary.service';
import { Subsidiary } from './subsidiary.model';
import * as moment from 'moment';

@Component({
    selector: 'subsidiary',
    styleUrls: ['subsidiary.list.component.scss'],
    templateUrl: 'subsidiary.list.component.html'
})
export class SubsidiaryListComponent implements OnInit {
    private subsidiarys: Array<Subsidiary>;

    constructor(private router: Router,
        private toastyService: ToastyService,
        private subsidiaryService: SubsidiaryService,
        private toastyConfig: ToastyConfig) {
        this.toastyConfig.theme = 'bootstrap';
    }

    ngOnInit() {
        this.subsidiaryService.list()
            .subscribe(data => {
                if (data) {
                    this.subsidiarys = data;
                }
            });
    }
}