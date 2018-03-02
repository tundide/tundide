import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { PhonebookService } from './phonebook.service';
import { LocationService } from '../../shared/location.service';
import { GrowlService } from '../../@core/utils/growl.service';
import { Contact } from './contact.model';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import * as _ from 'lodash';

@Component({
    selector: 'contact',
    styleUrls: ['contact.new.component.scss'],
    templateUrl: 'contact.new.component.html'
})

export class ContactNewComponent implements OnInit {
    public provinces = [];
    public locations = [];

    private roles: Array<String>;
    private contact: Contact;
    private contactGroup: FormGroup;

    searchLocation = (text$: Observable<string>) =>
        text$
            .debounceTime(200)
            .distinctUntilChanged()
            .map(term => term.length < 2 ? []
                : _.find(this.provinces, (o: any) => {
                    return o.code === this.contact.location.province;
                }).locations.filter(v => new RegExp(term, 'gi').test(v.description)).splice(0, 10))

    formatter = (x: { description: string }) => x.description;

    provinceChange(event) {
        const ctrl = this.contactGroup.get('location.place');

        if (event.value !== 0) {
            ctrl.enable();
        } else {
            ctrl.disable();
        }
    }

    constructor(private authService: AuthService,
        private locationService: LocationService,
        private growlService: GrowlService,
        private formBuilder: FormBuilder,
        private router: Router,
        private phonebookService: PhonebookService) {

        this.contact = new Contact();

        this.contactGroup = this.formBuilder.group({
            contact: this.formBuilder.group({
                cellPhone: this.formBuilder.control(''),
                email: this.formBuilder.control(''),
                phone: this.formBuilder.control('')
            }),
            document: this.formBuilder.control(''),
            firstName: this.formBuilder.control('', [Validators.required]),
            lastName: this.formBuilder.control('', [Validators.required]),
            location: this.formBuilder.group({
                number: this.formBuilder.control(''),
                place: this.formBuilder.control({ value: '', disabled: true }),
                province: this.formBuilder.control(''),
                street: this.formBuilder.control('')
            })
        });
    }

    ngOnInit() {
        this.roles = this.authService.getUserCredentials().roles;

        this.locationService.list()
            .subscribe(
                (data: any[]) => {
                this.provinces = data;
            });
    }

    hasRole(role) {
        return _.some(this.roles, function (_role) {
            return _role === role;
        });
    }

    save() {
        this.phonebookService.save(this.contactGroup.value)
            .subscribe(response => {
                this.router.navigate(['/phonebook']);
                this.growlService.success({
                    msg: 'El contacto se ha guardado correctamente.',
                    title: 'Contacto guardado con exito.'
                });
            }, (error: HttpErrorResponse) => {
                if (error.status === 400) {
                    this.growlService.badRequest();
                } else if (error.status === 500) {
                    this.growlService.internalServerError();
                }
            });
    }
}