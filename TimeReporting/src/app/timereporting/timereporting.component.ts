import { Component, OnInit, ViewContainerRef } from '@angular/core';
import * as moment from 'moment';
import { Timereport } from "../models/timereport";
import { Project } from "../models/project";
import { TimeService } from "../services/time.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { NewtimereportComponent } from "../newtimereport/newtimereport.component";
import { Observable, Subscription } from "rxjs";
import { numbers } from "@material/dialog/constants";
import { text } from "@angular/core/src/render3";
import { DeletedialogtimereportComponent } from "../deletedialogtimereport/deletedialogtimereport.component";
import { isComponentInstance } from "@angular/core/src/render3/context_discovery";
import { Router } from "@angular/router";
import { EdittimereportComponent } from "../edittimereport/edittimereport.component";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";



@Component({
  selector: 'app-timereporting',
  templateUrl: './timereporting.component.html',
  styleUrls: ['./timereporting.component.css']
})
export class TimereportingComponent implements OnInit {
  mydate: Date;
  employeeId: number;
  projectId: number;
  projects: Array<Project>;
  timereports: Array<Timereport>;
  timereport: Timereport;
  dialogResult = "";
  timereportId: number;
  isLogin: boolean;
  currentDate: Date;
  fromtoweeks: String;

  constructor(private timereportService: TimeService, private dialog: MatDialog, private router: Router) {
    this.timereports = new Array<Timereport>();
  }
  ngOnInit() {
    var pom = window.sessionStorage.getItem('user');
    if (pom != null) {
      this.projects = new Array<Project>();
      this.getTimereports();
      this.currentDate = new Date();
      let currentweeks = moment();
      var start = moment(currentweeks).startOf('isoWeek').format('DD-MM-YYYY');
      var end = moment(currentweeks).endOf('isoWeek').format('DD-MM-YYYY');;
      this.fromtoweeks = start.toString() + " to " + end.toString();
    }
    else {
      this.router.navigate(['/login']);
    }
  }


  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "400px";
    dialogConfig.autoFocus = true;
    let dialogRef = this.dialog.open(NewtimereportComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      if (result == "Create") {
        this.getTimereports();
      }
      this.dialogResult = result;

    })
  }
  getTimereports() {
    this.timereports = new Array<Timereport>();
    var session = window.sessionStorage.getItem('user');
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
        var parsedSession = JSON.parse(session);
        if (employeeId === parsedSession.id) {
          this.timereports.push(new Timereport(hours, employeeId, projectId, employeeName, projectName, id, date));
        }
      }
    });
  }
  deleteTimereport(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "400px";
    dialogConfig.autoFocus = true;
    let dialogRef = this.dialog.open(DeletedialogtimereportComponent, dialogConfig);
    dialogRef.componentInstance.data = id;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      if (result == "Delete") {
        this.getTimereports();
      }
      this.dialogResult = result;

    })
    console.log(id);
  }
  searchWithDate() {
    var session = window.sessionStorage.getItem('user');
    if (this.mydate != null) {
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
          var converted = this.convertDate(this.mydate);
          if (dateConvert === converted) {
            this.timereports.push(new Timereport(hours, employeeId, projectId, employeeName, projectName, id, date));
          }
        }
      });
    }
    else {
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
          if (employeeId === parsedSession.id) {
            this.timereports.push(new Timereport(hours, employeeId, projectId, employeeName, projectName, id, date));
          }

        }
      });

    }
  }
  convertDate(date) {
    var pom = new Date(date);
    var day = pom.getDate();
    var month = pom.getMonth() + 1;
    var year = pom.getFullYear();
    var result = day + '/' + month + '/' + year;
    return result;
  }
  editTimereport(timereport: Timereport) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "400px";
    dialogConfig.autoFocus = true;
    let dialogRef = this.dialog.open(EdittimereportComponent, dialogConfig);
    dialogRef.componentInstance.data = timereport;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      if (result == "Edit") {
        this.getTimereports();
      }
      this.dialogResult = result;

    })
  }
  clickNextWeek() {
    let currentweeks = moment(this.currentDate);
    currentweeks = moment(currentweeks).add(7,'day');
    var start = moment(currentweeks).startOf('isoWeek').format('DD-MM-YYYY');
    var end = moment(currentweeks).endOf('isoWeek').format('DD-MM-YYYY');;
    this.fromtoweeks = start.toString() + " to " + end.toString();
    this.currentDate = new Date(currentweeks.toString());
  }
  clickLastWeek() {

    let currentweeks = moment(this.currentDate);
    currentweeks = moment(currentweeks).subtract(7,'day');
    var start = moment(currentweeks).startOf('isoWeek').format('DD-MM-YYYY');
    var end = moment(currentweeks).endOf('isoWeek').format('DD-MM-YYYY');;
    this.fromtoweeks = start.toString() + " to " + end.toString();
    this.currentDate = new Date(currentweeks.toString());
  }





}
