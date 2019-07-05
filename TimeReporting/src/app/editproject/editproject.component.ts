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
  name:string;
  budget:number;
  id:number;
  selectedProject:Project;

  constructor(private  projectService:ProjectService,@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<ProjectComponent>) { }

  ngOnInit() {
    console.log(this.data);
    this.name=this.data.name;
    this.budget = this.data.budget;
    this.id = this.data.id;

  }

  changeName($event) {
    this.name=$event;
  }

  onCloseCancel() {
    this.dialogRef.close('Close');
  }

  editProject() {
    this.selectedProject = new Project(this.name,this.id,this.budget);
    this.projectService.editProject(this.selectedProject);
    this.dialogRef.close("Edit");
    alert("Successfully edited");
  }

  changeBudget($event) {
    this.budget = $event;
  }
}
