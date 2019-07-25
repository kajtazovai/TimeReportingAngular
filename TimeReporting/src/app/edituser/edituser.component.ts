import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UserService } from '../services/user.service';
import { EmployeesComponent } from '../employees/employees.component';
import { Employee } from '../models/employee';
import { Role } from '../models/role';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  id:any;
  firstName:string;
  lastName:string;
  embg:string;
  dateJoining:Date;
  role:Role;
  email:string;
  username:string;
  password:string;
  employee:Employee;
  constructor( private employeeService:UserService,@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<EmployeesComponent>) { }

  ngOnInit() {
    console.log(this.data);
    this.firstName = this.data.firstName;
    this.lastName = this.data.lastName;
    this.embg =this.data.embg;
    var date = new Date(this.data.dateJoining);
    this.dateJoining = date;
    this.role = this.data.role;
    this.username = this.data.username;
    this.email = this.data.email;
    this.id = this.data.id;

  }
  editEmployee(){
    if(String(this.embg).length==13 && this.firstName!=''&& this.lastName!=''&& this.password!=null&&this.email!=""&& this.dateJoining!=null&&this.role.id!=null){
    this.employee = new Employee(this.id,this.firstName,this.lastName,this.username,this.password,this.email,this.dateJoining,this.embg,this.role);
    this.employeeService.editUser(this.employee);
    this.dialogRef.close('Edit');
    alert("Successfully edited");
    }
    else{
      alert('Invalid values');
    }
  }
  onCloseCancel(){
    this.dialogRef.close('Close');
  }
  changeDateJoining($event){
    this.dateJoining =  $event;
  }
  changeEMBG($event){
    this.embg = $event;
  }
  changeLastName($event){
    this.lastName = $event;
  }
  changeFirstName($event){
    this.firstName =String($event);
  }
  changeEmail($event){
    this.email =$event;
  }
  changeUsername($event){
    this.username = $event;
  }
  changePassword($event){
    this.password = $event;
  }
  changeRole($event){
    if($event==1){
      this.role = new Role($event,"Admin");
    }
    else{
      this.role = new Role($event,"Programmer");
    }
  }
}
