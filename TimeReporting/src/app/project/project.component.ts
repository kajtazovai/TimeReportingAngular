import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../services/project.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  name:string;
  budget:number;
  constructor(private projectService : ProjectService) { }

  ngOnInit() {
  }
  createProject(){
    console.log(this.name);
    console.log(this.budget);
    this.projectService.createProject(this.name,this.budget).subscribe(text=>{
      if(this.name!="" && this.budget!=null){
        alert("Successfull create project");
      }
      else{
        alert("Project not created");
      }
    });
  }

}
