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
  choosenDate: string | undefined = '';

  index: number = 0;

  isListExpanded = false;

  ngOnInit(): void {
    this.setDate();
  }

  nextIndex() {
    this.index += 5;
    this.changeDateArray();
    this.date.setDate(this.date.getDate() + 5);
  }

  prevIndex() {
    this.index -= 5;
    this.changeDateArray();
    this.date.setDate(this.date.getDate() - 5);
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
