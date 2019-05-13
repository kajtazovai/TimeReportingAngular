import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {Timereport} from "../models/timereport";
import {Project} from "../models/project";
import {TimeService} from "../services/time.service";


@Component({
  selector: 'app-timereporting',
  templateUrl: './timereporting.component.html',
  styleUrls: ['./timereporting.component.css']
})
export class TimereportingComponent implements OnInit {
  hours:number;
  date:Date;
  employeeId:number;
  projectId:number;
  projects:Array<Project>;
  timereports : Array<Timereport>;

  constructor(private timereportService  : TimeService) { }
  ngOnInit() {
    this.projects = new Array<Project>();
    this.timereports = new Array<Timereport>();
  }
  createTime(){
      this.timereportService.createTime(this.date,this.hours,this.employeeId,this.projectId).subscribe(text =>{
          if(this.date!=null && this.hours>0){
            alert("Succesfull added timereport");
            this.timereports.push(new Timereport(this.date,this.hours,this.employeeId,this.projectId));
          }
      });
  }


  
  

}
