import { Component, OnInit } from '@angular/core';
import { Timereport } from '../models/timereport';
import { TimeService } from '../services/time.service';
import * as moment from 'moment';
@Component({
  selector: 'app-userreport',
  templateUrl: './userreport.component.html',
  styleUrls: ['./userreport.component.css']
})
export class UserreportComponent implements OnInit {
  timereports: Array<Timereport>;
  startDate: String;
  endDate: String;
  hours:Number;
  currentDate: Date;
  fromtoweeks: String;
  constructor(private timereportService: TimeService) { }

  ngOnInit() {
  
 
  }
  

}
