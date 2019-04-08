import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {

   }
   checkLogin(username:string,password:string):Observable<Object> {
     return this.http.post("http://localhost:8080/loginUser",{
       "username":username,
       "password":password
     },{
        'responseType':'text'
     });
   }
   createUser(firstname:string,lastname:string,embg:string,datejoining:Date,username:string,password:string,email:string,role:number,rolename:string):Observable<Object>{
     return this.http.post('http://localhost:8080/employee/create',{
          "firstName":firstname,
          "lastName":lastname,
          "embg":embg,
          "dateJoining":datejoining,
          "username":username,
          "password":password,
          "email":email,
          "role":{
            "id":role,
            "name":rolename
          }
     },{
       responseType:"arraybuffer"
     });
   }
}
