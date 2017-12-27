import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'dashboard',
    styleUrls: ['dashboard.component.scss'],
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
    @ViewChild('firstincome') firstincomeModal: NgbModal;
    isActive = false;
    showMenu = '';

    constructor(
        private modalService: NgbModal) {
    }

    ngOnInit() {
        setTimeout(() => {
            this.modalService.open(this.firstincomeModal, { size: 'lg' }).result.then((result) => {
                if (result) {
                    alert('primer ingreso');
                }
            });
        });

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