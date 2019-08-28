import {Component, Inject, OnInit} from '@angular/core';
import {Project} from "../models/project";
import {Timereport} from "../models/timereport";
import {TimeService} from "../services/time.service";
import { MatDialogRef ,MatDialogContent} from "@angular/material";
import {Employee} from "../models/employee";
import {UserService} from "../services/user.service";
import {ProjectService} from "../services/project.service";
import {Role} from "../models/role";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import * as moment from 'moment';

@Component({
  selector: 'app-newtimereport',
  templateUrl: './newtimereport.component.html',
  styleUrls: ['./newtimereport.component.css']
})
export class NewtimereportComponent implements OnInit {
  newtimereport = new FormGroup({
    hours: new FormControl([

    ],[Validators.required])
  })
  hours:number;
  date:Date;
  employeeId:number;
  projectId:number;
  projects:Array<Project>;
  employees:Array<Employee>;
  selectedEmployee:Employee;
  selectedProject: Project;
  role:Role;
  data;
  constructor(private timereportService  : TimeService,public dialogRef: MatDialogRef<NewtimereportComponent>,private employeeService:UserService,private  projectService:ProjectService) { }
  ngOnInit() {
    var session  = window.sessionStorage.getItem('user');
    var parsed = JSON.parse(session);
    this.role = new Role(parsed.role.id,parsed.role.name);
    if(this.role.id!==1) {
      this.selectedEmployee = new Employee(parsed.id, parsed.firstName, parsed.lastName, parsed.username, parsed.password, parsed.email, parsed.dateJoining,parsed.embg,parsed.role,parsed.projects);
    }
    this.projects = new Array<Project>();
    this.employees = new Array<Employee>();
    this.employeeService.getUsers().subscribe((text:Array<Employee>)=>{
      this.employees = text;
    })
    this.projects = parsed.projects;
  }
  createTime(){
    var date = moment(this.date);
    var currentDate = date.format('YYYY-MM-DD');
    if(this.hours!=null && this.selectedEmployee.id!=null && this.selectedProject.id!=null){
      this.timereportService.createTime(new Date(currentDate.toString()), this.hours, this.selectedEmployee.id, this.selectedProject.id).subscribe(text => {
        if (this.date != null && this.hours > 0) {

          this.dialogRef.close("Create");
          alert("Succesfull added timereport");

        }
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
    console.log($event);
    this.selectedProject = $event;
  }

  changeEmployee($event) {
    console.log($event)
    this.selectedEmployee= $event;
  }
}
