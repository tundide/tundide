import { Component, OnInit } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions } from 'ng2-toasty';
import { AuthService } from '../../auth/auth.service';
import { PhonebookService } from './phonebook.service';
import { Client } from './client.model';
import * as _ from 'lodash';

@Component({
    selector: 'client',
    styleUrls: ['client.new.component.scss'],
    templateUrl: 'client.new.component.html'
})

export class ClientNewComponent implements OnInit {
    private roles: Array<String>;
    private client: Client;

    constructor(private authService: AuthService,
        private toastyService: ToastyService,
        private toastyConfig: ToastyConfig,
        private phonebookService: PhonebookService) {
        this.toastyConfig.theme = 'bootstrap';
    }

    ngOnInit() {
        this.client = new Client();
        this.roles = this.authService.getUserCredentials().roles;
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