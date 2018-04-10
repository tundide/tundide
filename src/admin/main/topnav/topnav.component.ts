import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
declare var $: JQueryStatic;

@Component({
    selector: 'top-nav',
    styleUrls: ['topnav.component.scss'],
    templateUrl: 'topnav.component.html',
})

export class TopNavComponent implements OnInit {
    public searchWord: string;
    public isCollapsed = true;
    public user;
    public messages: Array<any>;

    constructor(private router: Router,
        private authService: AuthService) {
        this.messages = new Array();
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/']);
    }

    ngOnInit() {
        this.user = this.authService.getUserCredentials();

        this.authService.onUserDataLoad.subscribe((user) => {
            this.user = user;
        });

        this.authService.onLogout.subscribe(() => {
            this.user = null;
        });
    }
}