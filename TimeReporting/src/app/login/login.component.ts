import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username : string;
  password : string;
  message : string;
  result:Object;

  constructor(private userService: UserService) { }

  ngOnInit() {
    
  }
  loginUser(){
    this.userService.checkLogin(this.username,this.password).subscribe(data=>{
        if(data!== null){
          console.log(data);
          var pom = JSON.stringify(data);
          this.message="";
          window.sessionStorage.setItem("user",pom);
          return data;
        }
        else{
          this.message="Incorrect login or User don't exist";
        }
    });
  }

}
