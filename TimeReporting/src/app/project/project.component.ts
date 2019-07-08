import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../services/project.service";
import {Router} from "@angular/router";
import {Projects} from "@angular/cli/lib/config/schema";
import {Project} from "../models/project";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {DeletedialogtimereportComponent} from "../deletedialogtimereport/deletedialogtimereport.component";
import {Timereport} from "../models/timereport";
import {DeleteprojectComponent} from "../deleteproject/deleteproject.component";
import {EdittimereportComponent} from "../edittimereport/edittimereport.component";
import {EditprojectComponent} from "../editproject/editproject.component";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  name:string;
  budget:number;
  projects:Array<Project>;
  dialogResult = "";
  constructor(private projectService : ProjectService,private router:Router ,private dialog :MatDialog) { }

  ngOnInit() {
    var pom = window.sessionStorage.getItem('user');
    var parsed = JSON.parse(pom);
    if(pom!=null && parsed.role.id===1){
      console.log(true);
      this.router.navigate(['/projects']);
      this.projects = new Array<Project>();
      this.projectService.getProjects().subscribe((text:Array<Project>)=>{
        this.projects = text;
      })
    }
    else{
      this.router.navigate(['/login']);
    }
  }
  createProject(){
    if(this.name!="" && this.budget!=null) {
      this.projectService.createProject(this.name, this.budget).subscribe(text => {
        if (this.name != "" && this.budget != null) {
          alert("Successfull create project");
          this.getProjects();
          this.name="";
          this.budget=null;
        }
      });
    }
    else {
      alert("Project not created");
    }
  }

  editProject(project: Project) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.width="400px";
    dialogConfig.autoFocus=true;
    let dialogRef = this.dialog.open(EditprojectComponent,dialogConfig);
    dialogRef.componentInstance.data=project;
    dialogRef.afterClosed().subscribe(result=>{
      console.log(`Dialog closed: ${result}`);
      if(result=="Edit"){
        this.getProjects();
      }
      this.dialogResult = result;

    })
  }

  deleteProject(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.width="400px";
    dialogConfig.autoFocus=true;
    let dialogRef = this.dialog.open(DeleteprojectComponent,dialogConfig);
    dialogRef.componentInstance.data=id;
    dialogRef.afterClosed().subscribe(result=>{
      console.log(`Dialog closed: ${result}`);
      if(result=="Delete"){
        this.getProjects();
      }
      this.dialogResult = result;

    })
    console.log(id);
  }
  getProjects(){
    this.projects = new Array<Project>();
    this.projectService.getProjects().subscribe((text:Array<Project>)=>{
      this.projects = text;
    });
  }
}
