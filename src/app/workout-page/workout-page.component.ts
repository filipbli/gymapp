import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workout-page',
  templateUrl: './workout-page.component.html',
  styleUrls: ['./workout-page.component.css']
})
export class WorkoutPageComponent implements OnInit{
  date = new Date();

  dayFormat = 'd';
  monthFormat = 'M';
  locale  = 'en-US';

  day: string = '';
  month: string = '';

  dateArray: Array<Array<string>> = [];
  currentDate: string | undefined = '';

  index: number = 0;

  isListExpanded = false;

  ngOnInit(): void {
    this.setDate();
    this.currentDate = this.date.getDate().toLocaleString();

    console.log(this.currentDate);
    console.log(this.dateArray[0][0]);
  }

  nextIndex() {
    this.index++;
    this.changeDateArray();
    this.date.setDate(this.date.getDate() + 1);

    this.currentDate = this.date.getDate().toString();
  }

  prevIndex() {
    this.index--;
    this.changeDateArray();
    this.date.setDate(this.date.getDate() - 1);

    this.currentDate = this.date.getDate().toString();
  }

  setDate() {
    for(let i = 0; i < 5; i++) {
      let date = new Date();
      let today: string[] = new Array();
      date.setDate(date.getDate() + i);

      this.day  = formatDate(date, this.dayFormat, this.locale);
      this.month = formatDate(date, this.monthFormat, this.locale);

      today.push(this.day);
      today.push(this.month);
      this.dateArray.push(today);
    }
  }

  changeDateArray() {
    for(let i = 0; i < 5; i++) {
      let date = new Date();
      let today: string[] = new Array();
      date.setDate(date.getDate() + i + this.index);

      this.day  = formatDate(date, this.dayFormat, this.locale);
      this.month = formatDate(date, this.monthFormat, this.locale);

      today.push(this.day);
      today.push(this.month);
      this.dateArray[i] = today;
    }
  }

  expandList() {
    if(this.isListExpanded) {
      this.isListExpanded = false;
    } else {
      this.isListExpanded = true;
    }
  }
}
