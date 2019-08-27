import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { TimeService } from "../services/time.service";
import { Timereport } from "../models/timereport";
import { Project } from "../models/project";
import * as moment from 'moment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  chart: Chart;
  hoursChart: Chart;
  salary: number;
  hours: number;
  timereports: Array<Timereport>;
  selectedStatistics: String;
  statistics: Array<String>;
  currentDate: Date;
  fromtoweeks: String;
  startDate: String;
  endDate: String;
  month: String;
  days: String;
  projectReports:String;
  constructor(private timereportService: TimeService) {
    this.timereports = new Array<Timereport>();
    this.salary = 0;
    this.hours=0;
  }

  ngOnInit() {
    this.timereports = new Array<Timereport>();
    this.getTimereportsHours();
    this.statistics = new Array<String>();
    this.statistics.push('This week');
    this.statistics.push('This month');
    this.statistics.push('This year');
    this.selectedStatistics = this.statistics[0];
    this.getCurrentDate(this.selectedStatistics);
  }
  getCurrentDate($value) {
    if (String($value) === "This year") {
      this.getTimereportsForThisYear();
    }
    if (String($value) === "This month") {
      this.getTimereportsForThisMonth();
    }
    else {
      this.getTimereportsForWeek();
    }

  }
  getTimereportsForWeek() {
    var session = window.sessionStorage.getItem('user');
    var parsedSession = JSON.parse(session);
    let currentweeks = moment();
    var start = moment(currentweeks).startOf('isoWeek').format('YYYY-MM-DD');
    var end = moment(currentweeks).endOf('isoWeek').format('YYYY-MM-DD');
    this.fromtoweeks = start.toString() + " to " + end.toString();
    this.currentDate = new Date(currentweeks.toString());
    this.startDate = start.toString();
    this.endDate = end.toString();
    var fromDate = moment(this.startDate.toString());
    var toDate = moment(this.endDate.toString());
    this.timereports = new Array<Timereport>();
    this.timereportService.getTimereportsByDate(fromDate.toDate(), toDate.toDate(), parsedSession.id)
      .subscribe((list: Array<Timereport>) => {
        for(var i=0;i<list.length;i++){
          this.timereports.push(list[i]);
        }
        this.getTimereportsHours();
      });
  }
  getTimereportsForThisMonth() {
    var session = window.sessionStorage.getItem('user');
    var parsedSession = JSON.parse(session);
    let currentweeks = moment();
    var start = moment(currentweeks).startOf('isoWeek').format('YYYY-MM-DD');
    var end = moment(currentweeks).endOf('isoWeek').format('YYYY-MM-DD');
    this.fromtoweeks = start.toString() + " to " + end.toString();
    this.currentDate = new Date(currentweeks.toString());
    this.startDate = start.toString();
    this.month = String(currentweeks.month() + 1);
    this.startDate = '2019-' + this.getMonth(this.month) + '-01';
    this.days = currentweeks.days().toString();
    this.endDate = end.toString();
    var fromDate = moment(this.startDate.toString());
    var toDate = moment(this.endDate.toString());
    this.timereports = new Array<Timereport>();
    this.salary =0;
    this.hours=0;
    this.timereportService.getTimereportsByDate(fromDate.toDate(), toDate.toDate(), parsedSession.id)
      .subscribe((list: Array<Timereport>) => {
        for(var i=0;i<list.length;i++){
          this.timereports.push(list[i]);
        }
        this.getTimereportsHours();
      });
  }
  getTimereportsForThisYear() {
    var session = window.sessionStorage.getItem('user');
    var parsedSession = JSON.parse(session);
    let currentweeks = moment();
    var start = moment(currentweeks).startOf('isoWeek').format('YYYY-MM-DD');
    var end = moment(currentweeks).endOf('isoWeek').format('YYYY-MM-DD');
    this.fromtoweeks = start.toString() + " to " + end.toString();
    this.currentDate = new Date(currentweeks.toString());
    this.startDate = start.toString();
    var year  = String(currentweeks.year());
    this.startDate = String(year) + '-01' + '-01';
    this.days = currentweeks.days().toString();
    this.endDate = String(year) + '-12-'+'31';
    var fromDate = moment(this.startDate.toString());
    var toDate = moment(this.endDate.toString());
    this.timereports = new Array<Timereport>();
    this.salary =0;
    this.hours=0;
    this.timereportService.getTimereportsByDate(fromDate.toDate(), toDate.toDate(), parsedSession.id)
      .subscribe((list: Array<Timereport>) => {
        for(var i=0;i<list.length;i++){
          this.timereports.push(list[i]);
        }
        this.getTimereportsHours();
      });
  }
  getMonth($month){
    if($month<10){
      return '0'+$month;
    }
    else{
      return $month;
    }

  }
  getTimereportsHours() {
    var pom = 0;
    var session = window.sessionStorage.getItem('user');
    let array = this.timereports;
    this.salary=0;
    this.projectReports='';
    for (var i = 0; i < array.length; i++) {
        pom += array[i].hours;
        this.projectReports=this.projectReports+"   "+array[i].project.name+" - "+array[i].hours+" x "+array[i].project.hourlyPaid+"\n";
        this.salary += (array[i].hours*Number(array[i].project.hourlyPaid))/61.5;
      }
    this.hours = pom;
    this.createChart();
  }
  createChart() {
    var hours = [this.hours];
    var salary = [this.salary];
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
  changeStatistics($event) {
    this.getCurrentDate($event);
  }

}
