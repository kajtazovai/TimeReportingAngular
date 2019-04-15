import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {Timereport} from "../models/timereport";
import {Project} from "../models/project";


@Component({
  selector: 'app-timereporting',
  templateUrl: './timereporting.component.html',
  styleUrls: ['./timereporting.component.css']
})
export class TimereportingComponent implements OnInit {
  timereports: Array<Timereport>;
  hours:number;
  date:Date;
  projects:Array<Project>;
  selectedDate:Date;
  ngOnInit() {
    this.timereports = new Array<Timereport>();
    this.projects = new Array<Project>();
  }
  addTimereport(){
    this.timereports.push(new Timereport(this.date,this.hours,this.projects.pop()));
  }


  
  

}
