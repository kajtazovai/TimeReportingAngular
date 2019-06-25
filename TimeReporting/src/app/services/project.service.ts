import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


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
    return this.http.get("http://localhost:8080/projects");
  }
  getProjectById(id:number){
    return this.http.get("http://localhost:8080/projects/"+id);
  }
}
