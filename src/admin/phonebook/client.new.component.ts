import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastyService, ToastyConfig, ToastOptions } from 'ng2-toasty';
import { AuthService } from '../../auth/auth.service';
import { PhonebookService } from './phonebook.service';
import { LocationService } from '../../shared/location.service';
import { Client } from './client.model';
import * as _ from 'lodash';

@Component({
    selector: 'client',
    styleUrls: ['client.new.component.scss'],
    templateUrl: 'client.new.component.html'
})

export class ClientNewComponent implements OnInit {
    public provinces = [];

    private roles: Array<String>;
    private client: Client;
    private clientGroup: FormGroup;

    constructor(private authService: AuthService,
        private locationService: LocationService,
        private formBuilder: FormBuilder,
        private toastyService: ToastyService,
        private toastyConfig: ToastyConfig,
        private phonebookService: PhonebookService) {
        this.toastyConfig.theme = 'bootstrap';

        this.clientGroup = this.formBuilder.group({
            firstName: this.formBuilder.control('', [Validators.required]),
            lastName: this.formBuilder.control('', [Validators.required]),
            location: this.formBuilder.group({
                place: this.formBuilder.control('', [Validators.required]),
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