import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions } from 'ng2-toasty';
import { StockService } from './stock.service';
import * as moment from 'moment';

@Component({
    selector: 'stock',
    styleUrls: ['stock.list.component.scss'],
    templateUrl: 'stock.list.component.html'
})
export class StockListComponent implements OnInit {
    constructor(private router: Router,
        private toastyService: ToastyService,
        private stockService: StockService,
        private toastyConfig: ToastyConfig) {
        this.toastyConfig.theme = 'bootstrap';
    }

    ngOnInit() {
        this.stockService.list()
            .subscribe(res => {
                if (res) {
                    alert('');
                }
            });
    }
}