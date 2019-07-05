import {Component, Inject, OnInit} from '@angular/core';
import {Project} from "../models/project";
import {Timereport} from "../models/timereport";
import {TimeService} from "../services/time.service";
import { MatDialogRef ,MatDialogContent} from "@angular/material";
import {Employee} from "../models/employee";
import {UserService} from "../services/user.service";
import {ProjectService} from "../services/project.service";
import {Role} from "../models/role";



@Component({
  selector: 'app-newtimereport',
  templateUrl: './newtimereport.component.html',
  styleUrls: ['./newtimereport.component.css']
})
export class NewtimereportComponent implements OnInit {

  hours:number;
  date:Date;
  employeeId:number;
  projectId:number;
  projects:Array<Project>;
  employees:Array<Employee>;
  selectedEmployee:Employee;
  selectedProject: Project;
  role:Role;

  constructor(private timereportService  : TimeService,public dialogRef: MatDialogRef<NewtimereportComponent>,private employeeService:UserService,private  projectService:ProjectService) { }
  ngOnInit() {
    var session  = window.sessionStorage.getItem('user');
    var parsed = JSON.parse(session);
    this.role = new Role(parsed.role.id);
    if(this.role.id!==1) {
      this.selectedEmployee = new Employee(parsed.id, parsed.firstName, parsed.lastName, parsed.username, parsed.password, parsed.email, parsed.dateJoining);
    }
    this.projects = new Array<Project>();
    this.employees = new Array<Employee>();
    this.employeeService.getUsers().subscribe((text:Array<Employee>)=>{
      this.employees = text;
    })
    this.projectService.getProjects().subscribe((text:Array<Project>)=>{
      this.projects = text;
    })
  }
  createTime(){
    this.timereportService.createTime(this.date,this.hours,this.employeeId,this.projectId).subscribe(text =>{
      if(this.date!=null && this.hours>0){

        this.dialogRef.close("Create");
        alert("Succesfull added timereport");

       }
    });
  }


  onCloseCancel() {
      this.dialogRef.close('Cancel');
  }

  changeProjectId($event) {
    this.projectId = $event.id;
  }

  changeEmployee($event) {
    console.log($event)
    this.employeeId= $event.id;
  }
}
