import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../auth/auth.service';
import { LocationService } from '../../shared/location.service';
import { Observable } from 'rxjs';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import * as _ from 'lodash';
import * as companyTypesList from './companyTypes.json';

@Component({
    selector: 'dashboard',
    styleUrls: ['dashboard.component.scss'],
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
    @ViewChild('firstincome') firstincomeModal: NgbModal;
    isActive = false;
    showMenu = '';
    public selectedProvince;
    public provinces = [];
    public locations = [];

    private firstIncomeGroup: FormGroup;
    private types = (<any>companyTypesList);

    private options: GridsterConfig;
    private dashboard: Array<GridsterItem>;

    searchLocation = (text$: Observable<string>) =>
        text$
            .debounceTime(200)
            .distinctUntilChanged()
            .map(term => term.length < 2 ? []
                : _.find(this.provinces, (o: any) => {
                    return o.code === this.selectedProvince;
                }).locations.filter(v => new RegExp(term, 'gi').test(v.description)).splice(0, 10))

    formatter = (x: { description: string }) => x.description;

    provinceChange(event) {
        const ctrl = this.firstIncomeGroup.get('subsidiary.location.place');

        if (event.value !== 0) {
            ctrl.enable();
        } else {
            ctrl.disable();
        }
    }

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private modalService: NgbModal,
        private locationService: LocationService) {

        this.firstIncomeGroup = this.formBuilder.group({
            company: this.formBuilder.group({
                description: this.formBuilder.control('', [Validators.required]),
                name: this.formBuilder.control('', [Validators.required]),
                type: this.formBuilder.control('', [Validators.required])
            }),
            document: this.formBuilder.control(''),
            firstName: this.formBuilder.control('', [Validators.required]),
            lastName: this.formBuilder.control('', [Validators.required]),
            subsidiary: this.formBuilder.group({
                code: this.formBuilder.control('', [Validators.required]),
                description: this.formBuilder.control('', [Validators.required]),
                location: this.formBuilder.group({
                    number: this.formBuilder.control(''),
                    place: this.formBuilder.control({ value: '', disabled: true }),
                    province: this.formBuilder.control(''),
                    street: this.formBuilder.control('')
                })
            })
        });
    }

    itemChange(item, itemComponent) {
        console.log('itemChanged', item, itemComponent);
    }

    itemResize(item, itemComponent) {
        console.log('itemResized', item, itemComponent);
    }

    removeItem(item) {
        this.dashboard.splice(this.dashboard.indexOf(item), 1);
    }

    addItem() {
        this.dashboard.push({});
    }

    ngOnInit() {
        this.options = {
            draggable: { enabled: true },
            itemChangeCallback: this.itemChange,
            itemResizeCallback: this.itemResize,
            pushResizeItems: true,
            resizable: { enabled: true },
        };

        this.dashboard = [
            { cols: 2, rows: 1, y: 0, x: 0 },
            { cols: 2, rows: 2, y: 0, x: 2 }
        ];

        this.locationService.list().subscribe(
            data => {
                this.provinces = data;
            });

        if (this.authService.getUserCredentials().firstIncome) {
            setTimeout(() => {
                this.modalService.open(this.firstincomeModal, { size: 'lg' }).result.then((result) => {
                    if (result) {
                        // TODO: Terminar proceso de firstIncome this.authService.complete('1');
                    }
                }, (reason) => {
                    alert(reason);
                });
            });
        }
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