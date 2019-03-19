import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
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
}
