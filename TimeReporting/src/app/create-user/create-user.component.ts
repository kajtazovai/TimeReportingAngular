import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  firstname: string;
  lastname: string;
  embg:string;
  username:string;
  password:string;
  email:string;
  datejoining:Date;
  role:number;
  rolename:string;
  projectId:number;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }
  createUser(firstname,lastname,embg,username,password,datejoining,role,rolename){
      this.userService.createUser(this.firstname,this.lastname,this.embg,this.datejoining,this.username,this.password,this.email,this.role, this.rolename,this.projectId).subscribe(data=>{
        if(firstname!="" && lastname!="" && embg!="" && username!=""&& password!=""&& datejoining!="" && role!="" && rolename!="")
        {
          alert("Successfull create user");
        }
        else{
          alert("All fields are mandatory");
        }
      })
    
  }


}
