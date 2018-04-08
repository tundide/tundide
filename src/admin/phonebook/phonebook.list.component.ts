import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GrowlService } from '../../@core/utils/growl.service';
import { StorageService } from '../../@core/utils/storage.service';
import { PhonebookService } from './phonebook.service';
import { Contact } from './contact.model';
import * as moment from 'moment';

@Component({
    selector: 'phonebook',
    styleUrls: ['phonebook.list.component.scss'],
    templateUrl: 'phonebook.list.component.html'
})
export class PhonebookListComponent implements OnInit {
    private contacts: Array<Contact>;

    constructor(private router: Router,
        private growlService: GrowlService,
        private storageService: StorageService,
        private phonebookService: PhonebookService) {
    }

    ngOnInit() {
        this.phonebookService.list()
            .subscribe(contacts => {
                if (contacts) {
                    this.contacts = contacts;
                } else {
                    this.growlService.noContent();
                }
            });
    }

    addAppointment(contact) {
        this.storageService.set('appointment.contact', contact);
        this.router.navigate(['/appointment/new']);
    }
}