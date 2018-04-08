import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
const _some = require('lodash/some');

@Component({
    selector: 'sidebar',
    styleUrls: ['sidebar.component.scss'],
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
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
        });
    }
}