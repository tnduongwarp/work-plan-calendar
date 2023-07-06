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
  ngOnInit(){
    console.log(this.currentDate);
    console.log(this.currentDate.getMinutes())
    for(let i = 0; i< this.events.length; i++){
      var event = document.getElementById(this.events[i].title);
      console.log(event)
      event!.style.marginLeft = this.caculateMaginLeft(this.events[i]) +'%';
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
    if(thu == 6) return (hours*60+mn)/(24*60)*14.3;
    else return (thu+(hours*60+mn)/(24*60))*14.3;
  }
   events: any = [
    {
      start : new Date(2023, 6, 6, 15, 0),
      end : new Date(2023,6,7,8,30),
      title : "first event"

    },
    {
      start : new Date(2023, 6, 15, 15, 0),
      end : new Date(2023,6,7,8,30),
      title : "second event"

    }
   ]
}
