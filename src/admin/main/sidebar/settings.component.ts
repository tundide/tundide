import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
const _some = require('lodash/some');

@Component({
    selector: 'settings',
    styleUrls: ['settings.component.scss'],
    templateUrl: 'settings.component.html',
})

export class SidebarSettingsComponent implements OnInit {
    public user;
    private roles: Array<String>;
    constructor(private router: Router,
        private authService: AuthService) {
    }

    hasRole(role) {
        return _some(this.roles, function (_role) {
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