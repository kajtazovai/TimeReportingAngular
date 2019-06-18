import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor(private http:HttpClient) { }
  createTime(date:Date,hours:number,employeeId:number,projectId:number):Observable<Object> {
    return this.http.post("http://localhost:8080/timereports",{
      "date":date,
      "hours":hours,
      "employee":{
        "id":employeeId
      },
      "project":{
        "id":projectId
      },
    },{
      'responseType':'text'
    });
  }
  getTimereports():Observable<Object>{
    return this.http.get("http://localhost:8080/timereports",{
      'responseType':'text'
    });
  }
}
