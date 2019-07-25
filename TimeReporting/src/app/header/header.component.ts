import { Component, OnInit } from '@angular/core';
import {Route, Router} from "@angular/router";
import {Role} from "../models/role";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin:boolean;
  role:Role;
  constructor(private route : Router){
  }

  ngOnInit() {
    var pom = window.sessionStorage.getItem('user');
    if(pom!=null){
      var parsed = JSON.parse(pom);
      this.role = new Role(parsed.role.id,parsed.role.name);
      this.isLogin= true;
    }
    else{
      this.isLogin = false;
    }
  }
  logoutUser(){
    window.sessionStorage.removeItem('user');
    this.route.navigate(['/login']);
    console.log('Logout')
  }

}
