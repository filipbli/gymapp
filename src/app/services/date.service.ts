import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  currentDate: Date = new Date();
  dateArray: Array<string> = [];
  step: number = 0;

  constructor() { }

  setDateArray(length: number){
    let date = new Date();
    this.dateArray = [];

    for(let i = 0; i < length; i++) {
      this.dateArray.push(date.toDateString());
      date.setDate(date.getDate() + 1);
    }
  }

  getDateArray(): Array<string> {
    return this.dateArray;
  }

  changeDateArray(dateArray: string[]) {
    let date = new Date();
    date.setDate(date.getDate() + this.step);

    for(let i = 0; i <  5; i++) {
      dateArray[i] = date.toDateString();
      date.setDate(date.getDate() + 1);
    }
  }

  prevIndex() {
    this.step--;
    this.currentDate.setDate(this.currentDate.getDate() - 1);
    this.dateChanged();
  }

  nextIndex() {
    this.step++;
    this.currentDate.setDate(this.currentDate.getDate() + 1);
    this.dateChanged();
  }

  dateChanged() {
    this.changeDateArray(this.dateArray);
  }

  getCurrentDate(): Date{
    return this.currentDate;
  }

  getFormattedDate(date: Date): string{
    if(date.getDate() < 10 && (date.getMonth() + 1) < 10) {
      return '0' + date.getDate() + '.' + '0' + (date.getMonth() + 1) + '.' + date.getFullYear();
    }

    if(date.getDate() < 10) {
      return '0' + date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
    }

    if((date.getMonth() + 1) < 10) {
      return date.getDate() + '.' + '0' + (date.getMonth() + 1) + '.' + date.getFullYear();
    }

    return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
  }
}
