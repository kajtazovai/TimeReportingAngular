import { Component, OnInit } from '@angular/core';
import {Employee} from "../models/employee";
import {UserService} from "../services/user.service";
import {Project} from "../models/project";
import {Router} from "@angular/router";
import {Role} from "../models/role";
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EdituserComponent } from '../edituser/edituser.component';
import { DeleteemployeeComponent } from '../deleteemployee/deleteemployee.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees:Array<Employee>;
  isLogin : boolean;
  role:Role;
  dialogResult: any;
  constructor(private employeeService:UserService,private router:Router ,private dialog :MatDialog) { }

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
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.width="640px";
    dialogConfig.autoFocus=true;
    let dialogRef = this.dialog.open(EdituserComponent,dialogConfig);
    dialogRef.componentInstance.data=employee;
    dialogRef.afterClosed().subscribe(result=>{
      console.log(`Dialog closed: ${result}`);
      if(result=="Edit"){
        this.employeeService.getUsers().subscribe((text:Array<Employee>)=>{
          this.employees = text;
        });
      }
      this.dialogResult = result;

    })
  }

  deleteEmployee(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.width="400px";
    dialogConfig.autoFocus=true;
    let dialogRef = this.dialog.open(DeleteemployeeComponent,dialogConfig);
    dialogRef.componentInstance.data=id;
    dialogRef.afterClosed().subscribe(result=>{
      console.log(`Dialog closed: ${result}`);
      if(result=="Delete"){
        this.employees = new Array<Employee>();
        this.employeeService.getUsers().subscribe((text:Array<Employee>)=>{
          this.employees = text;
        });
      }
      this.dialogResult = result;

    })
  }
  checkIsLogin(){
    var pom = window.sessionStorage.getItem('user');
    if(pom!=null){
      var parsed = JSON.parse(pom);
      this.role = new Role(parsed.role.id,parsed.role.name);
      this.isLogin= true;
    }
    else{
      this.isLogin=false;
    }
  }

}
