import {Component, OnInit, ViewContainerRef} from '@angular/core';
import * as moment from 'moment';
import {Timereport} from "../models/timereport";
import {Project} from "../models/project";
import {TimeService} from "../services/time.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import {NewtimereportComponent} from "../newtimereport/newtimereport.component";
import {Observable, Subscription} from "rxjs";
import {numbers} from "@material/dialog/constants";


@Component({
  selector: 'app-timereporting',
  templateUrl: './timereporting.component.html',
  styleUrls: ['./timereporting.component.css']
})
export class TimereportingComponent implements OnInit {
  date:Date;
  employeeId:number;
  projectId:number;
  projects:Array<Project>;
  timereports : Array<Timereport>;
  dialogResult = "";


  constructor(private timereportService  : TimeService,private dialog :MatDialog) {
    this.timereports = new Array<Timereport>();
  }
  ngOnInit() {
    this.projects = new Array<Project>();
    this.getTimereports();

  }


  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.width="400px";
    dialogConfig.autoFocus=true;
    let dialogRef = this.dialog.open(NewtimereportComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(result=>{
      console.log(`Dialog closed: ${result}`);
      if(result=="Create"){
        this.getTimereports();
      }
      this.dialogResult = result;

    })
  }
  getTimereports(){
    this.timereports = new Array<Timereport>();
    this.timereportService.getTimereports().subscribe(text=>{
      var pom =  text as Timereport[];
      var parsed = JSON.parse(pom.toString());
      var list = new Array<Timereport>();
      list = parsed;
      for(var i=0;i<list.length;i++){
        var hours = parseInt(parsed[i].hours);
        var employeeId = parseInt(parsed[i].employee.id);
        var projectId = parseInt(parsed[i].project.id);
        var employeeName = String(parsed[i].employee.firstName);
        var projectName = String(parsed[i].project.name);
        this.timereports.push(new Timereport(hours,employeeId,projectId));
      }
    });
  }


}
