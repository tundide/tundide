import { Component, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation, ViewChild, Input, Output, TemplateRef } from '@angular/core';
import {
  isSameDay,
  isSameMonth
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'calendar',
  styleUrls: ['calendar.component.scss'],
  templateUrl: 'calendar.component.html'
})
export class CalendarComponent {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  // @Input('month') month: boolean;
  // @Input('week') week: boolean;
  // @Input('day') day: boolean;
  @Input('events') events: CalendarEvent[] = [];
  @Output('eventtimechange') eventTimesChanged: EventEmitter<CalendarEvent> = new EventEmitter();
  @Output('eventclick') eventClick: EventEmitter<any> = new EventEmitter();
  @Output('appoinmentAdd') appoinmentAdd: EventEmitter<any> = new EventEmitter();

  locale = window.navigator.language;

  @Input('default')
  view = 'month';

  viewDate: Date = new Date();

  modalData: {
    action: string,
    event: CalendarEvent
  };

  refresh: Subject<any> = new Subject();

  activeDayIsOpen = true;

  eventClicked({ event }: { event: CalendarEvent }): void {
    this.eventClick.emit(event);
  }

  eventTimesChangedEvent({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    if (event.start.getTime() !== newStart.getTime() || event.end.getTime() !== newEnd.getTime()) {
      event.start = newStart;
      event.end = newEnd;
      this.refresh.next();
      this.eventTimesChanged.emit(event);
    }
  }

  addEvent(event: CalendarEvent): void {
    this.events.push(event);
    this.refresh.next();
  }

  contextMenuAddEvent(date: Date): void {
    this.appoinmentAdd.emit(date);
  }

}