import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
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
import { setTimeout } from 'core-js/library/web/timers';

@Component({
    selector: 'contact-edit',
    styleUrls: ['contact.edit.component.scss'],
    templateUrl: 'contact.edit.component.html'
})

export class ContactEditComponent implements OnInit {
    public provinces = [];
    public locations = [];

    private roles: Array<String>;
    private contactGroup: FormGroup;

    searchLocation = (text$: Observable<string>) =>
        text$
            .debounceTime(200)
            .distinctUntilChanged()
            .map(term => term.length < 2 ? []
                : _.find(this.provinces, (o: any) => {
                    return o.code === this.contactGroup.get('location.province').value;
                }).locations.filter(v => new RegExp(term, 'gi').test(v.description)).splice(0, 10))

    formatter = (x: { description: string }) => x.description;

    placeChange(event) {
        this.contactGroup.get('location.place').setValue(event.item.code);
    }

    constructor(private authService: AuthService,
        private locationService: LocationService,
        private growlService: GrowlService,
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private phonebookService: PhonebookService) {

        this.contactGroup = this.formBuilder.group({
            _id: this.formBuilder.control(''),
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

        this.contactGroup.get('location.province').valueChanges.subscribe(val => {
            const ctrl = this.contactGroup.get('location.place');

            if (val !== 0) {
                ctrl.enable();
            } else {
                ctrl.disable();
            }
        });
    }

    ngOnInit() {
        this.roles = this.authService.getUserCredentials().roles;

        this.route.params.subscribe(params => {

            Observable.forkJoin(
                this.locationService.list(),
                this.phonebookService.get(params['id'])
            ).subscribe(
                (data: any[]) => {
                    this.provinces = data[0];
                    this.contactGroup.patchValue(data[1]);
                });
        });
    }

    hasRole(role) {
        return _.some(this.roles, function (_role) {
            return _role === role;
        });
    }

    save() {
        this.phonebookService.update(this.contactGroup.value)
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