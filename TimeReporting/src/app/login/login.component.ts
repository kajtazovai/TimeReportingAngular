import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {Router} from "@angular/router";
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
  isLogin : boolean;

  constructor(private userService: UserService,private router:Router) { }

  ngOnInit() {
    this.checkIsLogin();
    if(this.isLogin){
      this.router.navigate(['/timereport']);
    }
  }
  loginUser(){
    this.userService.checkLogin(this.username,this.password).subscribe(data=>{
        if(data!== null){
          var pom = JSON.stringify(data);
          this.message="";
          window.sessionStorage.setItem("user",pom);
          this.isLogin=true;
          this.router.navigate(['/timereport']);
          return data;
        }
        else{
          this.isLogin = false;
          this.message="Incorrect login or User don't exist";
        }
    });
  }
  checkIsLogin(){
    var pom = window.sessionStorage.getItem('user');
    if(pom!=null){
      this.isLogin=true;
    }
    else{
      this.isLogin=false;
    }
  }

}
