import {Component, Inject, OnInit} from '@angular/core';
import {ProjectService} from "../services/project.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Project} from "../models/project";
import {NewtimereportComponent} from "../newtimereport/newtimereport.component";
import {ProjectComponent} from "../project/project.component";
import {Timereport} from "../models/timereport";

@Component({
  selector: 'app-editproject',
  templateUrl: './editproject.component.html',
  styleUrls: ['./editproject.component.css']
})
export class EditprojectComponent implements OnInit {
  name:String;
  budget:Number;
  id:Number;
  hourlyPaid:Number;
  selectedProject:Project;

  constructor(private  projectService:ProjectService,@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<ProjectComponent>) { }

  ngOnInit() {
    this.name=this.data.name;
    this.budget = this.data.budget;
    this.id = this.data.id;
    this.hourlyPaid = this.data.hourlyPaid;

  }
  onCloseCancel() {
    this.dialogRef.close('Close');
  }

  editProject() {
    this.selectedProject = new Project(String(this.name),this.id,this.budget,this.hourlyPaid);
    this.projectService.editProject(this.selectedProject);
    this.dialogRef.close("Edit");
    alert("Successfully edited");
  }
  changeName($event){
    this.name= $event;
  }
  changeBudget($event){
    if($event==0){
    this.budget = 1;
    }
    else{
      this.budget =$event;
    }
  }
  changeHourlyPaid($event){
    if($event==0){
      this.hourlyPaid=1;
    }
    else{
      this.hourlyPaid=$event;
    }
  }
}
