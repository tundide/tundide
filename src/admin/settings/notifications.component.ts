import { Component } from '@angular/core';

@Component({
    selector: 'notifications',
    styleUrls: ['notifications.component.scss'],
    templateUrl: 'notifications.component.html'
})

export class NotificationsComponent {
    isActive = false;
    showMenu = '';
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