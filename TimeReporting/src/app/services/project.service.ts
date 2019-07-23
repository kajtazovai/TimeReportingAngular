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
  createProject(name:string,budget:number){
    var body = {
      "name":name,
      "budget":budget
    }
    return this.http.post("http://localhost:8080/projects",body);
  }
  getProjects(){
    return this.http.get("http://localhost:8080/projects")
  }
  getProjectById(id:number){
    return this.http.get("http://localhost:8080/projects/"+id);
  }

  deleteById(id: number) {
    return this.http.delete('http://localhost:8080/projects/'+id).subscribe();
  }

  editProject(selectedProject: Project) {
    return this.http.put('http://localhost:8080/projects',{
      "id":selectedProject.id,
      "name":selectedProject.name,
      "budget":selectedProject.budget
    },{
      'responseType':'text'
    }).subscribe();
  }
}
