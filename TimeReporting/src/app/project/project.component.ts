import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../services/project.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  name:string;
  budget:number;
  constructor(private projectService : ProjectService,private router:Router) { }

  ngOnInit() {
    var pom = window.sessionStorage.getItem('user');
    var parsed = JSON.parse(pom);
    console.log(parsed)
    if(pom!=null && parsed.role.id===1){
      console.log(true);
      this.router.navigate(['/projects']);
    }
    else{
      this.router.navigate(['/login']);
    }
  }
  createProject(){
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
