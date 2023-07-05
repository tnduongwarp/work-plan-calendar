import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'workplancalendar';
  currentDate: Date;
  daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weekDays: Date[] = [];

  constructor() {
    this.currentDate = new Date();
    this.populateWeekDays();
  }

  populateWeekDays(): void {
    const startOfWeek = new Date(this.currentDate);
    console.log(startOfWeek);
    console.log(startOfWeek.getDate());
    console.log(startOfWeek.getDay())
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    console.log(startOfWeek)
    this.weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      this.weekDays.push(day);
    }
  }

  displayCalendar(date: Date): void {
    this.currentDate = date;
    this.populateWeekDays();
  }

  prevWeek(): void {
    const prevDate = new Date(this.currentDate);
    prevDate.setDate(prevDate.getDate() - 7);
    this.displayCalendar(prevDate);
  }

  nextWeek(): void {
    const nextDate = new Date(this.currentDate);
    nextDate.setDate(nextDate.getDate() + 7);
    this.displayCalendar(nextDate);
  }
}
