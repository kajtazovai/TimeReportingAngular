import {Component, Inject, OnInit} from '@angular/core';
import {TimeService} from "../services/time.service";
import {TimereportingComponent} from "../timereporting/timereporting.component";
import {MatDialogRef, MatDialogContent, MAT_DIALOG_DATA} from "@angular/material";


@Component({
  selector: 'app-deletedialogtimereport',
  templateUrl: './deletedialogtimereport.component.html',
  styleUrls: ['./deletedialogtimereport.component.css']
})
export class DeletedialogtimereportComponent implements OnInit {
  id:number;
  constructor(private timereportService:TimeService,private dialogRef: MatDialogRef<TimereportingComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
  }

  delete(){
    this.timereportService.deleteById(this.data);
    this.dialogRef.close("Delete");
    alert("Successfully deleted");
  }
  close(){
    this.dialogRef.close("Close");
  }
}
