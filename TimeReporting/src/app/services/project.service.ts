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
    console.log(name + budget);

    return this.http.post("http://localhost:8080/projects/create",body);
  }
}
