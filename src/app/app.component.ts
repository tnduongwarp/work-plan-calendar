import { AfterViewChecked, AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked{
  title = 'workplancalendar';
  currentDate: Date;
  daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weekDays: Date[] = [];
  events: any = [
    {
      start : new Date(2023, 6, 2, 1, 0),
      end : new Date(2023,6,4,8,30),
      title : "third event"

    },
    {
      start : new Date(2023, 6, 14, 15, 0),
      end : new Date(2023,6,15,8,30),
      title : "second event"

    },
    {
      start : new Date(2023, 6, 6, 15, 0),
      end : new Date(2023,6,8,8,30),
      title : "first event"

    },
  ]

  constructor() {
    this.currentDate = new Date();
    this.populateWeekDays();
    this.countLengthofEvent(this.events[0]);

  }

  ngAfterViewChecked(){

    for(let i = 0; i< this.events.length; i++){
      if(this.checkEvent(this.events[i])){
        var event = document.getElementById(this.events[i].title);
        event!.style.marginLeft = this.caculateMaginLeft(this.events[i]) +'px';
        event!.style.width = this.countLengthofEvent(this.events[i]) + 'px';
      }

    }
  }
  populateWeekDays(): void {
    const startOfWeek = new Date(this.currentDate);

    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
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

  checkEvent(event: any): boolean{
    if(this.weekDays.some( day => (day.getDate() == event.start.getDate() && day.getMonth()==event.start.getMonth() && day.getFullYear()== event.start.getFullYear())))
    return true;
    else return false;
  }

  caculateMaginLeft(event: any): Number{
    const thu = event.start.getDay();
    const hours = event.start.getHours();
    const mn = event.start.getMinutes();
     return (thu*24+(hours+mn/60))*6;
  }
  countLengthofEvent(event: any){
    const mn= event.end.getTime() - event.start.getTime();
    return mn/(3600000)*6;
  }

}
