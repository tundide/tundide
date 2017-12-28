import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../auth/auth.service';

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
        private authService: AuthService,
        private modalService: NgbModal) {
    }

    ngOnInit() {
        if (this.authService.getUserCredentials().firstIncome) {
            this.modalService.open(this.firstincomeModal, { size: 'lg' }).result.then((result) => {
                if (result) {
                    this.authService.complete();
                    alert('primer ingreso');
                }
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