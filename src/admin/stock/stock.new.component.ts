import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
const _some = require('lodash/some');

@Component({
    selector: 'stock',
    styleUrls: ['stock.new.component.scss'],
    templateUrl: 'stock.new.component.html'
})

export class StockNewComponent implements OnInit {
    private roles: Array<String>;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.roles = this.authService.getUserCredentials().roles;
    }

    hasRole(role) {
        return _some(this.roles, function (_role) {
            return _role === role;
        });
    }
}