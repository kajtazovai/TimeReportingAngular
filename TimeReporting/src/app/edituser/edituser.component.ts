import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UserService } from '../services/user.service';
import { EmployeesComponent } from '../employees/employees.component';
import { Employee } from '../models/employee';
import { Role } from '../models/role';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  id: any;
  firstName: string;
  lastName: string;
  embg: string;
  dateJoining: Date;
  selectedRole: Role;
  email: string;
  username: string;
  password: string;
  employee: Employee;
  roles: Array<Role>;
  choosedProjects: Array<Project>;
  projects: Array<Project>;
  selectedProject: Project;
  constructor(private employeeService: UserService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EmployeesComponent>, private projectService: ProjectService) { }

  ngOnInit() {
    this.choosedProjects = this.data.projects;
    this.firstName = this.data.firstName;
    this.lastName = this.data.lastName;
    this.embg = this.data.embg;
    var date = new Date(this.data.dateJoining);
    this.dateJoining = date;
    this.selectedRole = this.data.role;
    this.username = this.data.username;
    this.email = this.data.email;
    this.id = this.data.id;
    this.roles = new Array<Role>();
    this.projects = new Array<Project>();
    this.projectService.getRoles().subscribe((text: Array<Role>) => {
      this.roles = text;
    });
    this.filterProjects(this.choosedProjects);



  }
  filterProjects(array: Array<Project>) {
    this.projects = new Array<Project>();
    this.projectService.getProjects().subscribe((list: Array<Project>) => {
      for (var i = 0; i < list.length; i++) {
        var exist = this.doesExistInArray(array, list[i]);
        if (exist == false) {
          this.projects.push(new Project(list[i].name, list[i].id, list[i].budget, list[i].hourlyPaid));
        }
      }
    });

  }
  doesExistInArray(array: Array<Project>, project: Project): Boolean {
    for (var i = 0; i < array.length; i++) {
      if (array[i].id === project.id) {
        return true;
      }
    }
    return false;

  }
  editEmployee() {
    if (String(this.embg).length == 13 && this.firstName != '' && this.lastName != '' && this.password != null && this.email != "" && this.dateJoining != null && this.selectedRole.id != null) {
      var array = new Array<Project>();
      array = this.choosedProjects;
      this.employee = new Employee(this.id, this.firstName, this.lastName, this.username, this.password, this.email, this.dateJoining, this.embg, this.selectedRole, array);
      this.employeeService.editUser(this.employee);
      var currentUser = window.sessionStorage.getItem('user');
      let parsedUser = JSON.parse(currentUser);
      if (parsedUser.id == this.employee.id) {
        window.sessionStorage.clear();
        window.sessionStorage.setItem("user", JSON.stringify(this.getJSON(this.employee)));
      }
      this.dialogRef.close('Edit');
      alert("Successfully edited");
    }
    else {
      alert('Invalid values');
    }
  }
  getJSON(employee:Employee){
    var req = {
      "id": employee.id,
      "firstName": employee.firstName,
      "lastName": employee.lastName,
      "embg": employee.embg,
      "dateJoining": employee.dateJoining,
      "username": employee.username,
      "password": employee.password,
      "email": employee.email,
      "role": {
        "id": employee.role.id,
        "name": employee.role.name,
      },
      "projects": []
    }
    for (var i = 0; i < employee.projects.length; i++) {
      var project = { "name": employee.projects[i].name, "budget": employee.projects[i].budget, "id": employee.projects[i].id, "hourlyPaid": employee.projects[i].hourlyPaid };
      req.projects.push(project);
    }
    return req;
  }
  onCloseCancel() {
    this.dialogRef.close('Close');
  }
  changeDateJoining($event) {
    this.dateJoining = $event;
  }
  changeEMBG($event) {
    this.embg = $event;
  }
  changeLastName($event) {
    this.lastName = $event;
  }
  changeFirstName($event) {
    this.firstName = String($event);
  }
  changeEmail($event) {
    this.email = $event;
  }
  changeUsername($event) {
    this.username = $event;
  }
  changePassword($event) {
    this.password = $event;
  }
  changeRole($event) {

  }
  changeProjectId($event) {
    this.choosedProjects.push($event);
    var array = this.projects;
    this.projects = new Array<Project>();
    for (var i = 0; i < array.length; i++) {
      if ($event.id == array[i].id) {
        continue;
      }
      else {
        this.projects.push(array[i]);
      }

    }
  }
  removeChoosedProjects($event) {
    this.projects.push($event);
    var array = this.choosedProjects;
    this.choosedProjects = new Array<Project>();
    for (var i = 0; i < array.length; i++) {
      if ($event.id == array[i].id) {
        continue;
      }
      else {
        this.choosedProjects.push(array[i]);
      }

    }
  }
}
