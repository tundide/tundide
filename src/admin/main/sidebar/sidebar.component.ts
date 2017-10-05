import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import * as _ from 'lodash';

@Component({
    selector: 'sidebar',
    styleUrls: ['sidebar.component.scss'],
    templateUrl: 'sidebar.component.html'
})

export class SidebarComponent implements OnInit {
    private roles: Array<String>;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.roles = this.authService.getUserCredentials().roles;
    }

    hasRole(role) {
        return _.some(this.roles, function (_role) {
            return _role === role;
        });
    }
}