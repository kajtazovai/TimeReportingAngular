import { Component, Inject, OnInit } from '@angular/core';
import { Project } from "../models/project";
import { Timereport } from "../models/timereport";
import { TimeService } from "../services/time.service";
import { MatDialogRef, MatDialogContent, MAT_DIALOG_DATA } from "@angular/material";
import { Employee } from "../models/employee";
import { UserService } from "../services/user.service";
import { ProjectService } from "../services/project.service";
import { Role } from "../models/role";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import * as moment from 'moment';

@Component({
  selector: 'app-newtimereport',
  templateUrl: './newtimereport.component.html',
  styleUrls: ['./newtimereport.component.css']
})
export class NewtimereportComponent implements OnInit {
  newtimereport = new FormGroup({
    hours: new FormControl([

    ], [Validators.required])
  })
  hours: number;
  date: Date;
  employeeId: number;
  projectId: number;
  projects: Array<Project>;
  employees: Array<Employee>;
  selectedEmployee: Employee;
  selectedProject: Project;
  role: Role;
  selected: String;
  projectName = String;
  haveData: Boolean;
  dateForNewTimereport:Date;
  constructor(private timereportService: TimeService, public dialogRef: MatDialogRef<NewtimereportComponent>, private employeeService: UserService, private projectService: ProjectService, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {
    var session = window.sessionStorage.getItem('user');
    var parsed = JSON.parse(session);
    this.role = new Role(parsed.role.id, parsed.role.name);
    this.haveData = false;
    if (this.data != undefined) {
      this.haveData = true;
      this.selected = this.data.projectName;
      this.selectedProject = this.data.project;
      this.hours = this.data.hours;
      var dateTimereport = new Date(this.data.date);
      this.employeeId = this.data.employeeId;
      this.projectId = this.data.projectId;
      this.date = dateTimereport;
      this.projectName = this.data.projectName;
      this.selectedEmployee = new Employee(parsed.id, parsed.firstName, parsed.lastName, parsed.username, parsed.password, parsed.email, parsed.dateJoining, parsed.embg, parsed.role, parsed.projects);
      this.projects = new Array<Project>();
      this.projects = parsed.projects;
    } else {
      this.employees = new Array<Employee>();
      this.projects = new Array<Project>();
      this.selectedEmployee = new Employee(parsed.id, parsed.firstName, parsed.lastName, parsed.username, parsed.password, parsed.email, parsed.dateJoining, parsed.embg, parsed.role, parsed.projects);
      this.projects = new Array<Project>();
      this.employees = new Array<Employee>();
      this.employeeService.getUsers().subscribe((text: Array<Employee>) => {
        this.employees = text;
      })
      this.projectService.getProjects().subscribe((text: Array<Project>) => {
        this.projects = text;
      })
    }
  }
  createTime() {
    var date = moment(this.date);
    var currentDate = date.format('YYYY-MM-DD');
    if (this.haveData) {
      this.timereportService.createTime(new Date(currentDate.toString()), this.hours, this.selectedEmployee.id, this.selectedProject.id).subscribe(text => {
        if (this.date != null && this.hours > 0) {

          this.dialogRef.close("Create");
          alert("Succesfull added timereport");

        }
      });
    }
    else if (!this.haveData){
      var currentdate = moment(this.dateForNewTimereport);
      var newdate = currentdate.format('YYYY-MM-DD');
      this.timereportService.createTime(new Date(newdate.toString()), this.hours, this.selectedEmployee.id, this.selectedProject.id).subscribe(text => {
          this.dialogRef.close("Create");
          alert("Succesfull added timereport");
      });
    }
    else {
      alert("All field are mandatory");
    }
  }


  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }

  changeProjectId($event) {
    this.selectedProject = $event;
  }

  changeEmployee($event) {
    this.selectedEmployee = $event;
  }
  changeHours($event) {
    this.hours = $event;
  }
  changeDate($event){
    this.dateForNewTimereport=$event;
  }
}
