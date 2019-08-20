import { Employee } from './employee';
import { Project } from './project';

export class Timereport {

    private _date: Date;
    private _hours: number;
    private _employee:Employee;
    private _project :Project;
    private _id : number;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get project():Project{
    return this._project;
  }
  set project(project:Project){
    this._project=project;
  }
  get employee():Employee{
      return this._employee;
  }
  set employee(employee:Employee){
    this._employee = employee;
  }
  
  constructor(hours: number,id:number,date:Date,employee:Employee,project:Project) {
    this._hours = hours;
    this._employee = employee;
    this._project=project;
    this._id  = id;
    this._date = date;
  
  }
  
  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }

  get hours(): number {
    return this._hours;
  }

  set hours(value: number) {
    this._hours = value;
  }


 
}
