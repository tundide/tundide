import { Component } from '@angular/core';

@Component({
    selector: 'polls',
    styleUrls: ['polls.component.scss'],
    templateUrl: 'polls.component.html'
})

export class PollsComponent {
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