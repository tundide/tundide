import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../auth/auth.service';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import * as _ from 'lodash';

@Component({
    selector: 'dashboard',
    styleUrls: ['dashboard.component.scss'],
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {

    static dashboard: Array<GridsterItem>;
    private options: GridsterConfig;

    static itemChange(item, itemComponent) {
        let dashboardItems = _.find(DashboardComponent.dashboard, function (obj) {
            return obj.id === item.id;
        });

        dashboardItems.cols = item.cols;
        dashboardItems.rows = item.rows;
        dashboardItems.y = item.y;
        dashboardItems.x = item.x;

        localStorage.setItem('dashboard.components', JSON.stringify(DashboardComponent.dashboard));
    }

    static itemResize(item, itemComponent) {
        let dashboardItems = _.find(DashboardComponent.dashboard, function (obj) {
            return obj.id === item.id;
        });

        dashboardItems.cols = item.cols;
        dashboardItems.rows = item.rows;
        dashboardItems.y = item.y;
        dashboardItems.x = item.x;

        localStorage.setItem('dashboard.components', JSON.stringify(DashboardComponent.dashboard));
    }


    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private modalService: NgbModal) { }

    removeItem(item) {
        DashboardComponent.dashboard.splice(DashboardComponent.dashboard.indexOf(item), 1);
    }

    addItem() {
        DashboardComponent.dashboard.push({});
    }

    selectItem(card) {
        return _.find(DashboardComponent.dashboard, function (obj) {
            return obj.id === card;
        });
    }
    ngOnInit() {
        this.options = {
            draggable: { enabled: true },
            itemChangeCallback: DashboardComponent.itemChange,
            itemResizeCallback: DashboardComponent.itemResize,
            pushResizeItems: true,
            resizable: { enabled: true },
        };

        let dashaboardCompoents = localStorage.getItem('dashboard.components');
        if (dashaboardCompoents === null) {
            DashboardComponent.dashboard = [
                { id: 'appointments', cols: 2, rows: 1, y: 0, x: 0 },
                { id: 'terminals', cols: 2, rows: 2, y: 0, x: 2 },
                { id: 'stock', cols: 2, rows: 2, y: 1, x: 2 }
            ];
        } else {
            DashboardComponent.dashboard = JSON.parse(dashaboardCompoents);
        }
    }
}