import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import * as _ from 'lodash';

@Component({
    selector: 'configuration',
    styleUrls: ['configuration.component.scss'],
    templateUrl: 'configuration.component.html',
})

export class SidebarConfigurationComponent implements OnInit {
    public user;
    private roles: Array<String>;
    constructor(private router: Router,
        private authService: AuthService) {
    }

    hasRole(role) {
        return _.some(this.roles, function (_role) {
            return _role === role;
        });
    }

    ngOnInit() {
        this.user = this.authService.getUserCredentials();

        this.authService.onUserDataLoad.subscribe((user) => {
            this.roles = user.roles;
            this.user = user;
        });

        this.authService.onLogout.subscribe(() => {
            this.user = null;
        });
    }
}