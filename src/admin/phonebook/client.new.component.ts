import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastyService, ToastyConfig, ToastOptions } from 'ng2-toasty';
import { AuthService } from '../../auth/auth.service';
import { PhonebookService } from './phonebook.service';
import { LocationService } from '../../shared/location.service';
import { Client } from './client.model';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import * as _ from 'lodash';

@Component({
    selector: 'client',
    styleUrls: ['client.new.component.scss'],
    templateUrl: 'client.new.component.html'
})

export class ClientNewComponent implements OnInit {
    public provinces = [];
    public locations = [];
    public selectedPlace: any;

    private roles: Array<String>;
    private client: Client;
    private clientGroup: FormGroup;

    searchLocation = (text$: Observable<string>) =>
        text$
            .debounceTime(200)
            .distinctUntilChanged()
            .map(term => term.length < 2 ? []
                : _.find(this.provinces, (o: any) => {
                    return o.code === this.client.location.province;
                }).locations.filter(v => new RegExp(term, 'gi').test(v.description)).splice(0, 10))

    formatter = (x: { description: string }) => x.description;

    placeChange(event) {
        this.client.location.place = event.item.code;
    }

    provinceChange(event) {
        const ctrl = this.clientGroup.get('location.place');

        if (event.value !== 0) {
            ctrl.enable();
        } else {
            ctrl.disable();
        }
    }

    constructor(private authService: AuthService,
        private locationService: LocationService,
        private formBuilder: FormBuilder,
        private toastyService: ToastyService,
        private toastyConfig: ToastyConfig,
        private phonebookService: PhonebookService) {
        this.toastyConfig.theme = 'bootstrap';

        this.client = new Client();

        this.clientGroup = this.formBuilder.group({
            firstName: this.formBuilder.control('', [Validators.required]),
            lastName: this.formBuilder.control('', [Validators.required]),
            location: this.formBuilder.group({
                place: this.formBuilder.control({ value: '', disabled: true }, [Validators.required]),
                province: this.formBuilder.control('', [Validators.required])
            })
        });
    }

    ngOnInit() {
        this.client = new Client();
        this.roles = this.authService.getUserCredentials().roles;

        this.locationService.list().subscribe(
            res => {
                this.provinces = res.data;
            }
        );
    }

    hasRole(role) {
        return _.some(this.roles, function (_role) {
            return _role === role;
        });
    }

    save() {
        this.phonebookService.save(this.client)
            .subscribe(response => {
                this.toastyService.success({
                    msg: response.message,
                    showClose: true,
                    theme: 'bootstrap',
                    timeout: 5000,
                    title: 'Cliente guardado con exito.'
                });
            });
    }
}