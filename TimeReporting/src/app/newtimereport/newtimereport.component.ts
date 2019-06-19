import {Component, Inject, OnInit} from '@angular/core';
import {Project} from "../models/project";
import {Timereport} from "../models/timereport";
import {TimeService} from "../services/time.service";
import { MatDialogRef ,MatDialogContent} from "@angular/material";
import {Employee} from "../models/employee";
import {UserService} from "../services/user.service";
import {ProjectService} from "../services/project.service";



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
  projects:Object;
  employees:Array<Employee>;
  selectedEmployee:number;
  selectedProject: number;

  constructor(private timereportService  : TimeService,public dialogRef: MatDialogRef<NewtimereportComponent>,private employeeService:UserService,private  projectService:ProjectService) { }
  ngOnInit() {
    this.projects = new Array<Project>();
    this.employees = new Array<Employee>();
    this.employeeService.getUsers().subscribe(text=>{
      var parsed = JSON.parse(text);
      this.employees = parsed;
      console.log(this.employees);
    });
    this.projectService.getProjects().subscribe(text=>{
      this.projects = text;
      console.log(this.projects);
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
}
