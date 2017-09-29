import { Component } from '@angular/core';


@Component({
  selector: 'ticket',
  styleUrls: ['ticket.new.component.scss'],
  templateUrl: 'ticket.new.component.html'
})
export class TicketNewComponent {
  private documentLayout: any = 'numeric';
  private phoneLayout: any = 'phone';
}