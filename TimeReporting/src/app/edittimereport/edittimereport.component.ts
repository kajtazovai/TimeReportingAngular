import {Component, Inject, OnInit} from '@angular/core';
import {Employee} from "../models/employee";
import {TimeService} from "../services/time.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {UserService} from "../services/user.service";
import {ProjectService} from "../services/project.service";
import {Project} from "../models/project";
import {NewtimereportComponent} from "../newtimereport/newtimereport.component";
import {Timereport} from "../models/timereport";

@Component({
  selector: 'app-edittimereport',
  templateUrl: './edittimereport.component.html',
  styleUrls: ['./edittimereport.component.css']
})
export class EdittimereportComponent implements OnInit {
  hours:number;
  date:Date;
  employeeId:number;
  projectId:number;
  projectName:string;
  projects:Array<Project>;
  employees:Array<Employee>;
  selectedEmployee:Employee;
  selectedProject: Project;
  timereport:Timereport;
  selected: any;



  constructor(private timereportService  : TimeService,public dialogRef: MatDialogRef<NewtimereportComponent>,
              private employeeService:UserService,private  projectService:ProjectService,@Inject(MAT_DIALOG_DATA) public data: any) {

  }



  ngOnInit() {
    this.selected = this.data.projectName;
    this.selectedProject = new Project(this.data.projectName,this.data.projectId,this.data.budget);
    this.hours = this.data.hours;
    var dateTimereport = new Date(this.data.date);
    this.employeeId = this.data.employeeId;
    this.projectId = this.data.projectId;
    this.date = dateTimereport;
    this.projectName = this.data.projectName;
    var currentUser = window.sessionStorage.getItem('user');
    var parsed = JSON.parse(currentUser);
    this.selectedEmployee = new Employee(parsed.id,parsed.firstName,parsed.lastName,parsed.username,parsed.password,parsed.email,parsed.dateJoining,parsed.embg,parsed.role);
    this.projects = new Array<Project>();
    this.projectService.getProjects().subscribe((text:Array<Project>)=>{
      this.projects = text;
    })
  }
  onCloseCancel() {
      this.dialogRef.close('Close');
  }

  editTimereport() {

    this.timereport = new Timereport(this.hours,this.employeeId,this.selectedProject.id,this.selectedEmployee.firstName,this.selectedProject.name,this.data.id,this.date);
    this.timereportService.editTimereport(this.timereport);
    this.dialogRef.close("Edit");
    alert("Successfully edited");
  }

  changeDate(event) {
    var date = new Date(event.toString());
    this.date=date;
    console.log(this.date);
  }

  changeHours(event) {
    this.hours = event;
  }
  getProjectById($id){
    return this.projects.filter(x=> x.id===$id);
  }

  changeProject($event) {
    this.selectedProject = $event;
  }
}
