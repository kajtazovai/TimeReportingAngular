import {Component, Inject, OnInit} from '@angular/core';
import {TimeService} from "../services/time.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {TimereportingComponent} from "../timereporting/timereporting.component";
import {ProjectService} from "../services/project.service";
import {ProjectComponent} from "../project/project.component";

@Component({
  selector: 'app-deleteproject',
  templateUrl: './deleteproject.component.html',
  styleUrls: ['./deleteproject.component.css']
})
export class DeleteprojectComponent implements OnInit {

  constructor(private projectService:ProjectService,private dialogRef: MatDialogRef<ProjectComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }
ng
  ngOnInit() {
  }

  delete() {
    this.projectService.deleteById(this.data);
    this.dialogRef.close("Delete");
    alert("Successfully deleted");
  }

  close() {
    this.dialogRef.close("Close");
  }
}
