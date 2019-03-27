import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-timereporting',
  templateUrl: './timereporting.component.html',
  styleUrls: ['./timereporting.component.css']
})
export class TimereportingComponent implements OnInit {
  constructor() { }
  arrayDays: Array<number>;
  days: number;
  selectedDate:Date;
  ngOnInit() {
    this.arrayDays = new Array();
  }
  setDaysOfMonth($month) {
    this.days = moment($month).daysInMonth();
    this.arrayDays = new Array(this.days);
    for (var i = 1; i <= this.days; i++) {
      this.arrayDays[i] = i;
    }
  }

}
