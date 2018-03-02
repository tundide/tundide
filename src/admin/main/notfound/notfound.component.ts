import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'notfound',
    styleUrls: ['notfound.component.scss'],
    templateUrl: 'notfound.component.html',
})

export class NotFoundComponent {
    constructor(private router: Router) { }
}