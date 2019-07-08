import { Component, OnInit } from '@angular/core';
import {Employee} from "../models/employee";
import {UserService} from "../services/user.service";
import {Project} from "../models/project";
import {Router} from "@angular/router";
import {Role} from "../models/role";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees:Array<Employee>;
  isLogin : boolean;
  role:Role;
  constructor(private employeeService:UserService,private router:Router) { }

  ngOnInit() {
    this.employeeService.getUsers().subscribe((text:Array<Employee>)=>{
      this.employees = text;
    });
    this.checkIsLogin();
    if(this.isLogin && this.role.id===1){
      this.router.navigate(['/employees']);
    }
    else if(this.isLogin && this.role.id!==1){
      this.router.navigate(['/timereport']);
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  editEmployee(employee: Employee) {
    
  }

  deleteEmployee(id: number) {
    
  }
  checkIsLogin(){
    var pom = window.sessionStorage.getItem('user');
    if(pom!=null){
      var parsed = JSON.parse(pom);
      this.role = new Role(parsed.role.id);
      this.isLogin= true;
    }
    else{
      this.isLogin=false;
    }
  }

}
