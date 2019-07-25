import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { EmployeesComponent } from '../employees/employees.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-deleteemployee',
  templateUrl: './deleteemployee.component.html',
  styleUrls: ['./deleteemployee.component.css']
})
export class DeleteemployeeComponent implements OnInit {

  constructor(private userService :UserService,private dialogRef: MatDialogRef<EmployeesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  deleteEmployee (){
    this.userService.removeEmployee(this.data);
    this.dialogRef.close("Delete");
    alert("Successfully deleted");
  }
  close(){
    this.dialogRef.close("Close");
  }

}
