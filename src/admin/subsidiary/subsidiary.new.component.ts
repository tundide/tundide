import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions } from 'ng2-toasty';
import { SubsidiaryService } from './subsidiary.service';
import { AuthService } from '../../auth/auth.service';
import * as _ from 'lodash';

@Component({
    selector: 'subsidiary',
    styleUrls: ['subsidiary.new.component.scss'],
    templateUrl: 'subsidiary.new.component.html'
})

export class SubsidiaryNewComponent implements OnInit {
    private roles: Array<String>;
    private subsidiaryGroup: FormGroup;

    constructor(private toastyService: ToastyService,
        private toastyConfig: ToastyConfig,
        private router: Router,
        private authService: AuthService,
        private subsidiaryService: SubsidiaryService,
        private formBuilder: FormBuilder) {
        this.toastyConfig.theme = 'bootstrap';

        this.subsidiaryGroup = this.formBuilder.group({
            code: this.formBuilder.control(''),
            description: this.formBuilder.control('', [Validators.required])
        });
    }

    ngOnInit() {
        this.roles = this.authService.getUserCredentials().roles;
    }

    hasRole(role) {
        return _.some(this.roles, function (_role) {
            return _role === role;
        });
    }

    save() {
        this.subsidiaryService.save(this.subsidiaryGroup.value)
            .subscribe(response => {
                this.router.navigate(['/subsidiary/list']);
            });
    }
}