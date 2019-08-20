import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Chart } from 'chart.js';
import {TimeService} from "../services/time.service";
import {Timereport} from "../models/timereport";
import {Project} from "../models/project";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  chart:Chart;
  hoursChart:Chart;
  salary:number;
  hours:number;
  timereports:Array<Timereport>;
  constructor(private timereportService:TimeService) {
  }

  ngOnInit() {
    this.getTimereportsHours();
  }
  getTimereportsHours(){
    this.timereports = new Array<Timereport>();
    var pom = 0;
    var session = window.sessionStorage.getItem('user');
    this.timereportService.getTimereports().subscribe((list:Array<Timereport>)=> {
      let array = list;
      for (var i = 0; i < array.length; i++) {
        var hours = array[i].hours;
        var employeeId = array[i].employee.id;
        var projectId = array[i].project.id;
        var employeeName =array[i].employee.firstName;
        var projectName =array[i].project.name;
        var id = array[i].id;
        var date = array[i].date;
        var parsedSession = JSON.parse(session);
        if (employeeId === parsedSession.id) {
          pom+=array[i].hours;
        }
      }
      this.hours = pom;
      var parsedSession = JSON.parse(session);
      if(parsedSession.role.id==1){
      this.salary = this.hours*2500;
      }
      else{
        this.salary = this.hours*1500;
      }
      this.createChart();
    });
  }
  createChart(){
    var hours = [this.hours];
    var salary  = [this.salary];
    this.chart = new Chart('salary', {
      type: 'bar',
      data: {
        labels: ['Hours'],
        datasets: [{
          label: 'Hours statistics ',
          data: hours,
          backgroundColor: [
            'blue',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        legend: {
          position: 'top',
        },
      }
    });
    this.hoursChart = new Chart('hours', {
      type: 'bar',
      data: {
        labels: ['Salary'],
        datasets: [{
          label: 'Salary statistics ',
          data: salary,
          backgroundColor: [
            'green',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        legend: {
          position: 'top',
        },
      }
    });

  }

}
