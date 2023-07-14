import { AfterViewChecked, AfterViewInit, Component } from '@angular/core';
import { th } from 'date-fns/locale';

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
  timenow :  Date ;
  output: any = [];
  startTime = new Date(2023, 6, 1);
  endTime = new Date(2023,6,15);
  events: any = [
    {
      id : 1,
      data: [
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
          end : new Date(2023,6,8,24,0),
          title : "first event"

        },
      ]
    },
    {
      id: 2,
      data:[
        {
          start : new Date(2023, 6, 4, 1, 0),
          end : new Date(2023,6,6,8,30),
          title : "four event"

        },
        {
          start : new Date(2023, 6, 13, 15, 0),
          end : new Date(2023,6,15,8,30),
          title : "five event"

        },
        {
          start : new Date(2023, 6, 7, 15, 0),
          end : new Date(2023,6,8,8,30),
          title : "six event"

        },
        {
          start : new Date(2023, 6, 2, 15, 0),
          end : new Date(2023,6,3,23,30),
          title : "seven event"

        },
      ]
    }
  ]
 eventTest: any = [


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
          end : new Date(2023,6,8,24,0),
          title : "first event"

        },


        {
          start : new Date(2023, 6, 4, 1, 0),
          end : new Date(2023,6,6,8,30),
          title : "four event"

        },
        {
          start : new Date(2023, 6, 13, 15, 0),
          end : new Date(2023,6,15,8,30),
          title : "five event"

        },
        {
          start : new Date(2023, 6, 7, 15, 0),
          end : new Date(2023,6,8,8,30),
          title : "six event"

        },
        {
          start : new Date(2023, 6, 2, 15, 0),
          end : new Date(2023,6,3,23,30),
          title : "seven event"

        },

        {
          start : new Date(2023, 6, 4, 1, 0),
          end : new Date(2023,6,6,8,30),
          title : "eight event"

        },
        {
          start : new Date(2023, 6, 13, 15, 0),
          end : new Date(2023,6,15,8,30),
          title : "nine event"

        },
        {
          start : new Date(2023, 6, 7, 15, 0),
          end : new Date(2023,6,8,8,30),
          title : "ten event"

        },
        {
          start : new Date(2023, 6, 2, 15, 0),
          end : new Date(2023,6,3,23,30),
          title : "elevent event"

        },

  ]

  constructor() {
    this.timenow = new Date();
    this.currentDate = new Date();
    this.populateWeekDays();
    this.testSort();

  }

  ngAfterViewChecked(){
    if(this.checkTimeNowDisplay(this.timenow)){
      var now = document.getElementById("now");
      const marginTimeNow = (this.timenow.getTime()- this.weekDays[0].getTime() + this.timenow.getHours()*3600000+ this.timenow.getMinutes()*60000+ this.timenow.getSeconds()*1000)/(3600000)*5.95;
      now!.style.marginLeft = marginTimeNow + 'px';
    }

    for(let i = 0; i< this.events.length; i++){
      document.getElementById(this.events[i].id)!.style.top = (70*i) + 'px'
      for(let j=0;j<this.events[i].data.length;j++){
        var event = document.getElementById(this.events[i].data[j].title);
        if(this.checkEvent(this.events[i].data[j])){
          event!.style.display = "inline"
          event!.style.marginLeft = this.caculateLeft(this.events[i].data[j]) +'px';
          event!.style.width = this.countLengthofEvent(this.events[i].data[j]) + 'px';
          if(this.events[i].data[j].start.getTime() <= this.timenow.getTime() && this.events[i].data[j].end.getTime()>=this.timenow.getTime()){
            event!.style.backgroundColor = 'aqua';
          }else
          event!.style.backgroundColor = 'crimson';
        }
        else{
          event!.style.display = "none"
        }
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

  checkTimeNowDisplay(timenow: any): boolean{
    if(this.weekDays.some( day => (day.getDate() == timenow.getDate() && day.getMonth()==timenow.getMonth() && day.getFullYear()== timenow.getFullYear())))
    return true;
    else return false;
  }

  caculateLeft(event: any){
    const thu = event.start.getDay();
    const hours = event.start.getHours();
    const mn = event.start.getMinutes();
     return (thu*24+(hours+mn/60))*5.95;
  }
  caculateMarginLeft(event: any, events: any) {
    let maxLeft : number= 0;
    let eventnearitst : number = -1;
    const left = this.caculateLeft(event);
    for(let i = 0;i < events.length; i++){
      const lefti = this.caculateLeft(events[i]);
      if(this.checkEvent(events[i]) &&  lefti > maxLeft && lefti < left){
        maxLeft = lefti;
        eventnearitst = i;
      }
    }
    if(eventnearitst != -1){
      return left - maxLeft - this.countLengthofEvent(events[eventnearitst])
    }
    else {
      return this.caculateLeft(event);
    }
  }
  countLengthofEvent(event: any){
    const mn= event.end.getTime() - event.start.getTime();
    return mn/(3600000)*5.95;
  }
  testSort(){
    this.eventTest.sort(function(event1: any, event2: any){
      if(event1.start.getTime() < event2.start.getTime()) return -1;
      else if(event1.start.getTime() > event2.start.getTime()) return 1;
      else return 0;
    });
    console.log(this.eventTest);
    let tmp = [];
    let index = 0;
    for(let i = 0; i < this.eventTest.length; i++){
      if(this.eventTest[i].start.getTime()> this.startTime.getTime()){
        tmp.push(this.eventTest[i]);
        index = i+1;
        break;
      }
    }
    this.output.push(tmp);
    for(let i = index; i<this.eventTest.length; i++){
      let pushed = 0;
      for(let j=0;j<this.output.length; j++){
        if(
          this.eventTest[i].start.getTime() > this.output[j][this.output[j].length - 1].end.getTime()
          && this.eventTest[i].start.getTime() < this.endTime.getTime()
          ){
            this.output[j].push(this.eventTest[i]);
            pushed = 1;
            break;
          }
      }
      if(!pushed){
        var tmp1 = [];
        tmp1.push(this.eventTest[i]);
        this.output.push(tmp1);

      }
    }
    for (let i = this.output.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.output[i], this.output[j]] = [this.output[j], this.output[i]];
  }
    console.log(this.output);
  }


}
