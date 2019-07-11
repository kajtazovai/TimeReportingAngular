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
    this.timereportService.getTimereports().subscribe((text:Array<Timereport>)=> {
      var list = text;
      var parsed = JSON.parse(list.toString());
      for (var i = 0; i < parsed.length; i++) {
        var hours = parsed[i].hours;
        var employeeId = parsed[i].employee.id;
        var projectId = parsed[i].projectId;
        var employeeName =parsed[i].employeeName;
        var projectName =parsed[i].projectName;
        var id = parsed[i].id;
        var date = parsed[i].date;
        var parsedSession = JSON.parse(session);
        if (employeeId === parsedSession.id) {
          pom+=parsed[i].hours;
        }
      }
      this.hours = pom;
      this.salary = this.hours*500;
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

        scales: {
          yAxes: [{
            type:'linear',
            ticks: {
              beginAtZero: true,
              max:240
            }
          }]
        }
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

        scales: {
          yAxes: [{
            type:'linear',
            ticks: {
              beginAtZero: true,
              max:240000
            }
          }]
        }
      }
    });

  }

}
