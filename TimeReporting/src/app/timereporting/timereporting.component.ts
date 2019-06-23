import {Component, OnInit, ViewContainerRef} from '@angular/core';
import * as moment from 'moment';
import {Timereport} from "../models/timereport";
import {Project} from "../models/project";
import {TimeService} from "../services/time.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import {NewtimereportComponent} from "../newtimereport/newtimereport.component";
import {Observable, Subscription} from "rxjs";
import {numbers} from "@material/dialog/constants";
import {text} from "@angular/core/src/render3";
import {DeletedialogtimereportComponent} from "../deletedialogtimereport/deletedialogtimereport.component";
import {isComponentInstance} from "@angular/core/src/render3/context_discovery";
import {Router} from "@angular/router";


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
  timereport : Timereport;
  dialogResult = "";
  timereportId : number;
  isLogin : boolean;


  constructor(private timereportService  : TimeService,private dialog :MatDialog,private router :Router) {
    this.timereports = new Array<Timereport>();
  }
  ngOnInit() {
    var pom = window.sessionStorage.getItem('user');
    if(pom!=null) {
      this.projects = new Array<Project>();
      this.getTimereports();
    }
    else{
      this.router.navigate(['/login']);
    }
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
    var session=window.sessionStorage.getItem('user');
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
        var id = parseInt(parsed[i].id);
        var date = parsed[i].date;
        var converted = this.convertDate(date);
        var parsedSession = JSON.parse(session);
        if(employeeId===parsedSession.id) {
          this.timereports.push(new Timereport(hours, employeeId, projectId, employeeName, projectName, id, converted));
        }
      }
    });
  }

  editTimereport(id: number){
      var pom = this.timereportService.findTimereportById(id).subscribe(response=>{
        var tmp = JSON.stringify(response);
        var parsed = JSON.parse(tmp);
        console.log(parsed);

        //         // this.timereport.projectName = tet.projectName;
        //         // this.timereport.employeeName = tmp.employeeName;
        //         // this.timereport.employeeId = tmp.employeeId;
        //         // this.timereport.projectId = tmp.projectId;
        //         // return this.timereport;
      });

  }

  deleteTimereport(id:number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.width="400px";
    dialogConfig.autoFocus=true;
    let dialogRef = this.dialog.open(DeletedialogtimereportComponent,dialogConfig);
    dialogRef.componentInstance.data=id;
    dialogRef.afterClosed().subscribe(result=>{
      console.log(`Dialog closed: ${result}`);
      if(result=="Delete"){
        this.getTimereports();
      }
      this.dialogResult = result;

    })
    console.log(id);
  }
  searchWithDate(){
    var session=window.sessionStorage.getItem('user');
    if(this.date!=null) {
      this.timereports = new Array<Timereport>();
      this.timereportService.getTimereports().subscribe(text => {
        var pom = text as Timereport[];
        var parsed = JSON.parse(pom.toString());
        var list = new Array<Timereport>();
        list = parsed;
        for (var i = 0; i < list.length; i++) {
          var hours = parseInt(parsed[i].hours);
          var employeeId = parseInt(parsed[i].employee.id);
          var projectId = parseInt(parsed[i].project.id);
          var employeeName = String(parsed[i].employee.firstName);
          var projectName = String(parsed[i].project.name);
          var id = parseInt(parsed[i].id);
          var date = parsed[i].date;
          var dateConvert = this.convertDate(date);
          var converted = this.convertDate(this.date);
          if (dateConvert === converted) {
            this.timereports.push(new Timereport(hours, employeeId, projectId, employeeName, projectName, id, dateConvert));
          }
        }
      });
    }
    else{
      this.timereports = new Array<Timereport>();
      this.timereportService.getTimereports().subscribe(text => {
        var pom = text as Timereport[];
        var parsed = JSON.parse(pom.toString());
        var list = new Array<Timereport>();
        list = parsed;
        for (var i = 0; i < list.length; i++) {
          var hours = parseInt(parsed[i].hours);
          var employeeId = parseInt(parsed[i].employee.id);
          var projectId = parseInt(parsed[i].project.id);
          var employeeName = String(parsed[i].employee.firstName);
          var projectName = String(parsed[i].project.name);
          var id = parseInt(parsed[i].id);
          var date = parsed[i].date;
          var dateConvert = this.convertDate(date);
          var parsedSession = JSON.parse(session);
          if(employeeId===parsedSession.id) {
            this.timereports.push(new Timereport(hours, employeeId, projectId, employeeName, projectName, id, dateConvert));
          }

        }
      });

    }
  }
  convertDate(date){
    var pom = new Date(date);
    var day = pom.getDate();
    var month = pom.getMonth()+1;
    var year = pom.getFullYear();
    var result = day+'/'+month+'/'+year;
    return result;
  }





}
