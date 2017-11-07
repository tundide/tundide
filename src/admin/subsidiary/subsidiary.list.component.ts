import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions } from 'ng2-toasty';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubsidiaryService } from './subsidiary.service';
import { Subsidiary } from './subsidiary.model';
import * as moment from 'moment';
import * as _ from 'lodash';

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
        private modalService: NgbModal,
        private toastyConfig: ToastyConfig) {
        this.toastyConfig.theme = 'bootstrap';
    }

    ngOnInit() {
        this.subsidiaryService.list()
            .subscribe(res => {
                if (res) {
                    this.subsidiarys = res.data;
                }
            });
    }
}