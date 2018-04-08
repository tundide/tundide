import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { SocketService } from '../../shared/socket.service';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
const _find = require('lodash/find');

@Component({
    selector: 'medicine',
    styleUrls: ['medicine.component.scss'],
    templateUrl: 'medicine.component.html',
})

export class MedicineComponent implements OnInit {

    public user;
    public selectedProvince;
    public provinces = [];
    public locations = [];

    private firstIncomeGroup: FormGroup;
    //    private types = (<any>companyTypesList);

    searchLocation = (text$: Observable<string>) =>
        text$
            .debounceTime(200)
            .distinctUntilChanged()
            .map(term => term.length < 2 ? []
                : _find(this.provinces, (o: any) => {
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

    constructor(private router: Router,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private socketService: SocketService) {
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

    ngOnInit() {
        this.user = this.authService.getUserCredentials();

        this.authService.onUserDataLoad.subscribe((user) => {
            this.user = user;
        });


    }
}