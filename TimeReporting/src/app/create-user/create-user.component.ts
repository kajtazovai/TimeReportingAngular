import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Role } from '../models/role';
import { Project } from '../models/project';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  firstname: string;
  lastname: string;
  embg: string;
  username: string;
  password: string;
  email: string;
  datejoining: Date;
  roles: Array<Role>;
  projects: Array<Project>;
  selectedRole: Role;
  selectedProject: Project;
  choosedProjects:Array<Project>
  constructor(private userService: UserService, private router: Router, private projectService: ProjectService) { }

  ngOnInit() {
    this.choosedProjects = new Array<Project>();
    this.projects = new Array<Project>();
    this.roles = new Array<Role>();
    this.projectService.getRoles().subscribe((text: Array<Role>) => {
      this.roles = text;
    });
    this.projectService.getProjects().subscribe((text: Array<Project>) => {
      this.projects = text;
    });
  }
  createUser() {
    if (this.firstname != "" && this.lastname != "" && this.embg != "" && this.username != "" && this.password != "" && this.datejoining != null && this.selectedRole != null && this.choosedProjects!=null ) {
      this.userService.createUser(this.firstname, this.lastname, this.embg, this.datejoining, this.username, this.password, this.email, this.selectedRole, this.choosedProjects).subscribe(data => {
        alert("Successfull create user");
        this.router.navigate(['employees']);
      });
    }
    else {
      alert("All fields are mandatory");
    }


  }
  changeRole($event) {
    this.selectedRole = $event;
  }
  changeProjectId($event) {
    this.choosedProjects.push($event);
    var array = this.projects;
    this.projects = new Array<Project>();
    for(var i=0;i<array.length;i++){
      if($event.id==array[i].id){
        continue;
      }
      else{
        this.projects.push(array[i]);
      }

    }
  }
  removeChoosedProjects($event) {
    this.projects.push($event);
    var array = this.choosedProjects;
    this.choosedProjects = new Array<Project>();
    for (var i = 0; i < array.length; i++) {
      if ($event.id == array[i].id) {
        continue;
      }
      else {
        this.choosedProjects.push(array[i]);
      }

    }
  }


}
