import {
  Component,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
@Component({
  selector: 'app-democomponent',
  templateUrl: './democomponent.component.html',
  styleUrls: ['./democomponent.component.css']
})
export class DemocomponentComponent {
  @ViewChild('modalContent', { static: true })
  modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };



  refresh = new Subject<void>();

  events: CalendarEvent[] = [
    {
      start: new Date(2023, 6, 6, 15, 0),
      end: new Date(2023, 6, 7),
      title: 'A 3 day event',
      color: { ...colors['red'] },
      allDay: true,

    },
    {
      start: new Date(2023, 6, 7, 15, 0),
      end: new Date(2023, 6, 8),
      title: 'test event',
      color: { ...colors['red'] },
      allDay: true,

    },
    {
      start: new Date(2023, 6, 7, 15, 0),
      end: new Date(2023, 6, 8),
      title: 'test event',
      color: { ...colors['red'] },
      allDay: true,

    },
    {
      start: new Date(2023, 6, 7, 15, 0),
      end: new Date(2023, 6, 8),
      title: 'test event',
      color: { ...colors['red'] },
      allDay: true,

    },
    {
      start: new Date(2023, 6, 7, 15, 0),
      end: new Date(2023, 6, 8),
      title: 'test event',
      color: { ...colors['red'] },
      allDay: true,

    },
    {
      start: new Date(2023, 6, 5, 15, 0),
      end: new Date(2023, 6, 8),
      title: 'test 2 event',
      color: { ...colors['red'] },
      allDay: true,

    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: { ...colors['yellow'] },
      allDay: true,

    },
  ];

  activeDayIsOpen: boolean = true;
cellModifier: any;

  constructor(private modal: NgbModal) {}



  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
