import { Employee } from './employee';

export class Timereport {

    private _date: Date;
    private _hours: number;
    private _employeeId:number;
    private  _projectId:number;


  constructor(date: Date, hours: number,employeeId:number,projectId:number) {
    this._date = date;
    this._hours = hours;
    this._employeeId = employeeId;
    this._projectId = projectId;
  
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
