import { Component, OnInit, Input } from '@angular/core';
import { Timereport } from '../models/timereport';
import { TimeService } from '../services/time.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  
})
export class ReportsComponent implements OnInit {
  timereports:Array<Timereport>;
  name:String;
  constructor(private timereportService:TimeService, private router:Router) { }

  ngOnInit() {
    this.timereports = new Array<Timereport>();
    var storage = JSON.parse(window.localStorage.getItem('employeeId'));
    this.name = storage.firstName + " "+ storage.lastName; 
    this.timereportService.getTimereportsByEmployee(storage).subscribe((result:Array<Timereport>)=>{
      for(var i=0;i<result.length;i++){
        this.timereports.push(result[i]);
      }
    });
  }
  backToEmployee(){
    window.localStorage.setItem('employeeId',"");
    this.router.navigate(['/employees']);
  }

}
