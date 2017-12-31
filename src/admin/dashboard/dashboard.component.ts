import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
    private firstIncomeGroup: FormGroup;

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private modalService: NgbModal) {

        this.firstIncomeGroup = this.formBuilder.group({
            company: this.formBuilder.group({
                name: this.formBuilder.control('', [Validators.required]),
                description: this.formBuilder.control('', [Validators.required]),
                type: this.formBuilder.control('', [Validators.required])
            }),
            subsidiary: this.formBuilder.group({
                code: this.formBuilder.control('', [Validators.required]),
                description: this.formBuilder.control('', [Validators.required])
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
        if (this.authService.getUserCredentials().firstIncome) {
            setTimeout(() => {
                this.modalService.open(this.firstincomeModal, { size: 'lg' }).result.then((result) => {
                    if (result) {
                        this.authService.complete('1');
                    }
                }, (reason) => {
                    alert(reason);
                  });
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