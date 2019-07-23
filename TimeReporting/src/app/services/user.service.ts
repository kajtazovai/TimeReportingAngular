import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { Employee } from '../models/employee';
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
  createUser(firstname: string, lastname: string, embg: string, datejoining: Date, username: string, password: string, email: string, role: number, rolename: string, projectId: number): Observable<Object> {
    return this.http.post('http://localhost:8080/employee', {
      "firstName": firstname,
      "lastName": lastname,
      "embg": embg,
      "dateJoining": datejoining,
      "username": username,
      "password": password,
      "email": email,
      "role": {
        "id": role,
        "name": rolename
      },
      "projects": [{
        "id": projectId
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
      "username": employee.dateJoining,
      "password": employee.password,
      "email": employee.email,
    }, {
        'responseType': 'text'
      }).subscribe();
  }
}
