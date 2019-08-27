import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { Role } from '../models/role';
import { Project } from '../models/project';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }
  checkLogin(username: string, password: string): Observable<Object> {
    return this.http.post("http://localhost:8080/employee/login", {
      "username": username,
      "password": password
    }, {
        'responseType': "json"
      });
  }
  createUser(firstname: string, lastname: string, embg: string, datejoining: Date, username: string, password: string, email: string, role:Role, project: Project): Observable<Object> {
    return this.http.post('http://localhost:8080/employee', {
      "firstName": firstname,
      "lastName": lastname,
      "embg": embg,
      "dateJoining": datejoining,
      "username": username,
      "password": password,
      "email": email,
      "role": {
        "id": role.id,
        "name": role.name
      },
      "projects": [{
        "id": project.id,
        "name":project.name,
        "budget":project.budget
      }]
    }, {
        responseType: "arraybuffer"
      });

  }
  getUsers() {
    return this.http.get("http://localhost:8080/employee");
  }
  editUser(employee: Employee) {
  
    return this.http.put("http://localhost:8080/employee", {
      "id":employee.id,
      "firstName": employee.firstName,
      "lastName": employee.lastName,
      "embg": employee.embg,
      "dateJoining": employee.dateJoining,
      "username": employee.username,
      "password": employee.password,
      "email": employee.email,
      "role":{
        "id":employee.role.id,
        "name":employee.role.name,
      }
    }, {
        'responseType': 'text'
      }).subscribe();
  }
  removeEmployee(id:Number){
    this.http.delete('http://localhost:8080/employee/'+id).subscribe();
  }
  
}
