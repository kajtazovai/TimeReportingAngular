import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, mapTo} from "rxjs/operators";
import {Project} from "../models/project";


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) {

  }
  createProject(name:string,budget:Number,hourlyPaid:Number){
    var body = {
      "name":name,
      "budget":budget,
      "hourlyPaid":hourlyPaid
    }
    return this.http.post("http://localhost:8080/projects",body);
  }
  getProjects(){
    return this.http.get("http://localhost:8080/projects")
  }
  getProjectById(id:Number){
    return this.http.get("http://localhost:8080/projects/"+id);
  }

  deleteById(id: Number) {
    return this.http.delete('http://localhost:8080/projects/'+id).subscribe();
  }

  editProject(selectedProject: Project) {
    return this.http.put('http://localhost:8080/projects',{
      "id":selectedProject.id,
      "name":selectedProject.name,
      "budget":selectedProject.budget,
      "horlyPaid":selectedProject.hourlyPaid
    },{
      'responseType':'text'
    }).subscribe();
  }
  getRoles(){
    return this.http.get("http://localhost:8080/roles");
  }
}
