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
import { ProjectService } from '../services/project.service';
import { Row } from '../models/row';



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
  startDate: String;
  endDate: String;
  rows: Array<Row>;

  constructor(private timereportService: TimeService, private dialog: MatDialog, private router: Router, private projectService: ProjectService) {
    this.timereports = new Array<Timereport>();
  }
  ngOnInit() {
    var pom = window.sessionStorage.getItem('user');
    if (pom != null) {
      this.projects = new Array<Project>();
      this.getCurrentDate();
      this.projectService.getProjects().subscribe((text: Array<Project>) => {
        this.projects = text;
        this.getTimereportsByDate();
      })
    }
    else {
      this.router.navigate(['/login']);
    }
  }
  getCurrentDate() {
    let currentweeks = moment();
    var start = moment(currentweeks).startOf('isoWeek').format('YYYY-MM-DD');
    var end = moment(currentweeks).endOf('isoWeek').format('YYYY-MM-DD');
    this.fromtoweeks = start.toString() + " to " + end.toString();
    this.startDate = start.toString();
    this.endDate = end.toString();
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
        this.getTimereportsByDate();
      }
      this.dialogResult = result;

    })
  }
  getTimereports() {
    this.timereports = new Array<Timereport>();
    var session = window.sessionStorage.getItem('user');
    this.timereportService.getTimereports().subscribe((list: Array<Timereport>) => {
      this.timereports = list;
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
    if (timereport.project != null) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.width = "400px";
      dialogConfig.autoFocus = true;
      let dialogRef = this.dialog.open(EdittimereportComponent, dialogConfig);
      dialogRef.componentInstance.data = timereport;
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog closed: ${result}`);
        if (result == "Edit") {
          this.getTimereportsByDate();
        }
        this.dialogResult = result;

      })
    }
    else{
      this.onCreate();
    }
  }
  clickNextWeek() {
    let currentweeks = moment(this.currentDate);
    var session = window.sessionStorage.getItem('user');
    var parsedSession = JSON.parse(session);
    currentweeks = moment(currentweeks).add(7, 'day');
    var start = moment(currentweeks).startOf('isoWeek').format('YYYY-MM-DD');
    var end = moment(currentweeks).endOf('isoWeek').format('YYYY-MM-DD');;
    this.fromtoweeks = start.toString() + " to " + end.toString();
    this.currentDate = new Date(currentweeks.toString());
    this.startDate = start.toString();
    this.endDate = end.toString();
    var fromDate = moment(this.startDate.toString());
    var toDate = moment(this.endDate.toString());
    this.timereportService.getTimereportsByDate(fromDate.toDate(), toDate.toDate(), parsedSession.id)
      .subscribe((list: Array<Timereport>) => {
        this.timereports = list;
        this.fillData();
      });
  }
  clickLastWeek() {
    var session = window.sessionStorage.getItem('user');
    var parsedSession = JSON.parse(session);
    let currentweeks = moment(this.currentDate);
    currentweeks = moment(currentweeks).subtract(7, 'day');
    var start = moment(currentweeks).startOf('isoWeek').format('YYYY-MM-DD');
    var end = moment(currentweeks).endOf('isoWeek').format('YYYY-MM-DD');;
    this.fromtoweeks = start.toString() + " to " + end.toString();
    this.currentDate = new Date(currentweeks.toString());
    this.startDate = start.toString();
    this.endDate = end.toString();
    var fromDate = moment(this.startDate.toString());
    var toDate = moment(this.endDate.toString());
    this.timereportService.getTimereportsByDate(fromDate.toDate(), toDate.toDate(), parsedSession.id)
      .subscribe((list: Array<Timereport>) => {
        this.timereports = list;
        this.fillData();
      });
  }
  getTimereportsByDate() {
    this.timereports = new Array<Timereport>();
    var session = window.sessionStorage.getItem('user');
    var parsedSession = JSON.parse(session);
    var fromDate = moment(this.startDate.toString());
    var toDate = moment(this.endDate.toString());
    this.timereportService.getTimereportsByDate(fromDate.toDate(), toDate.toDate(), parsedSession.id)
      .subscribe((list: Array<Timereport>) => {
        this.timereports = list;
        console.log(this.timereports);
        this.fillData();

      });
  }

  fillData() {
    this.rows = new Array<Row>();
    this.projects.forEach(project => {
      let row = new Row();
      row.project = project;
      row.timereports = new Array<Timereport>();
      this.fillTimereport(row);
      this.rows.push(row);
    });
  }
  fillTimereport(row: Row) {
    var currentDate = moment(this.startDate.toString());
    var endDate = moment(this.endDate.toString());
    currentDate = currentDate.subtract('day', 1);
    endDate = endDate.subtract('day', 1);
    while (true) {
      if (currentDate > endDate) {
        break;
      }
      currentDate = currentDate.add('day', 1);
      let timereport = this.findTimereport(row.project.id, currentDate.toDate());
      row.timereports.push(timereport);

    }
  }
  findTimereport(projectId: Number, date: Date): Timereport {
    let timereportId;

    for (var i = 0; i < this.timereports.length; i++) {
      var current = moment(date).format('YYYY-MM-DD');
      if (projectId == this.timereports[i].project.id && current == this.timereports[i].date.toString()) {
        timereportId = this.timereports[i].id;
        return this.timereports[i];
      }
      timereportId = this.timereports[i].id;
    }
    var currentProject = this.getProjectById(projectId);
    return new Timereport(0, timereportId, date, null, currentProject);

  }
  getProjectById(projectId): Project {
    var currentProject: Project;
    this.projectService.getProjectById(projectId).subscribe((project: Project) => {
      return project;
    });
    return null;
  }



}
