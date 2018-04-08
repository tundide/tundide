import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { LocationService } from '../../shared/location.service';
import { SocketService } from '../../shared/socket.service';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GrowlService } from '../../@core/utils/growl.service';
import { ConfigurationService } from './configuration.service';
import * as companyTypesList from './companyTypes.json';
const _find = require('lodash/find');

@Component({
    selector: 'start',
    styleUrls: ['start.component.scss'],
    templateUrl: 'start.component.html',
})

export class StartComponent implements OnInit {

    public user;
    public provinces = [];
    public locations = [];

    private firstIncomeGroup: FormGroup;
    private types = (<any>companyTypesList);


    searchLocation($index: any): (text: Observable<string>) => Observable<any[]> {
        let getLocations = (text$: Observable<string>) =>
            text$
                .debounceTime(200)
                .distinctUntilChanged()
                .map(term => {
                    let province = this.firstIncomeGroup.get(['subsidiaries', $index, 'location', 'province']).value;

                    let locations = _find(this.provinces, (o: any) => {
                        return o.code === province;
                    }).locations.filter(v => new RegExp(term, 'gi').test(v.description)).splice(0, 10);

                    return term.length < 2 ? [] : locations;
                });

        return getLocations;
    }

    searchUserLocation = (text$: Observable<string>) =>
        text$
            .debounceTime(200)
            .distinctUntilChanged()
            .map(term => term.length < 2 ? []
                : _find(this.provinces, (o: any) => {
                    return o.code === this.firstIncomeGroup.get(['user', 'location', 'province']).value;
                }).locations.filter(v => new RegExp(term, 'gi').test(v.description)).splice(0, 10))

    formatter = (x: { description: string }) => x.description;

    provinceChange(event, index) {
        const ctrl = this.firstIncomeGroup.get(['subsidiaries', index, 'location', 'place']);

        if (event.value !== 0) {
            ctrl.enable();
        } else {
            ctrl.disable();
        }
    }

    provinceUserChange(event) {
        const ctrl = this.firstIncomeGroup.get('user.location.place');

        if (event.value !== 0) {
            ctrl.enable();
        } else {
            ctrl.disable();
        }
    }

    constructor(private router: Router,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private locationService: LocationService,
        private growlService: GrowlService,
        private configurationService: ConfigurationService,
        private socketService: SocketService) {
        this.firstIncomeGroup = this.formBuilder.group({
            company: this.formBuilder.group({
                description: this.formBuilder.control('', [Validators.required]),
                name: this.formBuilder.control('', [Validators.required]),
                type: this.formBuilder.control('', [Validators.required])
            }),
            subsidiaries: this.formBuilder.array([]),
            user: this.formBuilder.group({
                document: this.formBuilder.control(''),
                firstName: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
                lastName: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
                location: this.formBuilder.group({
                    department: this.formBuilder.control(''),
                    floor: this.formBuilder.control(''),
                    number: this.formBuilder.control(''),
                    place: this.formBuilder.control({ value: '', disabled: true }),
                    province: this.formBuilder.control(''),
                    street: this.formBuilder.control('')
                })
            })
        });
    }

    removeSubsidiary(index) {
        (<FormArray>this.firstIncomeGroup.get('subsidiaries')).removeAt(index);
    }

    addSubsidiary(subsidiary: any) {
        let group = this.formBuilder.group({
            code: this.formBuilder.control('', [Validators.required]),
            description: this.formBuilder.control('', [Validators.required]),
            location: this.formBuilder.group({
                number: this.formBuilder.control(''),
                place: this.formBuilder.control({ value: '', disabled: true }),
                province: this.formBuilder.control(''),
                street: this.formBuilder.control('')
            })
        });
        subsidiary.push(group);
    }

    ngOnInit() {
        this.user = this.authService.getUserCredentials();

        this.authService.onUserDataLoad.subscribe((user) => {
            this.user = user;
        });

        this.locationService.list().subscribe(
            (data: any[]) => {
                this.provinces = data;
            });
    }

    configureLater() {

        this.configurationService.skip(this.user.id)
            .subscribe(response => {
                this.router.navigate(['../dashboard']);
            }, (error: HttpErrorResponse) => {
                if (error.status === 400) {
                    this.growlService.badRequest();
                } else if (error.status === 500) {
                    this.growlService.internalServerError();
                }
            });
    }
}